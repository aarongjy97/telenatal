import React from "react";
import { Calendar, Badge } from "antd";
import { sameDay, sameMonth, formatTime } from "../utils";

export default function AppointmentCalendar({ appointments }) {
  function monthCellRender(value) {
    var calendarDate = value.toDate();
    var appointmentList = {};

    for (var index in appointments) {
      var appointment = appointments[index];
      var appointmentDate = new Date(appointment.date);
      var appointmentPurpose = appointment.purpose;

      if (sameMonth(appointmentDate, calendarDate)) {
        if (appointmentPurpose in appointmentList) {
          var currentCount = appointmentList[appointmentPurpose];
          appointmentList[appointmentPurpose] = currentCount + 1;
        } else {
          appointmentList[appointmentPurpose] = 1;
        }
      }
    }

    return (
      <>
        {Object.keys(appointmentList).map(function (key, index) {
          var appointmentPurpose = key;
          var appointmentCount = appointmentList[key];

          return (
            <li>
              <Badge color="pink" />
              <span>{appointmentCount}</span>{" "}
              {appointmentPurpose + (appointmentCount !== 1 ? "s" : "")}
            </li>
          );
        })}
      </>
    );
  }

  function dateCellRender(value) {
    var calendarDate = value.startOf("day").toDate();

    return (
      <>
        {appointments.map((appointment) => {
          var appointmentDate = new Date(appointment.date);

          if (sameDay(calendarDate, appointmentDate)) {
            return (
              <li key={appointment.appointmentId}>
                <Badge color="pink" />
                <span>{formatTime(appointmentDate)}</span> {appointment.purpose}
              </li>
            );
          } else {
            return null;
          }
        })}
      </>
    );
  }

  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
    />
  );
}

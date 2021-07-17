import React from "react";
import { Calendar, Badge } from "antd";
import { sameDay, sameMonth, formatAMPM } from "./Appointments";

export default function AppointmentsCalendar({ appointments }) {
  function monthCellRender(value) {
    var calendarDate = value.toDate();
    var appointmentList = {};

    for (var index in appointments) {
      var appointment = appointments[index];
      var appointmentDate = new Date(appointment.datetime);
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
          var appointmentString =
            appointmentCount +
            " " +
            appointmentPurpose +
            (appointmentCount !== 1 ? "s" : "");
          return (
            <li>
              <Badge color={"pink"} text={appointmentString} />
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
          var appointmentDate = new Date(appointment.datetime);
          var appointmentString =
            formatAMPM(appointmentDate) + " " + appointment.purpose;

          if (sameDay(calendarDate, appointmentDate)) {
            return (
              <li key={appointmentString}>
                <Badge color="pink" text={appointmentString} />
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

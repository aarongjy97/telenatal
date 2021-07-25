import React, { useContext } from "react";
import { Calendar, Badge } from "antd";
import Fade from "react-reveal";
import { HeartOutlined, SmileOutlined } from "@ant-design/icons";
import { userContext } from "./../../userContext";
import { sameDay, sameMonth, isBirthday, formatTime } from "./../utils";
import { PATIENT } from "./../../constants/constants";

export default function AppointmentCalendar({ appointments }) {
  // Get user context
  const context = useContext(userContext);
  const user = context.user;
  const userType = user.userType;

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
        {Object.keys(appointmentList).map(function (key) {
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
        {userType === PATIENT && isBirthday(calendarDate, new Date(user.dob)) && (
          <li key="birthday">
            <Badge color="orange" />
            <span>
              Happy Birthday! <SmileOutlined />
            </span>
          </li>
        )}
        {userType === PATIENT && sameDay(calendarDate, new Date(user.dueDate)) && (
          <li key="duedate">
            <Badge color="red" />
            <span>
              Welcome Baby {user.babyName}
              <HeartOutlined />
            </span>
          </li>
        )}
      </>
    );
  }

  return (
    <Fade>
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
      />
    </Fade>
  );
}

import React, { useState, useEffect, useContext } from "react";
import { Card } from "antd";
import {
  ClockCircleOutlined,
  PushpinOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Fade from "react-reveal";
import { formatDate } from "./../../utils";
import { getProfessional } from "./../../../api/User";
import { userContext } from "./../../../userContext";
import { PROFESSIONAL, PATIENT } from "./../../../constants/constants";

export default function AppointmentCard({ appointment }) {
  // Get user context
  const context = useContext(userContext);
  const user = context.user;
  const userType = user.userType;

  // Fetch professional title data
  const [professionalTitle, setProfessionalTitle] = useState();
  useEffect(() => {
    if (userType === PATIENT && typeof appointment !== "undefined") {
      getProfessional(appointment.professionalId)
        .then((result) => {
          if (result.data.type === "doctor") {
            setProfessionalTitle("Dr.");
          } else if (result.data.type === "nurse") {
            setProfessionalTitle("Nurse");
          }
        })
        .catch((error) => console.log(error));
    }
  }, [userType, appointment]);

  // Only allow card to load when professional title is loaded
  if (userType === PATIENT && professionalTitle == null) {
    return <></>;
  }
  return (
    <Fade>
      {typeof appointment !== "undefined" && (
        <Card id="appointmentCard">
          <p>
            <span>{appointment.purpose}</span>
          </p>
          <p>
            <ClockCircleOutlined />
            &nbsp;{formatDate(appointment.date)}
          </p>
          {userType === PROFESSIONAL && (
            <p>
              <UserOutlined />
              &nbsp;
              {appointment.patientName}
            </p>
          )}
          {userType === PATIENT && (
            <p>
              <UserOutlined />
              &nbsp;{professionalTitle} {appointment.professionalName}
            </p>
          )}
          <p>
            <PushpinOutlined />
            &nbsp;{appointment.location}{" "}
            {appointment.postalCode !== 0 ? (
              <>S({appointment.postalCode})</>
            ) : null}
          </p>
        </Card>
      )}
    </Fade>
  );
}

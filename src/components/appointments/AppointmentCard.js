import React, { useState, useEffect } from "react";
import { Card } from "antd";
import {
  ClockCircleOutlined,
  PushpinOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { formatDate } from "../utils";
import { getProfessional } from "../../api/User";
import Fade from "react-reveal";

export default function AppointmentCard({ appointment, userType }) {
  
  // Fetch professional title data
  const [professionalTitle, setProfessionalTitle] = useState();
  useEffect(() => {
    if (userType === "patient") {
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
  }, [userType]);

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
          {userType === "professional" && (
            <p>
              <UserOutlined />
              &nbsp;
              {appointment.patientName}
            </p>
          )}
          {userType === "patient" && (
            <p>
              <UserOutlined />
              &nbsp;{professionalTitle} {appointment.professionalName}
            </p>
          )}
          <p>
            <PushpinOutlined />
            &nbsp;{appointment.location} S({appointment.postalCode})
          </p>
        </Card>
      )}
    </Fade>
  );
}

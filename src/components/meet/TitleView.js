import React, { useContext } from "react";
import {
  UserOutlined,
  CalendarOutlined,
  PushpinOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import Fade from "react-reveal";
import { userContext } from "./../../userContext";
import { PROFESSIONAL, PATIENT } from "../../constants/constants";
import { formatDateTime } from "./../utils";

export default function TitleView(props) {
  // Get user context
  const context = useContext(userContext);
  const user = context.user;
  const userType = user.userType;

  return (
    <Fade top>
    <div className="titleView">
      <h1>{props.appointment.purpose}</h1>
      {props.appointment.remarks !== undefined && (
        <p>
          <EllipsisOutlined /> {props.appointment.remarks}
        </p>
      )}
      {userType === PROFESSIONAL && (
        <li>
          <UserOutlined /> {props.appointment.patientName}
        </li>
      )}
      {userType === PATIENT && (
        <li>
          <UserOutlined /> {props.appointment.professionalName}
        </li>
      )}
      <li>
        <CalendarOutlined /> {formatDateTime(props.appointment.date)}
      </li>
      <li>
        <PushpinOutlined /> {props.appointment.location}{" "}
        {props.appointment.postalCode !== 0 ? (
          <>S({props.appointment.postalCode})</>
        ) : null}
      </li>
    </div>
    </Fade>
  );
}

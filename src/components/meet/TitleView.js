import React, {useContext} from "react";
import {
  UserOutlined,
  CalendarOutlined,
  PushpinOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { userContext } from "./../../userContext";
import { PROFESSIONAL, PATIENT } from "../../constants/constants";
import { formatDateTime } from "./../utils";

export default function TitleView(props) {
    // Get user context
  const context = useContext(userContext);
  const user = context.user;
  const userType = user.userType;

  return (
    <div className="titleView">
      <h1>{props.appointment.purpose}</h1>
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
      {props.appointment.remarks !== undefined && (
        <li>
          <EllipsisOutlined /> {props.appointment.remarks}
        </li>
      )}
    </div>
  );
}

import React, { useContext } from "react";
import Fade from "react-reveal";
import { userContext } from "../../../userContext";
import { PROFESSIONAL, PATIENT } from "../../../constants/constants";

export default function AfterCallView(props) {
  const context = useContext(userContext);
  const user = context.user;
  const userType = user.userType;

  return (
    <Fade bottom>
      <div className="afterCallView">
        <p>Appointment Ended</p>
        {userType === PATIENT && (
          <>
            Thank you for attending your appointment! <br /> Your doctor will be
            uploading your appointment details. <br /> They can be accessed
            shortly through the 'Records' tab.
          </>
        )}
        {userType === PROFESSIONAL && (
          <>
            Meeting has ended. <br /> Please save the appointment details as
            soon as possible. <br /> This can be done through the 'Appointment
            Details' panel, or the 'Records' tab.
          </>
        )}
      </div>
    </Fade>
  );
}

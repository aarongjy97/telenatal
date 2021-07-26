import React from "react";
import Fade from "react-reveal";

export default function PlaceholderView(props) {
  return (
    <Fade bottom>
      <div className="placeholderView">
        <p>No Appointment Selected!</p>
        Please select an upcoming appointment from the left panel.
      </div>
    </Fade>
  );
}

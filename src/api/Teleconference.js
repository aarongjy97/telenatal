import axios from "axios";
import dotenv from "dotenv";
import { getAppointment, updateAppointmentWithData } from "./Appointment";
const JOIN = "/meet/join";
const DELETE = "/meet/delete";
const CREATE = "/meet/create";

dotenv.config();

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const accessKeyId = process.env.REACT_APP_CHIME_ACCESS_KEY;
const secretAccessKey = process.env.REACT_APP_CHIME_SECRET_ACCESS_KEY;

const createMeetingAndUpdateAppointment = async (appointment) => {
  var joinInfo = await createMeeting();
  var meetingId = joinInfo.Meeting.Meeting.MeetingId;
  appointment.meetingId = meetingId;

  var update = {
    appointmentId: appointment.appointmentId,
    meetingId: appointment.meetingId,
  };
  console.log("update: ");
  console.log(update);
  // update appointment
  updateAppointmentWithData(appointment);
  // console.log("Updated appointment: ");
  // console.log(appointment);
  return appointment;
};

const joinCall = async (appointment) => {
  console.log(API_ENDPOINT);
  console.log(accessKeyId);
  console.log(secretAccessKey);
  var numTries = 0;
  while (numTries < 5) {
    numTries++;
    console.log("try number: " + numTries);
    if (appointment.meetingId == null) {
      // try to fetch the appointment again in case
      // a meeting has been created by another user who just joined
      res = await getAppointment(appointment.appointmentId);
      console.log("received response: " + JSON.stringify(res));
      appointment = res.data;

      // create new appointment
      if (appointment.meetingId == null) {
        console.log("Appointment has no meetingId, creating new meeting");
        appointment = await createMeetingAndUpdateAppointment(appointment);
      }
    }

    var meetingId = appointment.meetingId;
    console.log("meetingId present");
    console.log("meetingId: " + meetingId);
    try {
      var res = await axios.put(
        API_ENDPOINT + JOIN,
        JSON.stringify({
          meetingId: meetingId,
          accessKeyId: accessKeyId,
          secretAccessKey: secretAccessKey,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("result from joinCall: " + JSON.stringify(res.data));
      return res.data.JoinInfo;
    } catch (error) {
      // the given meeting has expired, need to create a new one
      console.log("meetingId has expired, creating new");
      console.log(error);
      appointment = await createMeetingAndUpdateAppointment(appointment);
    }
  }
};

const deleteMeeting = async (meetingId) => {
  console.log(API_ENDPOINT + DELETE);
  var res = await axios.delete(
    API_ENDPOINT + DELETE,
    {
      data: JSON.stringify({
        meetingId: meetingId,
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      }),
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("result from deleteMeeting: " + res.data);
  return res.data.JoinInfo;
};

const createMeeting = async () => {
  console.log(API_ENDPOINT + CREATE);
  var res = await axios.post(
    API_ENDPOINT + CREATE,
    JSON.stringify({
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("result from createMeeting: " + JSON.stringify(res.data));
  return res.data.JoinInfo;
};

export { joinCall, deleteMeeting, createMeeting };

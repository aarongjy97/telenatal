import axios from "axios";

const JOIN = "/meeting/join";
const DELETE = "/meeting/delete";
const CREATE = "/meeting/create";

const ENDPOINT = "https://7nzxpc9cn6.execute-api.us-east-1.amazonaws.com";

const joinCall = async (meetingId) => {
  console.log(ENDPOINT + JOIN);
  var res = await axios.put(ENDPOINT + JOIN, {
    params: { meetingId: meetingId },
  });
  console.log(res);
  console.log("result from joinCall: " + res.data);
  return res.data;
};

const deleteMeeting = async (meetingId) => {
  var res = await axios.delete(ENDPOINT + DELETE, {
    params: { meetingId: meetingId },
  });
  console.log("result from deleteMeeting: " + res.data);
  return res.data;
};

const createMeeting = async () => {
  var res = await axios.post(ENDPOINT + CREATE);
  console.log("result from createMeeting: " + res.data);
  return res.data;
};

export { joinCall, deleteMeeting, createMeeting };

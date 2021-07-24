import axios from "axios";
import dotenv from "dotenv";
import getUuid from "uuid-by-string";
const JOIN = "/meet/join";
const DELETE = "/meet/delete";
const CREATE = "/meet/create";

dotenv.config();

// const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const API_ENDPOINT =
  "https://h3vy7pkl85.execute-api.us-east-1.amazonaws.com/dev";
// const accessKeyId = encodeURIComponent(process.env.CHIME_ACCESS_KEY);
// const secretAccessKey = encodeURIComponent(process.env.CHIME_SECRET_ACCESS_KEY);
// const accessKeyId = process.env.CHIME_ACCESS_KEY;
// const secretAccessKey = process.env.CHIME_SECRET_ACCESS_KEY;

const accessKeyId = "AKIA5IJXS7IBDIVAE4EW";
const secretAccessKey = "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";

const joinCall = async (meetingId) => {
  console.log(API_ENDPOINT + JOIN);
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
  console.log(res);
  console.log("result from joinCall: " + res.data);
  return res.data.JoinInfo;
};

const deleteMeeting = async (meetingId) => {
  console.log(API_ENDPOINT + DELETE);
  var res = await axios.delete(
    API_ENDPOINT + DELETE,
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
  console.log("result from deleteMeeting: " + res.data);
  return res.data.JoinInfo;
};

const createMeeting = async () => {
  console.log(API_ENDPOINT + DELETE);
  var res = await axios.post(
    API_ENDPOINT + CREATE,
    {
      data: JSON.stringify({
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
  console.log("result from createMeeting: " + res.data);
  return res.data.JoinInfo;
};

export { joinCall, deleteMeeting, createMeeting };

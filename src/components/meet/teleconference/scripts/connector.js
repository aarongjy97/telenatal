const uuid = require("uuid/v4");
const AWS = require("aws-sdk");
const config = require("./config");


const chime = new AWS.Chime({ region: config.region });
// const alternateEndpoint = process.env.ENDPOINT;
// if (alternateEndpoint) {
//   console.log('Using endpoint: ' + alternateEndpoint);
//   chime.createMeeting({ ClientRequestToken: uuid() }, () => {});
//   AWS.NodeHttpClient.sslAgent.options.rejectUnauthorized = false;
//   chime.endpoint = new AWS.Endpoint(alternateEndpoint);
// } else {
chime.endpoint = new AWS.Endpoint(
  "https://service.chime.aws.amazon.com/console"
);
// }

const log = (message) => {
  console.log(`${new Date().toISOString()} ${message}`);
};

const init = () => {

}

const joinCall = (meetingCache, attendeeCache, title, name) => {
  const title = title;
  const name = name;
  const region = config.region || "us-east-1";

  if (!meetingCache[title]) {
    meetingCache[title] = await chime
      .createMeeting({
        ClientRequestToken: uuid(),
        MediaRegion: region,
      })
      .promise();
    attendeeCache[title] = {};
  }
  const joinInfo = {
    JoinInfo: {
      Title: title,
      Meeting: meetingCache[title].Meeting,
      Attendee: (
        await chime
          .createAttendee({
            MeetingId: meetingCache[title].Meeting.MeetingId,
            ExternalUserId: uuid(),
          })
          .promise()
      ).Attendee,
    },
  };
  attendeeCache[title][joinInfo.JoinInfo.Attendee.AttendeeId] = name;
  log(JSON.stringify(joinInfo, null, 2));
  return meetingCache, attendeeCache, joinInfo
};

const getAttendeeInfo = (attendeeCache, attendee, title) => {
  const attendeeInfo = {
    AttendeeInfo: {
      AttendeeId: attendee,
      Name: attendeeCache[title][attendee],
    },
  };
  return attendeeCache, attendeeInfo
};

const createMeeting = (meetingCache, attendeeCache, title) => {
  if (!meetingCache[title]) {
    meetingCache[title] = await chime
      .createMeeting({
        ClientRequestToken: uuid(),
        // NotificationsConfiguration: {
        //   SqsQueueArn: 'Paste your arn here',
        //   SnsTopicArn: 'Paste your arn here'
        // }
      })
      .promise();
    attendeeCache[title] = {};
  }
  const joinInfo = {
    JoinInfo: {
      Title: title,
      Meeting: meetingCache[title].Meeting,
    },
  };
  log(JSON.stringify(joinInfo, null, 2));
  return meetingCache, attendeeCache, joinInfo
};

const deleteMeeting = (meetingCache, attendeeCache, title) => {
  const title = query.title;
  await chime
    .deleteMeeting({
      MeetingId: meetingCache[title].Meeting.MeetingId,
    })
    .promise();
  return meetingCache, attendeeCache
};

export {joinCall, getAttendeeInfo, createMeeting, deleteMeeting}

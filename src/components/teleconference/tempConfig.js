export default class Config {
  // user tailoring
  static role = "DOCTOR";
  // aws config
  static region = "us-east-1";
  static endpoint = null;
  static accessKey = "ASIAYBKTT52EUYDDFBW7";
  static secretAccessKey = "Xkx5ibI6uDfcnXjMj+mKALL61+mLi4FZYXQ1v2yD";
  static sessionToken = 
    "FwoGZXIvYXdzEBYaDF85+7W5x5qhVwLy4CLCAXGmWMO+GkigmY4RjtU2q05AupONQHmjogLtNUuWjv8TiiJfhn2B4wxxL+m3Z1iSAiXwQy3UKvO8YKtoYB7ahGjOyQxEQP5l4cz3s6x/kEGhrkDnoeUPuHO7ZNXotxTwfKNMft327JbYdlhJlLeoJMerYSYai9i85hIshjq9V1HqeZ/tvCQOrO/iAMjynozNDEnqxfNqzIHS8SNL5l4O3OqTrJcvZRhWMpMEuwfIM/A8j81So+rXTCl2YuJWgii42fR2KMSCtocGMi2M1w5m3Ql6feG5x4mokSoBen1z5qi95buAQgEIeobDjPmaKCDFxKfEPAFk6Ko=";
  static channelName = "telenatal_signaling_channel";
  static clientId = "123"; // dummy id

  // teleconference settings

  // nat traversal
  static natTraversal = "STUN_TURN";
  static TRAVERSAL_STUN_TURN = "STUN_TURN";
  static TRAVERSAL_DISABLED = "DISABLED";
  static TRAVERSAL_TURN_ONLY = "TURN_ONLY";

  // resolution
  static resolution = "WIDESCREEN";
  static WIDESCREEN = "WIDESCREEN";

  // video and audio
  static sendVideo = true;
  static sendAudio = true;
  static useTrickleICE = true;
};

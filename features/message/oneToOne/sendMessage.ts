import ZIM, { ZIMMessage } from "zego-zim-web";

export default function SEND_MESSAGE(
  messageTextObj: {
    type: number;
    message: string;
    extendedData?: string;
  },
  zim: ZIM,
  toConversationID: string
) {
  // Send one-on-one text message.

  const conversationType = 0; // Conversation type, 1-on-1 chat: 0. In-room chat: 1. Group chat: 2.
  const config = {
    priority: 1, // Set message priority. Low: 1 (by default). Medium: 2. High: 3.
  };

  var notification = {
    onMessageAttached: function (message: ZIMMessage) {
      // todo: Loading
    },
  };

  zim
    .sendMessage(
      messageTextObj,
      toConversationID,
      conversationType,
      config,
      notification
    )
    .then(function ({ message }) {
      // store to db
    })
    .catch(function (err) {
      // show error.
    });
}

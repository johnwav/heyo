import ZIM from "zego-zim-web";

export const receivePeerMessage = (zim: ZIM) => {
  // Callback for receiving the one-to-one message.
  zim.on(
    "receivePeerMessage",
    function (zim, { messageList, fromConversationID }) {
      console.log(messageList, fromConversationID);
    }
  );
};

export const receiveGroupMessage = (zim: ZIM) => {
  // Callback for receiving the group message.
  zim.on(
    "receiveGroupMessage",
    function (zim, { messageList, fromConversationID }) {
      console.log(messageList, fromConversationID);
    }
  );
};

export const receiveRoomMessage = (zim: ZIM) => {
  // Callback for receiving the in-room message.
  zim.on(
    "receiveRoomMessage",
    function (zim, { messageList, fromConversationID }) {
      console.log(messageList, fromConversationID);
    }
  );
};

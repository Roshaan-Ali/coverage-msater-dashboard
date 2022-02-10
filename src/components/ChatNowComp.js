import React from "react";
import { Chat_Image } from "../assets";

const ChatNowComp = () => {
  return (
    <div className="fixed-chat">
      <span>
        <img src={Chat_Image} />
      </span>
    </div>
  );
};

export default ChatNowComp;

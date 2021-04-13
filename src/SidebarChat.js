import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import db from "./firebase";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./SidebarChat.css";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("Messages")
        .orderBy("timeStamp", "desc")
        .onSnapshot((snapshot) => {
          // @ts-ignore
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [id]);
  useEffect(() => setSeed(Math.floor(Math.random() * 5000).toString()), []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat room");
    if (roomName) {
      // database stuff

      db.collection("rooms").add({
        name: roomName,
      });
    }
  };
  return !addNewChat || addNewChat === "false" ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>

          <p>
            {
              // @ts-ignore
              messages[0]?.message
            }
          </p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h3> Add new Chat</h3>
    </div>
  );
}

export default SidebarChat;

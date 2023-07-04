//@ts-nocheck

import { useState, useEffect } from "react";
import Messages from "./components/messages";
import Input from "./components/input";
import "./styles/styles.scss";

type MessageType = {
  text: string;
  member: MemberType;
};

type MemberType = {
  color: string;
  username: string;
  id?: string;
};

const randomName = () => {
  const adjectives = [
    "autumn",
    "hidden",
    "bitter",
    "misty",
    "silent",
    "empty",
    "dry",
    "dark",
    "summer",
    "icy",
    "delicate",
    "quiet",
    "white",
    "cool",
    "spring",
    "winter",
    "patient",
    "twilight",
    "dawn",
    "crimson",
    "wispy",
    "weathered",
    "blue",
    "billowing",
    "broken",
    "cold",
    "damp",
    "falling",
    "frosty",
    "green",
    "long",
    "late",
    "lingering",
    "bold",
    "little",
    "morning",
    "muddy",
    "old",
    "red",
    "rough",
    "still",
    "small",
    "sparkling",
    "throbbing",
    "shy",
    "wandering",
    "withered",
    "wild",
    "black",
    "young",
    "holy",
    "solitary",
    "fragrant",
    "aged",
    "snowy",
    "proud",
    "floral",
    "restless",
    "divine",
    "polished",
    "ancient",
    "purple",
    "lively",
    "nameless",
  ];
  const nouns = [
    "waterfall",
    "river",
    "breeze",
    "moon",
    "rain",
    "wind",
    "sea",
    "morning",
    "snow",
    "lake",
    "sunset",
    "pine",
    "shadow",
    "leaf",
    "dawn",
    "glitter",
    "forest",
    "hill",
    "cloud",
    "meadow",
    "sun",
    "glade",
    "bird",
    "brook",
    "butterfly",
    "bush",
    "dew",
    "dust",
    "field",
    "fire",
    "flower",
    "firefly",
    "feather",
    "grass",
    "haze",
    "mountain",
    "night",
    "pond",
    "darkness",
    "snowflake",
    "silence",
    "sound",
    "sky",
    "shape",
    "surf",
    "thunder",
    "violet",
    "water",
    "wildflower",
    "wave",
    "water",
    "resonance",
    "sun",
    "wood",
    "dream",
    "cherry",
    "tree",
    "fog",
    "frost",
    "voice",
    "paper",
    "frog",
    "smoke",
    "star",
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
};

const randomColor = () => {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
};

function App() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [droneData, setDroneData] = useState<any>(null);
  const [member, setMember] = useState<MemberType>({
    username: randomName(),
    color: randomColor(),
  });

  useEffect(() => {
    let joined = true;

    const drone = new window.Scaledrone("ISD1W1UeSlU2IMUG", {
      data: member,
    });

    drone.on("open", (error: any) => {
      if (error) {
        return console.error(error);
      }
      const updatedMember = { ...member };
      updatedMember.id = drone.clientId;
      setMember(updatedMember);
    });

    const room = drone.subscribe("observable-room");

    const onData = (data: string, member: any) => {
      if (joined) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { member, text: data },
        ]);
      }
    };
    room.on("data", onData);

    setDroneData(drone);

    return () => {
      joined = false;
      room.off("data", onData);
      drone.close();
    };
  }, []);

  const onSendMessage = (message: string) => {
    droneData.publish({
      room: "observable-room",
      message,
    });
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>My Chat App</h1>
      </div>
      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={onSendMessage} />
    </div>
  );
}

export default App;

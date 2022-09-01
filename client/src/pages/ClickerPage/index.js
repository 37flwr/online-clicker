import axios from "axios";
import React, { useEffect, useState } from "react";
import socket from "../../socket";

const ClickerPage = () => {
  const [clicksLeft, setClicksLeft] = useState(0);
  useEffect(() => {
    const roomId = new URLSearchParams(window.location.search).get("title");
    // socket.on("receive_msg", (data) => {
    //   setReceivedMsg(data.message);
    // });
    // axios({
    //   method: "get",
    //   url: "/roomClicks",
    //   params: { asd: 1 },
    // });
    axios
      .get("http://localhost:8080/roomClicks", { params: { roomId } })
      .then((res) => {
        console.log(res);
        setClicksLeft(res.data);
      });
  }, []);
  return <div>{clicksLeft}</div>;
};

export default ClickerPage;

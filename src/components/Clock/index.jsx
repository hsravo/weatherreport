import { useState, useEffect } from "react";
import "./style.scss";

const Clock = () => {

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const tick = setInterval(() => {
        setTime(new Date())
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  return <p id="timeClock">{time.getHours()}:
  {time.getMinutes()<10?'0'+time.getMinutes():''+time.getMinutes()}:
  {time.getSeconds()<10?'0'+time.getSeconds():''+time.getSeconds()}</p>;
};

export default Clock;

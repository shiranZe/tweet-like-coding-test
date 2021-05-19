import React, { useEffect, useState } from 'react'
export default function Popup({ togglePopup }) {
  const [time, setTime] = useState(3)
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(time - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [time]);
  return (
    <div className="popup">
      <button className="popup-btn" onClick={togglePopup}>abort?</button>
      <h3>00:0{time}</h3>
    </div>
  )
}
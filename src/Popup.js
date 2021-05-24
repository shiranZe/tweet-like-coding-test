import React, { useEffect, useState, useRef } from 'react'
export default function Popup({ onRequestCompleted, onAbort }) {

  const [time, setTime] = useState(3)
  const popoverRef = useRef(null)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTime(time - 1);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [time]);

  useEffect(() => {
    if (time === 0) {
      onRequestCompleted()
    }
  }, [time])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);


  const handleClickOutside = (e) => {
    if (popoverRef.current && !popoverRef.current.contains(e.target)) {
      onRequestCompleted()
    }
  };

  return (
    <div ref={popoverRef} className="popup">
      <button className="popup-btn" onClick={onAbort}>abort?</button>
      <h3>00:0{time}</h3>
    </div>
  )
}
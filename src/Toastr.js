import React, { useEffect, useRef } from "react";

function Toastr({ onUndoClick, onOutsideClick }) {
  const toastrRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", onOutsideClick, true);
    return () => {
      document.removeEventListener("click", onOutsideClick, true);
    };
  }, [toastrRef, onOutsideClick]);

  return (
    <div className="toastr-wrapper" ref={toastrRef}>
      <div>Are you sure you want to like this tweet?</div>
      <button className="undo-like-btn" onClick={onUndoClick}>
        Undo
      </button>
    </div>
  );
}

export default Toastr;

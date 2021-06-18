import React from "react";

function Toastr({ onUndoClick }) {
  return (
    <div className="toastr-wrapper">
      <div>Are you sure you want to like this tweet?</div>
      <button className="undo-like-btn" onClick={onUndoClick}>
        Undo
      </button>
    </div>
  );
}

export default Toastr;

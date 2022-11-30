import React from "react";

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Our contacts</h1>
        </div>
        <div className="body">
          <p>github and linkden info</p>
        </div>
      </div>
    </div>
  );
}

export default Modal;

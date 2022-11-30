import React, { useState } from "react";
import {FaCopy} from 'react-icons/fa';
import {Tooltip} from '@mui/material'


function Modal({ setOpenModal, value }) {
  const [copy, setCopy] = useState('')

  const handleCopy = ()=>{
    setCopy(value)
     navigator.clipboard.writeText(copy)
  }

  const handleChange = () =>{}
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}>
            X
          </button>
        </div>
        <div className="title">
          <h1>Invite</h1>
        </div>
        <div className="body" >
          <input value={value} onChange={handleChange}/>
          <Tooltip title="Copy">
             <button onClick={handleCopy}><FaCopy /></button>
        </Tooltip>

        </div>
      </div>
    </div>
  );
}

export default Modal;

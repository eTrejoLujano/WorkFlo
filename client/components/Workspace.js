import React, { useState } from "react";
import CopyLinkModal from './CopyLinkModal'
import SingleCard from './SingleCard'

function Workspace() {
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState('')

  const inviteClicked = ()=> {
    setModalOpen(true)
    setValue(window.location.host)
  }

  return (
    <div>
      <div className='invite'>
        <button onClick={inviteClicked}>
          + Invite
        </button>
      </div>
      {modalOpen && <CopyLinkModal setOpenModal={setModalOpen} value ={value}/>}
      <SingleCard text="Here" />
      <SingleCard text="We" />
      <SingleCard text="Go" />
    </div>
  )
}

export default Workspace

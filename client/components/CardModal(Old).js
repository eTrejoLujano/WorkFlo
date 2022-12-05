import React, { useState } from "react";
import { useDispatch } from "react-redux";
import TextareaAutosize from 'react-textarea-autosize';


function CardModal({ setOpenModal, cardId, title, description }) {
  const [titleValue, setTitleValue] = useState({title: title,});
  const [descriptionValue, setDescriptionValue] = useState({description: description,});
  const dispatch = useDispatch()

  const handleTitleChange = (event) => {
    setTitleValue({ ...titleValue, [event.target.name]: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setDescriptionValue({ ...descriptionValue, [event.target.name]: event.target.value });
  };

  return (
    <div className="cardModalBackground">
      <div className="cardModalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => {setOpenModal(false)}}>
            X
          </button>
        </div>
        <div>
          <form onChange={handleTitleChange}>
            <TextareaAutosize
              style={styles.titleTextArea}
              name="title"
              value={titleValue.title}
            />
          </form>
        </div>
        <div>
        <form onChange={handleDescriptionChange}>
            <TextareaAutosize
              style={styles.descriptionTextArea}
              name="description"
              value={descriptionValue.description}
            />
          </form>
        </div>
        <div>
          <p>Members Assigned</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  descriptionTextArea: {
    resize: 'none',
    width: '100%',
  },
  titleTextArea: {
    resize: 'none',
    width: '100%',
  }
}

export default CardModal;

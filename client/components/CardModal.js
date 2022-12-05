import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";

import Modal from "./ReusableModal";
import { toggleModal } from "../store/uiSlice";
import { fetchCards, updateCard } from "../store/cardSlice";
import { assignToCard, removeFromCard } from "../store/userCardSlice";

const CardModal = () => {
  const dispatch = useDispatch();
  const { selectedCard } = useSelector((state) => state.ui)
  const selectedProject = useSelector((state) => state.project.selectedProject)
  const projectUsers = selectedProject.users
  
  const [formVals, setFormVals] = useState({
    title: selectedCard.title,
    description: selectedCard.description,
    cardId: selectedCard.cardId,
  });

  useEffect(() => {
    setFormVals(selectedCard)
  }, [selectedCard])                             
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCard({ ...formVals, title: formVals.title, description: formVals.description, cardId: formVals.cardId }));
    dispatch(toggleModal("card"));
    dispatch(fetchCards(selectedProject.id));
  };

  const handleChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
  };

  const handleAssign = (user) => {
    dispatch(assignToCard({userId: user.id, cardId: selectedCard.cardId})); 
  };

  const handleRemove = (user) => {
    dispatch(removeFromCard({userId: user.id, cardId: selectedCard.cardId})); 
  };

  return (
    <div>
      <Modal modalName="card">
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="title">title</label>
            <TextareaAutosize
              placeholder={selectedCard.title}
              style={styles.titleTextArea}
              name="title"
              value={formVals.title}
              onChange={handleChange}
              styles={styles.descriptionTextArea}
            />
            <label htmlFor="title">description</label>
            <TextareaAutosize
              style={styles.descriptionTextArea}
              name="description"
              value={formVals.description} 
              onChange={handleChange}
              styles={styles.descriptionTextArea}
            />
          </div>

          <p>Assigned Team Members</p>
          <div>
            {selectedCard.users && selectedCard.users.map((user) => (
                <div key={user.id} style={styles.projectMembers}>
                  {user.fullName}
                  <button onClick={() => handleRemove(user)}>Remove</button>
                </div>
            ))}
          </div>
          
          <p>Assign Team Members</p>
          <div>
            {projectUsers && projectUsers.map((user) => (
                <div key={user.id} style={styles.projectMembers}>
                  {user.fullName}
                  <button onClick={() => handleAssign(user)}>Assign</button>
                </div>
            ))}
          </div>
          <button type="submit">Save</button>
        </form>
      </Modal>
    </div>
  );
};

const styles = {
  descriptionTextArea: {
    resize: "none",
    width: "100%",
  },
  projectMembers: {
    cursor: "pointer"
  },
  titleTextArea: {
    resize: "none",
    width: "100%",
  },
  assignedUsers: {
    display: "flex",
    flexWrap: "wrap",
  },
};

export default CardModal;
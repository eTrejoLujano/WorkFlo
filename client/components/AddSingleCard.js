import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createCard } from "../store/cardSlice";

function AddSingleCard(props) {
  const { listid } = props;

  const dispatch = useDispatch();
  const [showAddCard, setShowAddCard] = useState(false);
  const [titleValue, setTitleValue] = useState({
    title: "",
    description: "",
  });

  const handleChange = (event) => {
    setTitleValue({ ...titleValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowAddCard(!showAddCard);
    dispatch(createCard({ ...titleValue, listId: listid }));
  };

  return (
    <div>
      {showAddCard ? (
        <div style={styles.buttonContainer}>
          <form onSubmit={handleSubmit}>
            <input
              name="title"
              value={titleValue.title}
              onChange={handleChange}
            />
            <button type="submit">Add Card</button>
          </form>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setShowAddCard(!showAddCard)}
            style={styles.toggleAddCard}
          >
            Add Another Card
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 5,
    height: 36,
    width: 272,
  },
  toggleAddCard: {
    cursor: "pointer",
    padding: "10px",
    color: "#6b808c",
    borderRadius: "0 0 10px 10px",
    display: "flex",
    alignItems: "center",
  },
};

export default AddSingleCard;

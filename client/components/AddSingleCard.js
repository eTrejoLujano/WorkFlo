import React, { useState } from "react";
import { createCard } from "../store/cardSlice";
import { useDispatch } from "react-redux";

function AddSingleCard(props) {
  const { listid } = props;
  const dispatch = useDispatch();
  const [showAddCard, setShowAddCard] = useState(false);
  const [titleValue, setTitleValue] = useState({
    title: "",
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
          <button onClick={() => setShowAddCard(!showAddCard)}>
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
};

export default AddSingleCard;

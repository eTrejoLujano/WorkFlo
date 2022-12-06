import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleModal, selectedCard } from "../store/uiSlice";
import { Draggable } from "react-beautiful-dnd";
import CardModal from "./CardModal2";

const SingleCard = ({ cardId, title, description, index, users }) => {
  // const { modalIsOpen } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(selectedCard({ cardId, title, description, users }));
    dispatch(toggleModal("card"));
  };

  // const cards = useSelector((state) => state.cards);

  return (
    <div>
      {/* <CardModal modalName="card" /> */}
      <Draggable draggableId={cardId.toString()} index={index}>
        {(provided) => {
          return (
            <div
              onClick={handleClick}
              // style={styles.cardContainer}

              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <div>{title}</div>
            </div>
          );
        }}
      </Draggable>
    </div>
  );
};

const styles = {
  cardContainer: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    // backgroundColor: "red",
  },
  cardContent: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    // justifyContent: "flex-end",
    // backgroundColor: "green"
  },
  editIcon: {
    cursor: "pointer",
    height: 18,
    width: 18,
    // justifyContent: "flex-end"
  },
};
export default SingleCard;

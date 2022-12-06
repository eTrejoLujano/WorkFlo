import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";

import { toggleModal, selectedCard } from "../store/uiSlice";
import { Draggable } from "react-beautiful-dnd";
import CardModal from "./CardModal";

const SingleCard = ({ cardId, title, description, index, users }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(selectedCard({ cardId, title, description, users }));
    dispatch(toggleModal("card"));
  };

  // const cards = useSelector((state) => state.cards);

  return (
    <Draggable draggableId={cardId.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          style={styles.cardContainer}
          // onClick={handleClick}
          {...provided.draggableProps}
          // {...provided.dragHandleProps}
        >
          {/* {modalOpen && (
        <CardModal
          cardId={cardId}
          title={title}
          description={description}
        />
      )} */}
          <CardContent style={styles.cardContent} {...provided.dragHandleProps}>
            {/* <Typography> */}
            {title}
            {/* </Typography> */}
          </CardContent>
        </div>
      )}
    </Draggable>
  );
};

const styles = {
  cardContainer: {
    position: "relative",
    cursor: "pointer",
    background: " white",
    margin: "5px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    boxShadow: "0 1px 0 rgba(9, 45, 66, 0.25)",
    fontSize: "15px",
    overflowWrap: "break-word",
    minHeight: "18px",
    // cursor: "pointer",
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
    // marginBottom: 8,
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

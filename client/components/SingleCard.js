import React from "react";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "../styles/Card.css";

import { toggleModal, selectedCard } from "../store/uiSlice";
import { Draggable } from "react-beautiful-dnd";

const SingleCard = ({
  cardId,
  title,
  description,
  index,
  updatedAt,
  users,
  cardHashId,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(selectedCard({ cardId, title, description, updatedAt, users }));
    dispatch(toggleModal("card"));
  };

  return (
    <Draggable draggableId={cardHashId} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          className="Card"
          onClick={handleClick}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <CardContent>
            <Typography sx={{ fontFamily: "Ubuntu" }}>{title}</Typography>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default SingleCard;

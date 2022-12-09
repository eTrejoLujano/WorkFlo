import React from "react";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
i;
import "../styles/Card.css";
import "../styles/List.css";

import { toggleModal, selectedCard } from "../store/uiSlice";
import { Draggable } from "react-beautiful-dnd";

const SingleCard = ({
  cardId,
  title,
  description,
  index,
  users,
  cardHashId,
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(selectedCard({ cardId, title, description, users }));
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
        >
          <CardContent>
            <Typography>{title}</Typography>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

const styles = {
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

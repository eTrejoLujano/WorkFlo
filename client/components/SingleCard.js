import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import CardModal from "./CardModal";
import { toggleModal, selectedCard } from "../store/uiSlice";

const SingleCard = ({ cardId, title, description, users }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(selectedCard({ cardId, title, description, users }));
    dispatch(toggleModal("card"));
  };

  return (
    <div>
      <CardModal cardId={cardId} title={title} description={description}/>
      <Card onClick={handleClick} style={styles.cardContainer}>
        <CardContent style={styles.cardContent}>
          <Typography>{title}</Typography>
        </CardContent>
      </Card>
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

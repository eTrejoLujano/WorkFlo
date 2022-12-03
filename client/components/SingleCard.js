import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import CardModal from "./CardModal2";
import { toggleModal, selectedCard } from "../store/uiSlice";

const SingleCard = ({ cardId, title, description }) => {
  const dispatch = useDispatch();
  // const {}=useSelector(state=>state)

  const handleClick = (e) => {
    dispatch(selectedCard({ title, description }));
    dispatch(toggleModal("card"));
  };

  return (
    <Card style={styles.cardContainer}>
      <CardModal />

      {/* {modalOpen && <CardModal
        setOpenModal={setModalOpen}
        cardId={cardId}
        title={title}
        description={description}/>} */}
      <CardContent onClick={handleClick} style={styles.cardContent}>
        <Typography>{title}</Typography>
      </CardContent>
    </Card>
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

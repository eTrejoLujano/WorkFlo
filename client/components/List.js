import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddSingleCard from "./AddSingleCard";
import SingleCard from "./SingleCard";
import { fetchCards } from "../store/cardSlice";

function List(props) {
  const { title, listid } = props;
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards);

  const filterCards = cards.filter((item) => item.listId === listid);

  return (
    <div style={styles.container}>
      <h4>{title}</h4>

      {filterCards &&
        filterCards.map((card) => (
          <SingleCard
            key={card.id}
            cardId={card.id}
            title={card.title}
            description={card.description}
            users={card.users}
          />
        ))}
      <AddSingleCard listid={listid} />
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "lightblue",
    borderRadius: 5,
    width: 300,
    padding: 7,
    marginRight: 8,
  },
};

export default List;

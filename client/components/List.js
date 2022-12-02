import React from "react";
import { useSelector } from "react-redux";
import AddAnotherButton from "./AddAnotherButton";
import SingleCard from "./SingleCard";

function List(props) {
  const { title, cards } = props;
  return (
    <div style={styles.container}>
      <h4>{title}</h4>

      {cards &&
        cards.map((card) => (
          <SingleCard
            key={card.id}
            cardId={card.id}
            title={card.title}
            description={card.description}
          />
        ))}
      <AddAnotherButton />
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

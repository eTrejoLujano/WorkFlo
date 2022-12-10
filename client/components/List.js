import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";

import "../styles/List.css";
import AddSingleCard from "./AddSingleCard";
import SingleCard from "./SingleCard";

function List(props) {
  const { title, listid, index, listHashId } = props;
  const cards = useSelector((state) => state.cards);
  const filterCards = cards.filter((item) => item.listId === listid);

  return (
    // <div style={styles.lists}>
    <Draggable draggableId={listHashId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="List"
        >
          <div className="List-Title" {...provided.dragHandleProps}>
            {title}
          </div>
          <Droppable droppableId={listHashId} type="card">
            {(provided) => (
              <div
                style={styles.container}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {filterCards &&
                  filterCards.map((card, index) => (
                    <SingleCard
                      key={card.id}
                      // id={card.id}
                      cardId={card.id}
                      title={card.title}
                      description={card.description}
                      cardHashId={card.cardHashId}
                      index={index}
                      users={card.users}
                    />
                  ))}
                <AddSingleCard listid={listid} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
    // </div>
  );
}

const styles = {
  container: {
    backgroundColor: "lightblue",
    // borderRadius: 5,
    minHeight: "100",
    padding: "8px",
    boxShadow: "4px 4px 4px grey",
    // flexGrow: ,
    // marginRight: 8,
    // position: "static",
  },
};

export default List;

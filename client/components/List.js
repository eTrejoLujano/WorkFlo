import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";

import "../styles/list.css";
import AddSingleCard from "./AddSingleCard";
import SingleCard from "./SingleCard";
import { fetchCards } from "../store/cardSlice";

function List(props) {
  const { title, listid, index, listHashId } = props;
  const dispatch = useDispatch();
  const params = useParams();
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
          <div style={styles.ListTitle} {...provided.dragHandleProps}>
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
    // flexGrow: ,
    // marginRight: 8,
    // position: "static",
  },
  lists: {
    background: "#dfe3e6",
    flexShrink: 0,
    width: "272px",
    height: "fit-content",
    margin: "10px",
    marginRight: 0,
    borderRadius: "10px",
    border: "1px solid rgba(0, 0, 0, 0.12)",
  },
  ListTitle: {
    cursor: "pointer",
    padding: "10px",
    overflowWrap: "breakWord",
  },
};

export default List;

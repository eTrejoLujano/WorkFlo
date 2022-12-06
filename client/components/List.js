import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";

import AddSingleCard from "./AddSingleCard";
import SingleCard from "./SingleCard";
import { fetchCards } from "../store/cardSlice";

function List(props) {
  const { title, listid, index } = props;
  const dispatch = useDispatch();
  const params = useParams();
  const cards = useSelector((state) => state.cards);

  const filterCards = cards.filter((item) => item.listId === listid);

  return (
    // <div style={styles.lists}>
    <Draggable draggableId={listid.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={styles.lists}
        >
          <div style={styles.ListTitle}>{title}</div>
          <Droppable droppableId={listid.toString()} type="card">
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
                      index={index}
                    />
                  ))}
                {provided.placeholder}
                <AddSingleCard listid={listid} />
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
    flexGrow: 1,
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
    overflowWrap: "break-word",
  },
};

export default List;

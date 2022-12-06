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
    <div>
      <Draggable draggableId={listid.toString()} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            style={styles.lists}
          >
            <h4>{title}</h4>
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
    // position: "static",
  },
  lists: {
    display: "flex",
    flexDirection: "column",
  },
  listindex: {
    zIndex: -1,
  },
};

export default List;

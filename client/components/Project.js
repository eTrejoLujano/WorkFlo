import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext, onDragEnd } from "react-beautiful-dnd";

import { fetchLists, updateList } from "../store/listSlice";
import List from "./List";
import AddList from "./AddList";
import CopyLinkModal from "./CopyLinkModal";
import { fetchSelectedProject } from "../store/projectSlice";
import { fetchCards } from "../store/cardSlice";

function Project() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const projects = useSelector((state) => state.project);
  const cards = useSelector((state) => state.cards);
  const params = useParams();

  useEffect(() => {
    dispatch(fetchLists(params.projectId));
    dispatch(fetchSelectedProject(params.projectId));
    dispatch(fetchCards(params.projectId));
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const [state, setState] = useState(lists);

  const buttonClicked = () => {
    setModalOpen(true);
    setValue(window.location.href);
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const [aList] = lists.filter((item) => item.id === +source.droppableId);
    const [aCardDrag] = cards.filter((item) => item.id === +draggableId);

    const newCardIds = aList.cards.map((item) => item);

    newCardIds.splice(source.index, 1);
    newCardIds.splice(destination.index, 0, aCardDrag);

    const newList = {
      ...aList,
      cards: newCardIds,
    };

    const index = lists.findIndex((object) => {
      return object.id === newList.id;
    });

    const arrangedList = lists.map((item) => item);

    arrangedList.splice(index, 1, newList);

    const newState = {
      ...state,
      lists: { ...arrangedList },
    };

    const arrayOfObj = Object.keys(newState.lists).map(
      (key) => (newState.lists[key] = newState.lists[key])
    );

    setState(arrayOfObj);
    dispatch(updateList(arrayOfObj));
  };

  return (
    <div>
      <div className="workspace-heading">
        <h2>{projects.selectedProject?.title}</h2>
        <button className="inviteBtn" onClick={buttonClicked}>
          + Invite
        </button>

        {modalOpen && (
          <CopyLinkModal setOpenModal={setModalOpen} value={value} />
        )}
      </div>

      <div style={styles.listsContainer}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state[0]
            ? state.map((list) => {
                return (
                  <List
                    key={list.id}
                    title={list.title}
                    cards={list.cards}
                    listid={list.id}
                  />
                );
              })
            : lists.length &&
              lists.map((list) => {
                return (
                  <List
                    key={list.id}
                    title={list.title}
                    cards={list.cards}
                    listid={list.id}
                  />
                );
              })}
          <AddList projectid={params.projectId} />
        </DragDropContext>
      </div>
    </div>
  );
}

const styles = {
  listsContainer: {
    display: "flex",
    flexDirection: "row",
  },
};

export default Project;

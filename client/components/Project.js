import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchLists } from "../store/listSlice";
import List from "./List";
import AddList from "./AddList";
import CopyLinkModal from "./CopyLinkModal";
import { fetchSelectedProject } from "../store/projectSlice";
import { fetchCards } from "../store/cardSlice";

function Project() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const projects = useSelector((state) => state.project);
  const params = useParams();

  useEffect(() => {
    dispatch(fetchLists(params.projectId));
    dispatch(fetchSelectedProject(params.projectId));
    dispatch(fetchCards(params.projectId));
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState("");

  const buttonClicked = () => {
    setModalOpen(true);
    setValue(window.location.href);
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
        {lists.length &&
          lists.map((list) => (
            <List
              key={list.id}
              title={list.title}
              cards={list.cards}
              listid={list.id}
            />
          ))}
        <AddList projectid={params.projectId} />
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

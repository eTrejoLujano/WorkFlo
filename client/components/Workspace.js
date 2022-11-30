import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchLists } from "../store/listSlice";
import AddAnotherButton from "./AddAnotherButton";
import List from "./List";

function Workspace() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const params = useParams();
  useEffect(() => {
    dispatch(fetchLists(params.projectId));
  }, []);
  return (
    <div>
      <h2>This Is The Workspace</h2>
      <div style={styles.listsContainer}>
        {lists.length &&
          lists.map((list) => (
            <List key={list.id} title={list.title} cards={list.cards} />
          ))}
        <AddAnotherButton list />
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

export default Workspace;

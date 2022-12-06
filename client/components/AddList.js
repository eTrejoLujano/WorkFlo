import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createList } from "../store/listSlice";

const AddList = ({ projectid }) => {
  const dispatch = useDispatch();
  const [showAddList, setShowAddList] = useState(false);
  const [titleValue, setTitleValue] = useState({
    title: "",
  });

  const handleChange = (event) => {
    setTitleValue({ ...titleValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("TITLEVALUE>>>>", titleValue);
    if (titleValue === "") {
      console.log("TITLEVALUE IN>>>>", titleValue);
      setShowAddList(!showAddList);
      console.log("hello");
      return;
    }
    setShowAddList(!showAddList);
    dispatch(createList({ ...titleValue, projectId: projectid }));
  };
  return (
    <div style={styles.addList}>
      {showAddList ? (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              name="title"
              value={titleValue.title}
              onChange={handleChange}
            />
            <button type="submit">Add List</button>
          </form>
        </div>
      ) : (
        <div>
          <button onClick={() => setShowAddList(!showAddList)}>
            Add Another List
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  addList: {
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    borderRadius: "10px",
    cursor: "pointer",
    // color: #fff,
    display: " flex",
    alignItems: "center",
    minHeight: "32px",
    padding: "5px 8px",
    // transition: background-color 85ms ease-in, opacity 40ms ease-in,
    //   border-color 85ms ease-in;
    height: "fit-content",
  },
};

export default AddList;

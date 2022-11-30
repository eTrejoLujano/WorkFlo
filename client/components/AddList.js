import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createList } from "../store/listSlice";

const AddList = () => {
  const dispatch = useDispatch();
  const [showAddList, setShowAddList] = useState(false);
  const [titleValue, setTitleValue] = useState({
    title: "",
  });

  // useEffect(() => {
  //   setShowAddList(!showAddList);
  // }, []);

  const handleChange = (event) => {
    setTitleValue({ ...titleValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowAddList(!showAddList);
    dispatch(createList(titleValue));
  };
  return (
    <div>
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

export default AddList;

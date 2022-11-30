import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createList } from "../store/listSlice";

const AddList = () => {
  const dispatch = useDispatch();
  const [showAddList, setShowAddList] = useState(true);
  const [titleValue, setTitleValue] = useState({
    title: "",
  });

  const handleChange = (event) => {
    setTitleValue({ ...titleValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
            <button type="submit">
              {showAddList ? "Add List" : "Add Another List"}
            </button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
      <button onClick={() => setShowAddList(!showAddList)} type="submit">
        {showAddList ? "Add List" : "Add Another List"}
      </button>
    </div>
  );
};

export default AddList;

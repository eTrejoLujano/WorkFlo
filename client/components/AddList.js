import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const AddList = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showAddList, setShowAddList] = useState(false);
  return (
    <div>
      {showAddList ? (
        <div>
          <input type="text"></input>
        </div>
      ) : (
        <div></div>
      )}
      <button onClick={() => setShowAddList(!showAddList)}>
        {showAddList ? "Add List" : "Add Another List"}
      </button>
    </div>
  );
};

export default AddList;   

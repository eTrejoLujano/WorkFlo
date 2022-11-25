import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "../store/courseSlice";

const CourseForm = () => {
  const dispatch = useDispatch();

  const [vals, setVals] = useState({
    title: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCourse(vals));
  };
  const handleChange = (e) => {
    setVals({ ...vals, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="title" value={vals.title} onChange={handleChange} />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default CourseForm;

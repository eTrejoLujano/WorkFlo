import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCourses } from "../store/courseSlice";
import styled from "styled-components";

const BrowseCourses = () => {
  const dispatch = useDispatch();
  const { allCourses } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(loadCourses());
  }, []);

  const handleEnroll = () => {
    window.alert("enrolling has not been implemented.");
  };
  return (
    <div>
      {allCourses.map((c) => {
        return (
          <CoursesContainer key={c.id}>
            <h2>{c.title}</h2>
            <button onClick={handleEnroll}>ENROLL</button>
          </CoursesContainer>
        );
      })}
    </div>
  );
};

export default BrowseCourses;

const CoursesContainer = styled.div`
  border: 1px solid black;
  margin-bottom: 5px;
`;

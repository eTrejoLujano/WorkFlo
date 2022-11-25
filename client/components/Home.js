import React from "react";
import { connect } from "react-redux";
import VideoChat from "./VideoChat";
import styled from "styled-components";
import Classroom from "./Classroom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const dummyCourses = ["Fullstack Academy", "History", "Math"];

export const Home = () => {
  const dispatch = useDispatch();
  const { username, role } = useSelector((state) => state.auth);

  return (
    <div>
      <h3>Welcome, {username}</h3>
      {/* <VideoChat /> */}
      {role === "admin" && (
        <Link to="/courses/form">
          <button>Start a new course!</button>
        </Link>
      )}
      <h2>Your courses</h2>
      <CoursesContainer>
        {dummyCourses.map((c, i) => (
          <Link key={i} to="/classroom">
            <p>{c}</p>
          </Link>
        ))}
      </CoursesContainer>
    </div>
  );
};

export default Home;

const CoursesContainer = styled.div`
  border: 1px solid black;
`;

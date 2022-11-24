import React from "react";
import { connect } from "react-redux";
import VideoChat from "./VideoChat";
import styled from "styled-components";
import Classroom from "./Classroom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const dummyClasses = ["Fullstack Academy", "History", "Math"];

export const Home = () => {
  const dispatch = useDispatch();
  const { username, role } = useSelector((state) => state.auth);

  return (
    <div>
      <h3>Welcome, {username}</h3>
      {/* <VideoChat /> */}
      {role === "admin" && <button>Start a new class!</button>}
      <h2>Your classes</h2>
      <ClassesContainer>
        {dummyClasses.map((c, i) => (
          <Link key={i} to="/classroom">
            <p>{c}</p>
          </Link>
        ))}
      </ClassesContainer>
    </div>
  );
};

export default Home;

const ClassesContainer = styled.div`
  border: 1px solid black;
`;

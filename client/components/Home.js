import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AddList from "./AddList";

const dummyCourses = ["Fullstack Academy", "History", "Math"];

export const Home = () => {
  const dispatch = useDispatch();
  const { email, role } = useSelector((state) => state.auth);

  return (
    <div>
      <AddList />
    </div>
  );
};

export default Home;

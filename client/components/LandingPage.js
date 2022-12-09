import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
const LandingPage = () => {
  return (
    <Container>
      <Box>
        <h2>
          Improve your productivity with with top of the line task management
          tool
        </h2>
        <h3>Introducing WorkFlo</h3>
        <img
          src="https://img.freepik.com/free-photo/water-splash-isolated-white-background_1112-2043.jpg?w=2000"
          height="504px"
          width="inherit"
        />
      </Box>
      <Link to="/login">
        <Button variant="contained" size="large">
          Getting Started
        </Button>
      </Link>
    </Container>
  );
};

export default LandingPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 121, 110, 1) 35%,
    rgba(0, 212, 255, 1) 100%
  );
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  height: 504px;
  width: 60vw;
  background-size: contain;
  background-repeat: no-repeat;
  justify-content: center;
  align-items: center;
  font-family: Ubuntu;
`;

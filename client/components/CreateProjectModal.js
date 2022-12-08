import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ClassNames } from "@emotion/react";
import styled from "styled-components";
import Box from '@mui/material/Box';
import { Button, Typography } from "@mui/material";
import MUIModal from "@mui/material/Modal";
import TextField from '@mui/material/TextField';

import { createProject, fetchProjects } from "../store/projectSlice";
import { toggleModal } from "../store/uiSlice";
import { addInvitedUser } from "../store/copyLinkSlice";
import { compareHash } from "../store/copyLinkSlice";
import socket from "../socket";

export const CreateProjectModal = () => {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state) => state.ui.modalIsOpen.createProject);

  // Add New Project
  const [titleValue, setTitleValue] = useState({title: ""});
  const [titleError, setTitleError] = useState(false)
  const handleSubmit = (event) => {
    event.preventDefault();
    setTitleError(false)

    if (titleValue.title === '') {
      setTitleError(true)
      return;
    }
    dispatch(createProject(titleValue))
    dispatch(toggleModal("createProject"));
  };

  return ( 
    <MUIModal 
      open={modalIsOpen}
      onClose={() => dispatch(toggleModal("createProject"))}
    >
    <HomeContainer>
      <NewTitleContainer>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField 
            onChange={(event) => setTitleValue({...titleValue, [event.target.name]: event.target.value})}
            name="title"
            variant="outlined"
            placeholder="Project Title"
            required
            error={titleError}
          />
          <Button type="submit" variant="contained">Add a New Project</Button>
        </form>
      </NewTitleContainer>
    </HomeContainer>

    </MUIModal>
  );
};

export default CreateProjectModal;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputSubmit = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const NewTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  height: 200px;
  width: 80%;
  border-radius: 10px;
  padding: 10px;
`;

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  height: 200px;
  width: 80%;
  border-radius: 10px;
  padding: 10px;
`;




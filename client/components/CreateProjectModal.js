import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Box from "@mui/material/Box";  
import { Button, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import TextField from '@mui/material/TextField';

import { createProject } from "../store/projectSlice";
import { toggleModal } from "../store/uiSlice";

export const CreateProjectModal = () => {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state) => state.ui.modalIsOpen.createProject);

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
    <Modal 
      open={modalIsOpen}
      onClose={() => dispatch(toggleModal("createProject"))}
    >
      <Box position="absolute" top="10%" left="50%" sx={{  width: 600 }}>
          <form 
          noValidate autoComplete="off" 
          onSubmit={handleSubmit}  
          >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <TextField 
              onChange={(event) => setTitleValue({...titleValue, [event.target.name]: event.target.value})}
              name="title"
              variant="outlined"
              placeholder="Project Title"
              required
              error={titleError}
            />
            <Button type="submit" variant="contained">Add New Project</Button>
        </Box>
          </form>
      </Box>
    </Modal>
  );
};

export default CreateProjectModal;

// const HomeContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

// const InputSubmit = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;


// const NewTitleContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   border: 1px solid black;
//   height: 200px;
//   width: 80%;
//   border-radius: 10px;
//   padding: 10px;
//   justify-content: center;
//   align-items: center;
// `;

// const ProjectContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   border: 1px solid black;
//   height: 200px;
//   width: 80%;
//   border-radius: 10px;
//   padding: 10px;
// `;




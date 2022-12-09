import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Box from "@mui/material/Box";  
import { Button, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { spacing } from '@mui/system';
import TextField from '@mui/material/TextField';

import { createProject } from "../store/projectSlice";
import { toggleModal } from "../store/uiSlice";

export const CreateProjectModal = (props) => {
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
    props.closeProjectMenu()
  };

  return ( 
    <Modal 
      open={modalIsOpen}
      onClose={() => dispatch(toggleModal("createProject"))}
    >
      <Box 
        position="absolute" 
        top="40%" 
        left="40%" 
        sx={{  position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #5A5A5A",
        borderRadius: 5,
        boxShadow: 24,
        p: 4,}}
      >
          <form 
          noValidate autoComplete="off" 
          onSubmit={handleSubmit}  
          >
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: "center", 
            justifyContent: "center",
          }}
        >
            <Typography>Add New Project</Typography>
            <TextField 
              onChange={(event) => setTitleValue({...titleValue, [event.target.name]: event.target.value})}
              name="title"
              variant="outlined"
              placeholder="Project Title"
              required
              error={titleError}
              sx={{width: "80%"}}
            />
            <Button type="submit" variant="contained">Create</Button>
        </Box>
          </form>
      </Box>
    </Modal>
  );
};

export default CreateProjectModal;





import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { toggleModal } from "../store/uiSlice";

const ProjectMenu = () => {
  const dispatch = useDispatch();
  const { userProjects } = useSelector((state) => state.project);
  const { createProject } = useSelector((state) => state.ui.modalIsOpen)

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Open & Close ProjectMenu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }

  // Open CreateProjectModal
  const handleOpen = () => {
    dispatch(toggleModal("createProject"));
  }

  return (
    <div>
      <Button
        id="projects-button"
        aria-controls={open ? 'projects-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleClick}
      >
        PROJECTS
      </Button>
      <Menu
        id="projects-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'projects-button',
        }}
      >
        {userProjects.length &&
          userProjects.map((project) => (project.id &&
            <MenuItem key={project.id}>
              <Link to={`/projects/${project.id}`}>
                {project.title}
               </Link>
            </MenuItem>
          ))}
        <MenuItem onClick={handleOpen}>
          <AddIcon/>New Project
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ProjectMenu;

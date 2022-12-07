import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


const ProjectMenu = () => {
  const { userProjects } = useSelector((state) => state.project);

  const dispatch = useDispatch();
  // const projectUsers = selectedProject.users
  
  // useEffect(() => {
  //   setFormVals(selectedCard)
  // }, [userProjects]) 

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
          userProjects.map((project) => (
            <MenuItem key={project.id}>
              <Link to={`/projects/${project.id}`}>
                {project.title}
               </Link>
            </MenuItem>
          ))}
      </Menu>
    </div>
  );
}

export default ProjectMenu;
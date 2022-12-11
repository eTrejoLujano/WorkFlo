import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useParams } from "react-router-dom";
import { toggleModal } from "../store/uiSlice";
import socket from "../socket";

const ProjectMenu = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { userProjects, selectedProject } = useSelector(
    (state) => state.project
  );
  const auth = useSelector((state) => state.auth);
  const { createProject } = useSelector((state) => state.ui.modalIsOpen);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // Open & Close ProjectMenu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Open CreateProjectModal
  const handleOpen = () => {
    dispatch(toggleModal("createProject"));
    handleClose();
  };

  return (
    <div>
      <Button
        id="projects-button"
        aria-controls={open ? "projects-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleClick}
        sx={{ color: "white" }}
      >
        PROJECTS
      </Button>
      <Menu
        id="projects-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "projects-button",
        }}
      >
        {userProjects.length &&
          userProjects.map(
            (project) =>
              project.id && (
                <MenuItem
                  onClick={() => {
                    console.log("selectedProject.id :>> ", selectedProject.id);
                    if (selectedProject.id) {
                      socket.emit("user-left", {
                        userId: auth.id,
                        projectId: selectedProject.id,
                      });
                    }
                    socket.emit("user-joined", {
                      userId: auth.id,
                      projectId: project.id,
                    });
                  }}
                  key={project.id}
                >
                  <Link to={`/projects/${project.id}`}>{project.title}</Link>
                </MenuItem>
              )
          )}
        <MenuItem onClick={handleOpen}>
          <AddIcon />
          New Project
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ProjectMenu;

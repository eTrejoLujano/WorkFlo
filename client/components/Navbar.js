import React, { useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { logout } from "../store/authSlice";
import { fetchSelectedProject } from "../store/projectSlice";
import ProjectMenu from "./ProjectMenu";
  
const Navbar = ({ handleClick, isLoggedIn }) => {
  const dispatch = useDispatch();
  const { selectedProject } = useSelector((state) => state.project);
  
  const url = window.location.href.split("/");
  const hash = url.splice(-1)[0];
  const projectId = url[4];

  //adding projectId and hash to local storage
  useEffect(() => {
    if (url.includes("invite")) {
      window.localStorage.setItem("invite", hash);
      window.localStorage.setItem("projectId", projectId);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        padding: 5,
        justifyContent: "space-between",
      }}
    >
      <h1>Hero App</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home"><Button>HOME</Button></Link>
            <ProjectMenu />
            <a href="#" onClick={handleClick}>
            <Button>LOGOUT</Button>
            </a>
          </div>
        ) : (
          <div style={{ right: 0 }}>
            {/* The navbar will show these links before you log in */}
            <Link to="/login"><Button>LOGIN</Button></Link>
            <Link to="/signup"><Button>SIGN UP</Button></Link>
          </div>
        )}
      </nav>
    </div>
  );
};


/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

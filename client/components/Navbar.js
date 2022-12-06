import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/authSlice";

const Navbar = ({ handleClick, isLoggedIn }) => {
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
            <Link to="/home">Home</Link>
            <Link to="/workspace">Projects</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div style={{ right: 0 }}>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
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

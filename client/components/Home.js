import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createProject, fetchProjects } from "../store/projectSlice";
import { addInvitedUser } from "../store/copyLinkSlice";
import { compareHash } from "../store/copyLinkSlice";
import socket from "../socket";

export const Home = () => {
  const user = useSelector((state) => state.auth);

  const projectId = window.localStorage.projectId;

  const { hash } = useSelector((state) => state.link);
  useEffect(() => {
    dispatch(compareHash(projectId));
  }, []);

  // if (window.localStorage.invite && window.localStorage.projectId) {
  useEffect(() => {
    if (hash) {
      // console.log("one", window.localStorage.invite, hash);
      dispatch(
        addInvitedUser({
          userId: user.id,
          projectId: +localStorage.getItem("projectId"),
        })
      );
      window.localStorage.removeItem("invite");
      window.localStorage.removeItem("projectId");
    } else {
      ("invite link invalid");
    }
  }, [hash]);
  // }

  const dispatch = useDispatch();
  const { firstName } = useSelector((state) => state.auth);

  const { userProjects } = useSelector((state) => state.project);
  const [titleValue, setTitleValue] = useState({
    title: "",
    // description: ""
  });

  useEffect(() => {
    dispatch(fetchProjects());
    socket.emit("user-joined", firstName);
  }, []);

  const handleChange = (event) => {
    setTitleValue({ ...titleValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createProject(titleValue));
    // setTitleValue({ title: "" });
  };
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit}>
        <input name="title" value={titleValue.title} onChange={handleChange} />
        <button type="submit">Start new Project</button>
      </form>
      <ProjectContainer>
        {userProjects.length &&
          userProjects.map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`}>
              {project.title}
            </Link>
          ))}
      </ProjectContainer>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

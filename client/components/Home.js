import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects, fetchSelectedProject } from "../store/projectSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const { email, role } = useSelector((state) => state.auth);
  const { userProjects } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);
  return (
    <HomeContainer>
      <button>Start new Project</button>
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

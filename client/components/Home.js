import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";

import { createProject, fetchProjects } from "../store/projectSlice";
import { addInvitedUser } from "../store/copyLinkSlice";
import { compareHash } from "../store/copyLinkSlice";
import ProjectCard from "./ProjectCard";
import { Button, Typography, Grid } from "@mui/material";
import { styled as usedStyles } from "@mui/material/styles";

export const Home = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  const { firstName } = useSelector((state) => state.auth);
  const { userProjects } = useSelector((state) => state.project);
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

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  // Add New Project
  const [titleValue, setTitleValue] = useState({
    title: "",
  });

  const handleChange = (event) => {
    setTitleValue({ ...titleValue, [event.target.name]: event.target.value });
  };

  const [titleError, setTitleError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTitleError(false);

    if (titleValue.title === "") {
      setTitleError(true);
      return;
    }
    dispatch(createProject(titleValue));
    console.log("handleSubmit titleValue", titleValue);
  };

  const classes = styling();

  return (
    <HomeContainer className="backgroundMain">
      <NewTitleContainer>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            onChange={(event) =>
              setTitleValue({
                ...titleValue,
                [event.target.name]: event.target.value,
              })
            }
            name="title"
            variant="outlined"
            placeholder="Project Title"
            required
            error={titleError}
          />
          <Button type="submit" variant="contained">
            Add a New Project
          </Button>
        </form>
      </NewTitleContainer>
      <ProjectContainer>
        <Grid container spacing={5}>
          {userProjects?.length &&
            userProjects?.map((project) => (
              <Grid xs={9} sm={4} className={classes.container}>
                <ProjectCard
                  projectId={project.id}
                  title={project.title}
                  created={project.createdAt}
                />
              </Grid>
            ))}
        </Grid>
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

const InputSubmit = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NewTitleContainer = styled.div`
  display: flex;
  // flex-direction: column;
  height: 200px;
  width: 80%;
  padding: 10px;
  // align-items: flex-start;
  margin-left: auto;
`;

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 80%;
`;

const styling = usedStyles({
  container: {
    overFlow: "scroll",
    marginBottom: "10px",
  },
});

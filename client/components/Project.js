// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchSelectedProject } from "../store/projectSlice";

const Project = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { selectedProject } = useSelector((state) => state.project);
  useEffect(() => {
    dispatch(fetchSelectedProject(params.projectId));
  }, []);
  return <div>{JSON.stringify(selectedProject)}</div>;
};

export default Project;

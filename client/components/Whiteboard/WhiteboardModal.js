import React, { useState } from "react";
import cryptoRandomString from "crypto-random-string";
import { startWhiteboard } from "../../store/projectSlice";
import { useDispatch } from "react-redux";
import ReusableModal from "../ReusableModal";
import { toggleModal } from "../../store/uiSlice";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const WhiteboardModal = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
  });

  const handleSubmit = () => {
    const url = `https://excalidraw.com/#room=${cryptoRandomString({
      length: 20,
    })},${cryptoRandomString({ length: 22 })}`;

    dispatch(
      startWhiteboard({ ...formData, url, projectId: params.projectId })
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <ReusableModal modalName="whiteboard">
      <div
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Start a whiteboard</h1>

        <TextField
          style={{ margin: "10px" }}
          value={formData.title}
          onChange={handleChange}
          id="outlined-basic"
          label="Title"
          name="title"
          variant="outlined"
          required
        />
        <TextField
          style={{ margin: "10px" }}
          value={formData.description}
          onChange={handleChange}
          id="outlined-basic"
          label="Description"
          name="description"
          variant="outlined"
          required
        />

        <Button
          variant="contained"
          onClick={() => {
            handleSubmit();
            dispatch(toggleModal("whiteboard"));
          }}
          style={{ margin: 10 }}
        >
          Start Whiteboard
        </Button>
      </div>
    </ReusableModal>
  );
};

export default WhiteboardModal;

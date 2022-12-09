import React, { useState } from "react";
import cryptoRandomString from "crypto-random-string";
import { startWhiteboard } from "../../store/projectSlice";
import { useDispatch } from "react-redux";
import ReusableModal from "../ReusableModal";
import { toggleModal } from "../../store/uiSlice";
import { useParams } from "react-router-dom";

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
      <div style={{ padding: 20, display: "flex", flexDirection: "column" }}>
        <h1>Start a whiteboard</h1>
        <label htmlFor="title">Title:</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button
          onClick={() => {
            handleSubmit();
            dispatch(toggleModal("whiteboard"));
          }}
          style={{ margin: 10 }}
        >
          Start Whiteboard
        </button>
      </div>
    </ReusableModal>
  );
};

export default WhiteboardModal;

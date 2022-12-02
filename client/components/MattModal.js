import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import { toggleModal } from "../store/uiSlice";

const MattModal = ({ children }) => {
  const dispatch = useDispatch();
  const { modalIsOpen } = useSelector((state) => state.ui);
  return (
    <Modal
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      open={modalIsOpen}
    >
      <div style={{ backgroundColor: "white", padding: 10 }}>
        <p
          style={{ textAlign: "right" }}
          onClick={() => dispatch(toggleModal())}
        >
          X
        </p>
        <Children>{children}</Children>
      </div>
    </Modal>
  );
};

export default MattModal;

const Children = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin: 20;
`;

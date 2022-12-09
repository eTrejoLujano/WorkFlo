import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCopy } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { copyLink } from "../store/copyLinkSlice";
import { toggleModal } from "../store/uiSlice";

function CopyLinkModal({ setOpenModal, value, projectId }) {
  const dispatch = useDispatch();
  const [copy, setCopy] = useState("");

  const [hashValue, setHashValue] = useState({
    hash: "",
  });

  const [disable, setDisable] = useState(false);

  const handleChange = () => {};

  const newHash = uuidv4().split("-").slice(-1)[0];
  useEffect(() => {
    if (hashValue.hash) {
      setCopy(`${value}/invite/${hashValue.hash}`);
    }
  }, [hashValue]);

  useEffect(() => {
    if (copy.length > 0) {
      dispatch(copyLink({ ...hashValue, projectId: projectId }));
      navigator.clipboard.writeText(copy);
    }
  }, [copy]);

  const handleCopy = async () => {
    setHashValue({ hash: newHash });
    setDisable(true);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              dispatch(toggleModal("copyLink"));
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Invite</h1>
        </div>
        <div className="body">
          <input value={value} onChange={handleChange} />
          <Tooltip title="Copy">
            <button onClick={handleCopy} disabled={disable}>
              <FaCopy />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default CopyLinkModal;

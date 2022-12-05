import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../store/uiSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { sendToken } from "../../store/helperFunctions";
import WhiteboardModal from "./WhiteboardModal";

const Whiteboard = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [whiteboards, setWhiteboards] = useState([]);

  useEffect(() => {
    loadWhiteboards();
  }, []);

  const loadWhiteboards = async () => {
    const { data } = await axios.get(
      `/api/whiteboard/${params.projectId}`,
      sendToken()
    );
    setWhiteboards(data);
  };

  return (
    <div style={styles.container}>
      <WhiteboardModal loadWhiteboards={loadWhiteboards} />

      <div style={styles.boardsContainer}>
        Project whiteboards
        {whiteboards.length > 0 &&
          whiteboards.map((w) => (
            <button
              key={w.title}
              onClick={() =>
                window.open(
                  w.url,
                  "_blank",
                  "scrollbars=yes,resizable=yes,top=500,left=500,width=1000,height=1000"
                )
              }
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p>title: {w.title}</p>
                <p>description: {w.description}</p>
              </div>
            </button>
          ))}
      </div>
      <button onClick={() => dispatch(toggleModal("whiteboard"))}>
        Start new whiteboard
      </button>
    </div>
  );
};

export default Whiteboard;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  boardsContainer: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    width: "40%",
    margin: 10,
  },
};

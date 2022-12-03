import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Modal from "./ReusableModal";
import TextareaAutosize from "react-textarea-autosize";
import { toggleModal } from "../store/uiSlice";

const CardModal2 = () => {
  const dispatch = useDispatch();

  //html radio buttons apparently do not have an onChange event so this useRef hook could be a solution to accessing their boolean value.
  const Dummy1 = useRef(null);
  console.log("Dummy1.current", Dummy1.current);

  const [formVals, setFormVals] = useState({
    title: "",
    description: "",
  });

  const [assingedUsers, setAssignedUsers] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormVals({ title: "", description: "" });
    dispatch(toggleModal("card"));
  };

  const handleChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
  };

  // const handleAssign = (e) => {
  //   setAssignedUsers({
  //     ...assingedUsers,
  //     [e.target.name]: !assingedUsers[e.target.name],
  //   });
  // };

  return (
    <div>
      <Modal modalName="card">
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="title">title</label>
            <TextareaAutosize
              name="title"
              value={formVals.title}
              onChange={handleChange}
              styles={styles.descriptionTextArea}
            />
            <label htmlFor="title">description</label>
            <TextareaAutosize
              name="description"
              value={formVals.description}
              onChange={handleChange}
              styles={styles.descriptionTextArea}
            />
          </div>

          <p>Assigned Users</p>
          <div style={styles.assignedUsers}>
            <div style={styles.dummy}>
              <input
                ref={Dummy1}
                type="radio"
                // onChange={handleAssign}
                name="Dummy1"
                value={assingedUsers["Dummy1"]}
              />
              <label htmlFor="Dummy1">Dummy1</label>
              <input
                type="radio"
                // onChange={handleAssign}
                name="Dummy2"
                value={assingedUsers["Dummy2"]}
              />
              <label htmlFor="Dummy2">Dummy2</label>
            </div>
          </div>

          <button type="submit">save</button>
        </form>
      </Modal>
    </div>
  );
};

export default CardModal2;

const styles = {
  descriptionTextArea: {
    resize: "none",
    width: "100%",
  },
  titleTextArea: {
    resize: "none",
    width: "100%",
  },
  dummy: {
    display: "flex",
  },
  assignedUsers: {
    display: "flex",
    flexWrap: "wrap",
  },
};

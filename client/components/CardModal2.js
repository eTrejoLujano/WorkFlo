import React, { useState } from "react";
import ReusableModal from "../components/ReusableModal";
import styled from "styled-components";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../store/uiSlice";
import { useEffect } from "react";

const CardModal2 = () => {
  const dispatch = useDispatch();

  const { modalIsOpen } = useSelector((state) => state.ui);

  const project = useSelector((state) => state.project);
  const { selectedCard } = useSelector((state) => state.ui);
  const [cardVals, setCardVals] = useState({
    title: "",
  });

  const usersOnTask = selectedCard.users?.map((u) => u.firstName);

  const handleChange = (e) => {
    setCardVals({ ...cardVals, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    window.alert();
  };

  return (
    <Modal
      open={modalIsOpen["card"]}
      onCancel={() => dispatch(toggleModal("card"))}
    >
      <CardContainer>
        <label>Title:</label>
        <input
          name="title"
          value={cardVals.title || ""}
          onChange={handleChange}
        />
        <label>Description:</label>
        <input
          name="description"
          value={cardVals.description || ""}
          onChange={handleChange}
        />
        <p>Assignees</p>
        <AssigneeBox>
          {selectedCard.users &&
            selectedCard.users.map((u) => (
              <Assignee>
                <Frame>
                  <img height="60px" width="60px" src={u.avatarURL} />
                </Frame>
              </Assignee>
            ))}
        </AssigneeBox>
        <ProjectMemberBox>
          {project.selectedProject.users?.map((u) => {
            return (
              <ProjectMember key={u.id}>
                <p>{u.firstName}</p>
                <button onClick={() => handleClick(u.firstName)}>
                  {usersOnTask?.includes(u.firstName) ? "remove" : "add"}
                </button>
              </ProjectMember>
            );
          })}
        </ProjectMemberBox>
      </CardContainer>
    </Modal>
    // <ReusableModal modalName="card">
    //   <CardContainer>
    //     <label>Title:</label>
    //     <input />
    //     <label>Description:</label>
    //     <input />
    //     <p>Assignees</p>
    //   </CardContainer>
    // </ReusableModal>
  );
};

export default CardModal2;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Assignee = styled.div`
  display: flex;
  flex-basis: row;
`;

const AssigneeBox = styled.div``;

const ProjectMemberBox = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: row;
`;

const ProjectMember = styled.div`
  margin: 5px;
`;

const Frame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  overflow: hidden;
`;

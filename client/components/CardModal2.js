import React, { useState } from "react";
import ReusableModal from "../components/ReusableModal";
import styled from "styled-components";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { selectedCard, toggleModal } from "../store/uiSlice";
import { useEffect } from "react";
import { assignToCard, removeFromCard } from "../store/userCardSlice";

const CardModal2 = () => {
  const dispatch = useDispatch();
  const { modalIsOpen } = useSelector((state) => state.ui);
  const { project } = useSelector((state) => state);

  const { users, cardId, title, description } = useSelector(
    (state) => state.ui.selectedCard
  );

  const userCard = useSelector((state) => state.userCard);
  const indexUserCard = userCard.length - 1;
  const users2 = userCard[indexUserCard]?.users;

  const [cardVals, setCardVals] = useState({
    title: title,
  });

  const handleChange = (e) => {
    setCardVals({ ...cardVals, [e.target.name]: e.target.value });
  };

  const usersOnTask = (users2 ? users2 : users)?.map((user) => user.id);

  const handleClick = (e, userId) => {
    const userCard = { userId, cardId };
    !usersOnTask.includes(userId)
      ? dispatch(assignToCard(userCard))
      : dispatch(removeFromCard(userCard));
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
          value={cardVals.title || title}
          onChange={handleChange}
        />
        <label>Description:</label>
        <input
          name="description"
          value={cardVals.description || description}
          onChange={handleChange}
        />
        <p>Assignees</p>
        <AssigneeBox>
          {(users2 ? users2 : users)?.map((u) => (
            <Assignee key={u.id}>
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
                <button onClick={(e) => handleClick(e, u.id)}>
                  {usersOnTask?.includes(u.id) ? "remove" : "add"}
                </button>
              </ProjectMember>
            );
          })}
        </ProjectMemberBox>
      </CardContainer>
    </Modal>
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

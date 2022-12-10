import React, { useState } from "react";
import ReusableModal from "../components/ReusableModal";
import styled from "styled-components";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { selectedCard, toggleModal } from "../store/uiSlice";
import { useEffect } from "react";
import { assignToCard, removeFromCard } from "../store/userCardSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const CardModal2 = () => {
  const dispatch = useDispatch();
  const { modalIsOpen } = useSelector((state) => state.ui);
  const { project } = useSelector((state) => state);

  const { users, cardId, title, description } = useSelector(
    (state) => state.ui.selectedCard
  );

  const userCard = useSelector((state) => state.userCard);

  const filterUserCard = userCard.filter((card) => card.id === cardId);
  let filterIndex = filterUserCard.length - 1;
  const filterUsers = filterUserCard[filterIndex]?.users;

  const [cardVals, setCardVals] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    setCardVals({ title, description });
  }, [cardId]);

  const handleChange = (e) => {
    setCardVals({ ...cardVals, [e.target.name]: e.target.value });
  };

  const usersOnTask = (filterUsers ? filterUsers : users)?.map(
    (user) => user.id
  );

  const handleClick = (e, userId) => {
    const userCard = { userId, cardId };
    !usersOnTask?.includes(userId)
      ? dispatch(assignToCard(userCard))
      : dispatch(removeFromCard(userCard));
  };

  return (
    // <Modal
    //   open={modalIsOpen["card"]}
    //   onCancel={() => dispatch(toggleModal("card"))}
    // >
    <ReusableModal modalName="card">
      <CardContainer>
        <TextField
          style={{ margin: "10px" }}
          value={cardVals.title}
          onChange={handleChange}
          id="outlined-basic"
          label="Title"
          name="title"
          variant="outlined"
          required
        />
        <TextField
          style={{ margin: "10px" }}
          value={cardVals.description}
          onChange={handleChange}
          id="outlined-basic"
          label="Description"
          name="description"
          variant="outlined"
          required
        />
        <h2 style={{ textAlign: "center" }}>Assignees</h2>
        <AssigneeBox>
          {(filterUsers ? filterUsers : users)?.map((u) => (
            <Assignee key={u.id}>
              <Frame>
                <img height="60px" width="60px" src={u.avatarURL} />
              </Frame>
            </Assignee>
          ))}
        </AssigneeBox>
        <hr />
        <ProjectMemberBox>
          {project.selectedProject.users?.map((u) => {
            return (
              <ProjectMember key={u.id}>
                <p>{u.firstName}</p>
                <Button
                  variant="contained"
                  onClick={(e) => handleClick(e, u.id)}
                >
                  {usersOnTask?.includes(u.id) ? "remove" : "add"}
                </Button>
              </ProjectMember>
            );
          })}
        </ProjectMemberBox>
      </CardContainer>
    </ReusableModal>
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

const AssigneeBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const ProjectMemberBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
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

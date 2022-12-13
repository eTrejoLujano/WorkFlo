import React, { useState } from "react";
import ReusableModal from "../components/ReusableModal";
import styled from "styled-components";
import { Avatar, } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { selectedCard, toggleModal } from "../store/uiSlice";
import { useEffect } from "react";
import { assignToCard, removeFromCard } from "../store/userCardSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

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
    const userCard = {
      userId,
      cardId,
      task: title,
      projectId: project.selectedProject.id,
      projectTitle: project.selectedProject.title,
    };
    !usersOnTask?.includes(userId)
      ? dispatch(assignToCard(userCard))
      : dispatch(removeFromCard(userCard));
  };

  const handleClose = (e) => {
    console.log('***HANDLE CLOSE***')
    // e.preventDefault();
    // dispatch(updateCard({ ...formVals, title: formVals.title, description: formVals.description, cardId: formVals.cardId }));
    // dispatch(toggleModal("card"));
    // dispatch(fetchCards(selectedProject.id));
  };

  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const pickedColor = "#" + randomColor;

  return (
    <ReusableModal 
      modalName="card"
      onClose={(handleClose)}
    >
      <CardContainer>
        <TextField
          style={{
            margin: "10px",
            backgroundColor: "white",
          }}
          value={cardVals.title}
          onChange={handleChange}
          id="outlined-basic"
          label="Title"
          name="title"
          variant="outlined"
          required
          inputProps={{ style: {fontFamily: "Ubutu" } }}
        />
        <TextField
          style={{ margin: "10px", backgroundColor: "white" }}
          value={cardVals.description}
          onChange={handleChange}
          id="outlined-basic"
          label="Description"
          name="description"
          variant="outlined"
          required
          inputProps={{ style: {fontFamily: "Ubutu" } }}
        />
        <h2 style={{ textAlign: "center" }}>Assignees</h2>
        <AssigneeBox>
          {(filterUsers ? filterUsers : users)?.map((u) => (
            <Assignee key={u.id}>
              {u.avatarURL ? (
                <Frame>
                  <img height="60px" width="60px" src={u.avatarURL} />
                </Frame>
              ) : (
                <Avatar sx={{ bgcolor: pickedColor, width: 40, height: 40 }}>
                  {u.firstName.charAt(0).toUpperCase()}
                  {u.lastName.charAt(0).toUpperCase()}
                </Avatar>
              )}
              <Typography sx={{ fontFamily: "Ubutu" }}>{u.firstName}</Typography>
            </Assignee>
          ))}
        </AssigneeBox>
        <hr />
        <ProjectMemberBox>
          {project.selectedProject.users?.map((u) => {
            return (
              <ProjectMember key={u.id}>
                <div
                  style={{
                    backgroundColor: "whitesmoke",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                >
                 <Typography sx={{ fontFamily: "Ubutu" }}>{u.firstName}</Typography>
                </div>

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
        <hr />
        <CreatedAtBox>
           {/* <Typography sx={{ fontFamily: "Ubutu" }} >
              <span>{"Created "}</span>
              <span>{date}</span>
              <span>{" at "}</span>
              <span>{time}</span>
            </Typography>
           <Typography sx={{ fontFamily: "Ubutu" }} >
              <span>{"Updated "}</span>
              <span>{date}</span>
              <span>{" at "}</span>
              <span>{time}</span>
            </Typography> */}
        </CreatedAtBox>
      </CardContainer>
    </ReusableModal>
  );
};

export default CardModal2;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 50px;
`;

const Assignee = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AssigneeBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const CreatedAtBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const ProjectMemberBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ProjectMember = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin: 5px;
`;

const Frame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  overflow: hidden;
`;

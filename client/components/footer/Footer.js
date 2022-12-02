import React, { useState } from "react";
import { FaRegCopyright } from "react-icons/fa";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { toggleModal } from "../../store/uiSlice";
import TeamMemberModal from "./TeamMemberModal";

function Footer() {
  const dispatch = useDispatch();
  const [member, setMember] = useState("matt");

  return (
    <Container>
      <TeamMemberModal member={member} />
      <FaRegCopyright /> Copyright 2022, Team H
      <PhotoBox>
        {["matt", "jerral", "erik", "peter"].map((memb) => {
          return (
            <img
              key={memb}
              onClick={() => {
                setMember(memb);
                dispatch(toggleModal());
              }}
              src={`/images/profilePic/${memb}.jpeg`}
              height="50px"
              width="50px"
              style={{ borderRadius: "100px" }}
            />
          );
        })}
      </PhotoBox>
    </Container>
  );
}

export default Footer;

const MemberPhotos = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-top: auto;
  color: rgb(252, 254, 255);
  background-color: rgb(23, 23, 96);
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0;
  font-size: 12px;
`;

const PhotoBox = styled.div`
  margin: 10px;
`;

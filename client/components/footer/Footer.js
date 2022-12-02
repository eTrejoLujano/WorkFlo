import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaRegCopyright } from "react-icons/fa";
import styled from "styled-components";
import { toggleModal } from "../../store/uiSlice";
import TeamMemberModal from "./TeamMemberModal";

function Footer() {
  const dispatch = useDispatch();
  const [member, setMember] = useState("matt");

  return (
    <div className="footer">
      <TeamMemberModal member={member} />
      <FaRegCopyright /> Copyright 2022, Team H
      <div style={{ margin: 10 }}>
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
              style={{ borderRadius: "1000px" }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Footer;

const MemberPhotos = styled.div`
  display: flex;
  justify-content: center;
`;

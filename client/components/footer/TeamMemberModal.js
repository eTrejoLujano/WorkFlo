import React from "react";
import { FaGithub, FaLinkedin, FaRegCopyright } from "react-icons/fa";
import Modal from "../MattModal";

const teamInfo = {
  matt: {
    content: "Hi, I am Matt's content",
    linkedIn: "https://www.linkedin.com/in/matt-bruer/",
    github: "https://github.com/mattbruer",
  },
  jerral: {
    content: "Hi, I am Jerral's content",
    linkedIn: "https://www.linkedin.com/in/matt-bruer/",
    github: "https://github.com/mattbruer",
  },
};
const TeamMemberModal = ({ member }) => {
  return (
    <Modal>
      <div style={{ display: "flex" }}>
        <img
          height="150px"
          width="120px"
          src={`/images/profilePic/${member}.jpeg`}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <a href={teamInfo[member].linkedIn} target="blank">
              <FaLinkedin size="50" />
            </a>
            <a href={teamInfo[member].github} target="blank">
              <FaGithub size="50" />
            </a>
          </div>
          {teamInfo[member].content}
        </div>
      </div>
    </Modal>
  );
};

export default TeamMemberModal;

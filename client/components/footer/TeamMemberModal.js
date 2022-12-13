import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaRegCopyright } from "react-icons/fa";

import Modal from "../ReusableModal";

const teamInfo = {
  matt: {
    content: "Matt Bruer - Full Stack Developer",
    linkedIn: "https://www.linkedin.com/in/matt-bruer/",
    github: "https://github.com/mattbruer",
  },
  jerral: {
    content: "Jerral Graham - Full Stack Developer",
    linkedIn: "https://www.linkedin.com/in/jerral-graham/",
    github: "https://github.com/jerrol3000",
  },
  erik: {
    content: "Erik Trejo - Full Stack Developer",
    linkedIn: "https://www.linkedin.com/in/erik-trejo-lujano/",
    github: "https://github.com/eTrejoLujano",
  },
  peter: {
    content: "Peter Rodocker - Full Stack Developer",
    linkedIn: "https://www.linkedin.com/in/peterrodocker/",
    github: "https://github.com/PeterRodocker",
  },
};
const TeamMemberModal = ({ member }) => {
  return (
    <Modal modalName="footer">
      <div style={{ display: "flex" }}>
        <img
          height="150px"
          width="150px"
          src={`/images/profilePic/${member}.jpeg`}
        />
        <div
          style={{
            backgroundColor: "rgba(255,255,255,.8)",
            width: "100%",
            display: "flex",
            borderRadius: "10px",
            textAlign: "center",
            flexDirection: "column",
          }}
        >
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

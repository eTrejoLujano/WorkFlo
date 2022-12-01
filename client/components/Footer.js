import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaRegCopyright } from "react-icons/fa";
import styled from "styled-components";
import BasicModal from "./Modal";

function Footer() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="footer">
      <div>
        <BasicModal open={open} handleClose={handleClose} />
        <p>
          <FaRegCopyright /> Copyright 2022, --NameOfProduct--
        </p>
      </div>
      <div>
        {/* <FaGithub onClick={iconClicked} /> |
          <FaLinkedin onClick={iconClicked} /> */}
        <div
          style={{
            width: "300px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <img
            onClick={handleOpen}
            src="/images/profilePic/Matt.jpeg"
            height="50px"
            width="50px"
            style={{ borderRadius: "1000px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;

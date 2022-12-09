import React, { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleModal } from "../store/uiSlice";

export default function SimpleAccordion() {
  const dispatch = useDispatch();

  const { whiteboards } = useSelector((state) => state.project);
  return (
    <div style={{ width: "220px", textAlign: "center" }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Whiteboards</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {whiteboards.map((wb) => (
            <button
              key={wb.id}
              onClick={() =>
                window.open(
                  wb.url,
                  "_blank",
                  "scrollbars=yes,resizable=yes,top=500,left=500,width=1000,height=1000"
                )
              }
            >
              <p>title: {wb.title}</p>
              <p>description: {wb.description}</p>
            </button>
          ))}
          <button onClick={() => dispatch(toggleModal("whiteboard"))}>
            new whiteboard
          </button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

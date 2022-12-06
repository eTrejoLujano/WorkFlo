import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";

export default function SimpleAccordion() {
  const { whiteboards } = useSelector((state) => state.project);
  return (
    <div>
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
            <button key={wb.id}>
              <p>title: {wb.title}</p>
              <p>description: {wb.description}</p>
            </button>
          ))}
          <button onClick={() => window.alert("new whiteboard")}>
            new whiteboard
          </button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useSelector } from "react-redux";
import WhiteboardDrawer from "./WhiteboardDrawer";
import { Link } from "react-router-dom";

export default function TemporaryDrawer() {
  const { users, id } = useSelector((state) => state.project.selectedProject);
  const { online } = useSelector((state) => state.chat);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Invite", "Whiteboards"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              {/* <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon> */}
              {text === "Invite" && (
                <p
                  className="inviteBtn"
                  onClick={() => {
                    window.alert("You're in Jerral's hands now!");
                  }}
                >
                  + Invite
                </p>
              )}
              {text === "Whiteboards" && <WhiteboardDrawer />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <Link to={`/chat/${id}`}>Chat</Link>
        </div>
        {users?.map((user, index) => (
          <ListItem key={user.id} disablePadding>
            <ListItemButton>
              <ListItemText primary={user.firstName} />
              <div
                style={{
                  borderRadius: "100px",
                  border: "1px groove grey",
                  height: "10px",
                  width: "10px",
                  backgroundColor: online.includes(user.firstName)
                    ? "green"
                    : "red",
                }}
              ></div>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

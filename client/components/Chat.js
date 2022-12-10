import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useSelector } from "react-redux";

const drawerWidth = 240;

export default function Chat() {
  const { users } = useSelector((state) => state.project.selectedProject);
  const { online } = useSelector((state) => state.chat);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>Chat Room</Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        {users?.map((u) => (
          <div>
            <p>{u.firstName}</p>
          </div>
        ))}
      </Drawer>
      <Box
        component="main"
        sx={{
          bottom: "0px",
          flexGrow: 1,
          bgcolor: "background.default",
          p: 0,
        }}
      >
        <div
          style={{
            border: "1px solid black",
            position: "fixed",
            bottom: "0px",
            width: "100%",
            height: "70px",
          }}
        >
          <input width="50px" />
        </div>
      </Box>
    </Box>
  );
}

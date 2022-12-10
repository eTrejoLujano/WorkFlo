import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProjectMenu from "./ProjectMenu";
import { logout } from "../store/authSlice";
import { connect, useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import AirIcon from "@mui/icons-material/Air";

const theme = createTheme({
  typography: {
    fontFamily: ["Righteous", "sans-serif"].join(","),
  },
});

const Navbar = ({ handleClick, isLoggedIn }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const url = window.location.href.split("/");
  const hash = url.splice(-1)[0];
  const projectId = url[4];

  useEffect(() => {
    if (url.includes("invite")) {
      window.localStorage.setItem("invite", hash);
      window.localStorage.setItem("projectId", projectId);
    }
  }, []);

  let randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const pickedColor = "#" + randomColor;

  return (
    <div>
      {isLoggedIn ? (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: "flex-end" }}>
              <AirIcon
                sx={{
                  display: "flex",
                  mr: 1,
                  fontSize: "70px",
                }}
              />
              <ThemeProvider theme={theme}>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/home"
                  sx={{
                    mr: 2,
                    display: "flex",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                    fontSize: 40,
                    marginRight: "29%",
                  }}
                >
                  WORKFLO
                </Typography>
              </ThemeProvider>
              <ProjectMenu />
              <Box
                sx={{
                  flexGrow: 0,
                  display: "flex",
                }}
              >
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{ bgcolor: pickedColor, width: 40, height: 40 }}
                    >
                      {user.firstName.charAt(0).toUpperCase()}
                      {user.lastName.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Button href="/home" textAlign="center">
                      HOME
                    </Button>
                    <Button href="/profile" textAlign="center">
                      PROFILE
                    </Button>
                    <a href="#" onClick={handleClick}>
                      <Button textAlign="center">LOGOUT</Button>
                    </a>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      ) : (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: "flex-end" }}>
              <AirIcon
                sx={{
                  display: "flex",
                  mr: 1,
                  fontSize: "70px",
                }}
              />
              <ThemeProvider theme={theme}>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/home"
                  sx={{
                    mr: 2,
                    display: "flex",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                    fontSize: 40,
                    marginRight: "20%",
                  }}
                >
                  WORKFLO
                </Typography>
              </ThemeProvider>
              <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: "flex",

                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
                href="/home"
                textAlign="center"
              >
                HOME
              </Typography>
              <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: "flex",
                  fontFamily: "monospace",
                  marginLeft: 10,
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
                href="/login"
                textAlign="center"
              >
                LOGIN
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

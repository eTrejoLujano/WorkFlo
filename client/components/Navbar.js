import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProjectMenu from "./ProjectMenu";
import { logout } from "../store/authSlice";
import { connect, useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import AirIcon from "@mui/icons-material/Air";
import styled from "styled-components";

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
  const { selectedProject } = useSelector((state) => state.project);

  const url = window.location.href.split("/");
  const hash = url.splice(-1)[0];
  const projectId = url[4];

  useEffect(() => {
    if (url.includes("invite")) {
      window.localStorage.setItem("invite", hash);
      window.localStorage.setItem("projectId", projectId);
    }
  }, []);

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
                  href="/"
                  sx={{
                    mr: 2,
                    display: "flex",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                    fontSize: 40,
                    marginRight: "30%",
                  }}
                >
                  WORKFLO
                </Typography>
              </ThemeProvider>
              {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}

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
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
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
            <Toolbar disableGutters>
              <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <ThemeProvider theme={theme}>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  WORKFLO
                </Typography>
              </ThemeProvider>

              <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />

              <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
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
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
                href="/profile"
                textAlign="center"
              >
                PROFILE
              </Typography>
              <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
                href="/login"
                textAlign="center"
              >
                LOGOUT
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </div>
  );
};

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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

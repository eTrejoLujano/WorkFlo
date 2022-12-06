import React from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Navbar from "./components/Navbar";
import Routes from "./Routes";

const theme = createTheme({});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar />
        <Routes />
      </div>
    </ThemeProvider>
  );
};

export default App;

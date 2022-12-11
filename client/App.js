import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Navbar from "./components/Navbar";
import Routes from "./Routes";

const theme = createTheme({
  // typography: {
  //   "fontFamily": `"Ubutu", "Roboto", "Helvetica", "Arial", sans-serif`,
  //   "fontSize": 14,
  //   "fontWeightLight": 300,
  //   "fontWeightRegular": 400,
  //   "fontWeightMedium": 500,
  //  },
  //  ListItemText:{
  //   fontFamily:'Ubutu',
  //   fontSize: '100px'
  // }
});

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

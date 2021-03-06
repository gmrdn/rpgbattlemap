import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Room from "./pages/Room";
import Home from "./pages/Home";
import RoomSelection from "./pages/RoomSelection";
import RoomCreation from "./pages/RoomCreation";
import RoomJoining from "./pages/RoomJoining";
import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/roomselection">
            <RoomSelection />
          </Route>
          <Route path="/joinroom/:id" component={RoomJoining} />
          <Route path="/joinroom" component={Home} />
          <Route path="/room/:id" component={Room} />
          <Route path="/room" component={Home} />
          <Route path="/createroom" component={RoomCreation} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Room from "./pages/Room";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RoomSelection from "./pages/RoomSelection";
import RoomCreation from "./pages/RoomCreation";
import RoomJoining from "./pages/RoomJoining";

const App = () => {
  return (
    <div style={{ paddingBottom: "50px" }}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/roomselection">
            <RoomSelection />
          </Route>
          <Route path="/joinroom/:id" component={RoomJoining} />
          <Route path="/room/:id" component={Room} />
          <Route path="/createroom" component={RoomCreation} />
        </Switch>
      </Router>

      <Footer></Footer>
    </div>
  );
};

export default App;

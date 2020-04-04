import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Room from "./pages/Room";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RoomSelection from "./pages/RoomSelection";

const App = () => {
  return (
    <>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/roomselection">
            <RoomSelection />
          </Route>
          <Route path="/room/:id" component={Room} />
        </Switch>
      </Router>

      <Footer></Footer>
    </>
  );
};

export default App;

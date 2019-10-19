import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import Navbar from "./Navbar";
import AdvertisementFields from "./AdvertisementFields";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./LandingPage";
import SignUp from "./SignUp";
import NeighbourhoodPage from "./NeighbourhoodPage";
import SignIn from "./SignIn";

const App = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-sm-2"
          style={{
            borderStyle: "solid",
            borderWidth: "0px 2px 0px 0px",
            borderColor: "lightgrey"
          }}
        >
          <AdvertisementFields />
        </div>
        <div className="col-sm-8" style={{ padding: "0px" }}>
          <Router history={history}>
            <Navbar />
            <Switch>
              <Route path="/" exact component={LandingPage} />
              <Route path="/kayıtol" exact component={SignUp} />
              <Route
                path="/mahalle/:id/:name"
                exact
                component={NeighbourhoodPage}
              />
              <Route path="/girişyap" exact component={SignIn} />
            </Switch>
          </Router>
        </div>
        <div
          className="col-sm-2"
          style={{
            borderStyle: "solid",
            borderWidth: "0px 0px 0px 2px",
            borderColor: "lightgrey"
          }}
        >
          <AdvertisementFields />
        </div>
      </div>
    </div>
  );
};

export default App;

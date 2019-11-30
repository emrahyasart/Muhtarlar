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
import CandidatePage from "./CandidatePage";
import ProfilePage from "./ProfilePage";
import NotSignedIn from "./NotSignedIn";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import ImageUpload from "./ImageUpload";

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
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/KayıtSayfası" component={SignUp} />
              <Route
                exact
                path="/mahalle/:id/:name"
                component={NeighbourhoodPage}
              />
              <Route exact path="/girişyap" component={SignIn} />
              <Route
                exact
                path="/benimsayfam/:neighbourhoodId/:id"
                component={CandidatePage}
              />
              <Route exact path="/ProfilSayfası" component={ProfilePage} />
              <Route exact path="/GirişYapmadınız" component={NotSignedIn} />
              <Route exact path="/şifreyenileme" component={ForgotPassword} />
              <Route
                exact
                path="/reset/:resetPasswordToken"
                component={ResetPassword}
              />
              <Route exact path="/resimyükle" component={ImageUpload} />
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

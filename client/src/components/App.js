import React from "react";
import Navbar from "./Navbar";
import AdvertisementFields from "./AdvertisementFields";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./LandingPage";

const App = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-sm-2"
          style={{
            borderStyle: "solid",
            borderWidth: "0px 2px 0px 0px",
            borderColor: "black"
          }}
        >
          <AdvertisementFields />
        </div>
        <div className="col-sm-8" style={{ padding: "0px" }}>
          <Navbar />
          <LandingPage />
        </div>
        <div
          className="col-sm-2"
          style={{
            borderStyle: "solid",
            borderWidth: "0px 0px 0px 2px",
            borderColor: "black"
          }}
        >
          <AdvertisementFields />
        </div>
      </div>
    </div>
  );
};

export default App;

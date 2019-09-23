import React from "react";
import Navbar from "./Navbar";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2"></div>
        <div className="col-sm-8">
          <Navbar />
        </div>
        <div className="col-sm-2"></div>
      </div>
    </div>
  );
};

export default App;

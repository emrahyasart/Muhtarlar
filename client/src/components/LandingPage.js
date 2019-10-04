import React from "react";
import DropDown from "./DropDown";
import { Container } from "semantic-ui-react";

const LandingPage = () => {
  return (
    <div>
      <Container
        style={{
          width: "100%",
          height: "700px",
          backgroundColor: "grey",
          padding: "0px"
        }}
      >
        <DropDown />
      </Container>
    </div>
  );
};

export default LandingPage;

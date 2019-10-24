import React from "react";
import { Container } from "semantic-ui-react";

const AdvertisementFields = () => {
  const containerStyle = {
    margin: "100px 0px 0px 100px",
    width: "80%",
    height: "300px",
    borderStyle: "solid",
    borderWidth: "2px",
    borderColor: "lightgrey",
    textAlign: "center",
    fontSize: "30px"
  };
  return (
    <div>
      <Container style={containerStyle}>Banner</Container>
      <Container style={containerStyle}>Banner</Container>
      <Container style={containerStyle}>Banner</Container>
    </div>
  );
};

export default AdvertisementFields;

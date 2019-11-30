import React from "react";
import DropDown from "./DropDown";
import GoogleMap from "./GoogleMap";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";

class LandingPage extends React.Component {
  render() {
    console.log(this.props);
    const newCenter = this.props.location.key && {
      lat: this.props.location.key.lat,
      lng: this.props.location.key.lon
    };

    console.log(newCenter);
    return (
      <div>
        <Container
          style={{
            width: "100%",
            height: "600px",
            backgroundColor: "grey",
            padding: "0px 0px 0px 0px"
          }}
        >
          <GoogleMap
            height="600px"
            blur="1px"
            zoom="11"
            btn="none"
            center={newCenter}
          />
          <Container style={{ marginTop: "-600px" }}>
            <DropDown buttonText="Mahalleme Git" />
          </Container>{" "}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    location: state.location
  };
};

export default connect(mapStateToProps)(LandingPage);

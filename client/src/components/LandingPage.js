import React from "react";
import DropDown from "./DropDown";
import GoogleMap from "./GoogleMap";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";

class LandingPage extends React.Component {
  state = { newZoom: "7" };

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      this.setState({ newZoom: "10" });
    }
  }
  render() {
    const newCenter = this.props.location.key && {
      lat: this.props.location.key.lat,
      lng: this.props.location.key.lon
    };

    const changedZoom = this.state.newZoom;
    return (
      <div>
        <Container
          style={{
            width: "100%",
            height: "800px",
            backgroundColor: "grey",
            padding: "0px 0px 0px 0px"
          }}
        >
          <GoogleMap
            height="800px"
            // blur="1px"

            zoom={this.state.newZoom}
            btn="none"
            center={newCenter}
          />
          <DropDown buttonText="Mahalleme Git" />
        </Container>
        <Container style={{ height: "500px" }} />
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

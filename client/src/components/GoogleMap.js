import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import DropDown from "./DropDown";
import { Container, Button } from "semantic-ui-react";
import Marker from "./Marker";
import { addMarker } from "../actions/locationAction";

class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 39.92077,
      lng: 32.85411
    }
  };

  state = { newLat: null, newLng: null, markerChange: false };

  handleMapClick = e => {
    this.setState({
      markerChange: true,
      newLat: e.lat,
      newLng: e.lng
    });
  };
  handleMarkerAdd = () => {
    const data = {
      lat: this.state.newLat,
      lng: this.state.newLng
    };

    const id =
      this.props.neighbourhoods.key && this.props.neighbourhoods.key.id;

    this.props.addMarker(id, data);
  };

  render() {
    console.log(this.props);
    console.log(localStorage);

    const defaultMarkerCenter = this.props.neighbourhoods.key && {
      lat: this.props.neighbourhoods.key.lat,
      lng: this.props.neighbourhoods.key.lon
    };

    return (
      <Container
        style={{
          padding: "0px",
          height: this.props.height,
          width: "100%",
          textAlign: "center",
          // opacity: "0.5"
          filter: `blur(${this.props.blur})`,
          webkitFilter: `blur(${this.props.blur})`
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "",
            libraries: ["places", "geometry"]
          }}
          defaultCenter={this.props.center}
          center={this.props.center}
          defaultZoom={parseInt(this.props.zoom)}
          yesIWantToUseGoogleMapApiInternals
          onClick={this.handleMapClick}
        >
          <Marker
            lat={
              this.state.markerChange
                ? this.state.newLat
                : this.props.neighbourhoods.key &&
                  this.props.neighbourhoods.key.lat
            }
            lng={
              this.state.markerChange
                ? this.state.newLng
                : this.props.neighbourhoods.key &&
                  this.props.neighbourhoods.key.lng
            }
            name="My Marker"
            color="red"
            defaultCenter={defaultMarkerCenter}
            style={{ zIndex: "3" }}
          />
        </GoogleMapReact>
        {this.props.btn !== "none" &&
        localStorage.role === "Muhtar" &&
        localStorage.neighbourhoodName === this.props.neighbourhoodName ? (
          <Button
            style={{ marginTop: "10px" }}
            color="teal"
            onClick={this.handleMarkerAdd}
          >
            Muhtarık Lokasyonu Ekle
          </Button>
        ) : null}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    location: state.location,
    neighbourhoods: state.neighbourhoods
  };
};

export default connect(mapStateToProps, { addMarker })(GoogleMap);

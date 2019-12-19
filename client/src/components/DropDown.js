import React from "react";
import { connect } from "react-redux";
import {
  fetchCities,
  fetchTowns,
  fetchDistricts,
  fetchNeighbourhoods
} from "../actions/dropdownActions";
import { getCoordinates } from "../actions/locationAction";

import { Dropdown, Form, Container, Button, Grid } from "semantic-ui-react";

class DropDown extends React.Component {
  state = {
    name: "",
    townForm: false,
    districtForm: false,
    neighbourhoodForm: false,
    showButton: false,
    height: "100px",
    selectCity: null,
    zoomAfterCitySelection: null
  };

  componentDidMount() {
    this.props.fetchCities();
  }

  handleChangeTowns = e => {
    const cityId = parseInt(e.currentTarget.id);
    const city = this.props.cities[0].filter(city => city.id === cityId);
    console.log(city);
    const data = {
      lat: city[0] && city[0].lat,
      lon: city[0] && city[0].lon
    };
    this.props.getCoordinates(data);
    this.props.fetchTowns(cityId);
    this.setState({ selectCity: true, zoomAfterCitySelection: "11" });
  };

  handleChangeDistricts = e => {
    const townId = parseInt(e.currentTarget.id);
    this.props.fetchDistricts(townId);
  };

  handleChangeNeighbourhoods = e => {
    const districtId = parseInt(e.currentTarget.id);
    this.props.fetchNeighbourhoods(districtId);
  };

  handleChangeSelect = (e, data) => {
    const selectedNeighbourhood = data.options.filter(
      neighbourhood => neighbourhood.id === parseInt(e.currentTarget.id)
    );
    // console.log(selectedNeighbourhood);
    // const place = `${selectedNeighbourhood[0].cities}, ${selectedNeighbourhood[0].towns}, ${selectedNeighbourhood[0].neighbourhoods}`;
    // console.log(place);
    this.setState({
      name: selectedNeighbourhood[0] && selectedNeighbourhood[0].text,
      id: selectedNeighbourhood[0] && selectedNeighbourhood[0].id,
      showButton: true,
      height: "150px"
    });
  };

  render() {
    const styleDropDown = { backgroundColor: "white", color: "black" };
    const cityList = this.props.cities;

    const options =
      cityList[0] &&
      cityList[0].map(e => ({ ...e, text: e.cities, key: e.id, value: e.id }));

    const townList = this.props.towns;

    const optionsTowns =
      townList.key &&
      townList.key.map(e => ({ ...e, text: e.towns, key: e.id, value: e.id }));

    const districtList = this.props.districts;

    const optionsDistricts =
      districtList.key &&
      districtList.key.map(e => ({
        ...e,
        text: e.districts,
        key: e.id,
        value: e.id
      }));

    const neighbourhoodsList = this.props.neighbourhoods;

    const optionsNeighbourhoods =
      neighbourhoodsList.key &&
      neighbourhoodsList.key.map(e => ({
        ...e,
        text: e.neighbourhoods,
        key: e.id,
        value: e.id
      }));

    return (
      <Container
        style={{
          backgroundColor: "grey ",
          boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          width: "100%",
          // border: "1px solid grey",
          // borderRadius: "5px",
          height: this.state.height,
          padding: "30px 15px 30px 15px",
          position: "relative",
          zIndex: "2",
          opacity: "1"
        }}
      >
        <Form>
          <Grid divided="vertically">
            <Grid.Row columns={7}>
              <Grid.Column></Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <Dropdown
                    style={styleDropDown}
                    onChange={this.handleChangeTowns}
                    options={options}
                    placeholder="Lütfen Şehir Seçiniz"
                    selection
                    search
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <Dropdown
                    style={styleDropDown}
                    onChange={this.handleChangeDistricts}
                    options={optionsTowns && optionsTowns}
                    placeholder="Lütfen İlçe Seçiniz"
                    selection
                    search
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <Dropdown
                    style={styleDropDown}
                    onChange={this.handleChangeNeighbourhoods}
                    options={optionsDistricts && optionsDistricts}
                    placeholder="Lütfen Semt Seçiniz"
                    selection
                    search
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <Dropdown
                    style={styleDropDown}
                    onChange={this.handleChangeSelect}
                    options={optionsNeighbourhoods && optionsNeighbourhoods}
                    placeholder="Lütfen Mahalle Seçiniz"
                    selection
                    search
                  />
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Button
                  style={{
                    width: "100%",
                    // margin: "15px 50px 10px 0px",
                    backgroundColor: "teal",
                    color: "white",
                    fontSize: "15px",
                    textAlign: "center"
                  }}
                  // color="teal"
                  href={
                    this.props.neighbourhoods.key &&
                    `/mahalle/${this.state.id}/${this.state.name}`
                  }
                >
                  {this.props.buttonText}
                </Button>
              </Grid.Column>
              <Grid.Column></Grid.Column>
            </Grid.Row>
          </Grid>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities,
    towns: state.towns,
    districts: state.districts,
    neighbourhoods: state.neighbourhoods,
    location: state.location
  };
};

export default connect(mapStateToProps, {
  fetchCities,
  fetchTowns,
  fetchDistricts,
  fetchNeighbourhoods,
  getCoordinates
})(DropDown);

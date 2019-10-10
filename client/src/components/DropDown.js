import React from "react";
import { connect } from "react-redux";
import { fetchCities } from "../actions/citiesAction";
import { fetchTowns } from "../actions/townsAction";
import { fetchDistricts } from "../actions/districtsAction";
import { fetchNeighbourhoods } from "../actions/neighbourhoodsAction";

import { Dropdown, Form } from "semantic-ui-react";

class DropDown extends React.Component {
  componentDidMount() {
    this.props.fetchCities();
  }

  handleChangeTowns = e => {
    const cityId = parseInt(e.target.id);
    this.props.fetchTowns(cityId);
  };

  handleChangeDistricts = e => {
    const townId = parseInt(e.target.id);
    this.props.fetchDistricts(townId);
  };

  handleChangeNeighbourhoods = e => {
    const districtId = parseInt(e.target.id);
    console.log(districtId);
    this.props.fetchNeighbourhoods(districtId);
  };

  render() {
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

    console.log(optionsNeighbourhoods);

    return (
      <Form
        style={{
          borderRadius: "0px",
          width: "50%",
          margin: "auto"
        }}
      >
        <Form.Field>
          <Dropdown
            onChange={this.handleChangeTowns}
            options={options}
            placeholder="Lütfen Şehir Seçiniz"
            selection
          />
        </Form.Field>
        <Form.Field>
          <Dropdown
            onChange={this.handleChangeDistricts}
            options={optionsTowns && optionsTowns}
            placeholder="Lütfen İlçe Seçiniz"
            selection
          />
        </Form.Field>
        <Form.Field>
          <Dropdown
            onChange={this.handleChangeNeighbourhoods}
            options={optionsDistricts && optionsDistricts}
            placeholder="Lütfen Semt Seçiniz"
            selection
          />
        </Form.Field>
        <Form.Field>
          <Dropdown
            // onChange={this.handleChangeDistricts}
            options={optionsNeighbourhoods && optionsNeighbourhoods}
            placeholder="Lütfen Mahalle Seçiniz"
            selection
          />
        </Form.Field>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities,
    towns: state.towns,
    districts: state.districts,
    neighbourhoods: state.neighbourhoods
  };
};

export default connect(
  mapStateToProps,
  { fetchCities, fetchTowns, fetchDistricts, fetchNeighbourhoods }
)(DropDown);

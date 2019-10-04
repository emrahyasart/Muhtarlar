import React from "react";
import { connect } from "react-redux";
import { fetchCities } from "../actions/citiesAction";
import _ from "lodash";
import { Dropdown } from "semantic-ui-react";

class DropDown extends React.Component {
  componentDidMount() {
    this.props.fetchCities();
  }
  render() {
    const caseSensitiveSearch = (options, query) => {
      const re = new RegExp(_.escapeRegExp(query));
      return options.filter(opt => re.test(opt.text));
    };
    const cityList = this.props.cities;

    const options =
      cityList[0] && cityList[0].map(e => ({ ...e, text: e.cities }));

    return (
      <div>
        <Dropdown
          style={{
            borderRadius: "0px",
            width: "50%",
            margin: "auto"
          }}
          fluid
          options={options}
          placeholder="Try to search for case or CASE"
          search={caseSensitiveSearch}
          selection
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities
  };
};

export default connect(
  mapStateToProps,
  { fetchCities }
)(DropDown);

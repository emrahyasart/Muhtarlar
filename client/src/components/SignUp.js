import React from "react";
import { connect } from "react-redux";
import {
  fetchCities,
  fetchTowns,
  fetchDistricts,
  fetchNeighbourhoods
} from "../actions/dropdownActions";
import { signUp } from "../actions/userAction";
import { Dropdown, Form, Container, Button } from "semantic-ui-react";

class SignUp extends React.Component {
  state = {
    neighbourhoodId: "",
    neighbourhoodName: "",
    role: "",
    firstname: "",
    lastname: "",
    occupation: "",
    email: "",
    phoneno: "",
    adress: "",
    password1: "",
    password2: "",
    passerr: false
  };

  componentDidMount() {
    this.props.fetchCities();
  }

  handleChangeTowns = e => {
    const cityId = parseInt(e.currentTarget.id);
    this.props.fetchTowns(cityId);
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
    this.setState({
      neighbourhoodId: selectedNeighbourhood[0].id,
      neighbourhoodName: selectedNeighbourhood[0].neighbourhoods
    });
  };

  handleRoleSelect = (e, data) => {
    this.setState({ role: data.value });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitUserInfo = () => {
    const {
      neighbourhoodId,
      neighbourhoodName,
      role,
      firstname,
      lastname,
      occupation,
      email,
      adress,
      phoneno,
      password2
    } = this.state;

    const user = {
      firstName: firstname,
      lastName: lastname,
      occupation: occupation,
      email: email,
      phoneNo: phoneno,
      adress: adress,
      password: password2,
      role: role,
      neighbourhoodId: neighbourhoodId,
      neighbourhoodName: neighbourhoodName
    };
    this.state.password1 !== this.state.password2
      ? this.setState({ passerr: true })
      : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          this.state.email
        ) === false
      ? alert("Geçersiz email adresi")
      : /^\d{11}$/.test(this.state.phoneno) === false
      ? alert("Geçersiz telefon numarası")
      : this.props.signUp(user);
    console.log(user);
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

    const optionsRole = [
      { key: "Muhtar", text: "Muhtar", value: "Muhtar" },
      { key: "Muhtar Adayı", text: "Muhtar Adayı", value: "Muhtar Adayı" }
    ];

    return (
      <Container
        style={{
          backgroundColor: "white",
          boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          width: "90%",
          borderRadius: "5px",
          height: `${this.state.role === "Muhtar" ? "650" : "600"}`,
          padding: "30px 15px 30px 15px",
          marginTop: "50px"
        }}
      >
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Şehir</label>
              <Dropdown
                onChange={this.handleChangeTowns}
                options={options}
                placeholder="Lütfen Şehir Seçiniz"
                selection
                search
              />
            </Form.Field>
            <Form.Field>
              <label>İlçe</label>
              <Dropdown
                onChange={this.handleChangeDistricts}
                options={optionsTowns && optionsTowns}
                placeholder="Lütfen İlçe Seçiniz"
                selection
                search
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Semt</label>
              <Dropdown
                onChange={this.handleChangeNeighbourhoods}
                options={optionsDistricts && optionsDistricts}
                placeholder="Lütfen Semt Seçiniz"
                selection
                search
              />
            </Form.Field>
            <Form.Field>
              <label>Mahalle</label>
              <Dropdown
                onChange={this.handleChangeSelect}
                options={optionsNeighbourhoods && optionsNeighbourhoods}
                placeholder="Lütfen Mahalle Seçiniz"
                selection
                search
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Adınız"
              placeholder="Adınız"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleChange}
            />

            <Form.Input
              label="Soyadınız"
              placeholder="Soyadınız"
              lastname="lastname"
              name="lastname"
              value={this.state.lastname}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Input
              label="Meslek"
              placeholder="Meslek"
              lastname="occupation"
              name="occupation"
              value={this.state.occupation}
              onChange={this.handleChange}
            />

            <Form.Field>
              <label>Statü</label>
              <Dropdown
                onChange={this.handleRoleSelect}
                options={optionsRole}
                placeholder="Lütfen Statü Seçiniz"
                selection
                search
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Email"
              placeholder="Email"
              email="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />

            <Form.Input
              label="Telefon Numarası"
              placeholder="Telefon Numarası"
              name="phoneno"
              value={this.state.phoneno}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            {this.state.role === "Muhtar" && (
              <Form.Input
                label="Muhtarlık Adresi"
                placeholder="Muhtarlık Adresi"
                name="adress"
                value={this.state.adress}
                onChange={this.handleChange}
              />
            )}
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              label="Şifre"
              placeholder="Şifre"
              name="password1"
              value={this.state.password1}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Şifre Tekrar"
              placeholder="Şifre Tekrar"
              name="password2"
              value={this.state.password2}
              onChange={this.handleChange}
              error={this.state.passerr ? true : false}
            />
          </Form.Group>
          <Button
            style={{ width: "100%", margin: "15px 50px 10px 0px" }}
            color="teal"
            type="submit"
            onClick={this.submitUserInfo}
          >
            Kaydol
          </Button>
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
    users: state.users
  };
};

export default connect(
  mapStateToProps,
  { fetchCities, fetchTowns, fetchDistricts, fetchNeighbourhoods, signUp }
)(SignUp);

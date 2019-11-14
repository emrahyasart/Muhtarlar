import React from "react";
import { connect } from "react-redux";
import NotSignedIn from "./NotSignedIn";
import {
  Container,
  Grid,
  Segment,
  Button,
  Card,
  Image,
  Dropdown,
  Form
} from "semantic-ui-react";

import {
  fetchUserById,
  editUser,
  editNeighbourhood,
  fetchUser,
  editRole,
  editPassword
} from "../actions/userAction";
import {
  fetchCities,
  fetchTowns,
  fetchDistricts,
  fetchNeighbourhoods
} from "../actions/dropdownActions";

class ProfilePage extends React.Component {
  state = {
    firstname: "",
    lastname: "",
    occupation: "",
    phoneno: "",
    email: "",
    neighbourhoodId: "",
    neighbourhoodName: "",
    role: "",
    oldPassword: "",
    passwordOne: "",
    passwordTwo: "",
    updatePassword: false,
    passerr: false,
    update: false,
    updateNeighbourhood: false,
    updateRole: false
  };
  componentDidMount() {
    this.props.fetchUserById(parseInt(localStorage.userId));
    this.props.fetchCities();
  }
  onFirstnameChange = e => {
    this.setState({ firstname: e.target.value });
  };
  onLastnameChange = e => {
    this.setState({ lastname: e.target.value });
  };
  onOccupationChange = e => {
    this.setState({ occupation: e.target.value });
  };
  onPhonenoChange = e => {
    this.setState({ phoneno: e.target.value });
  };
  onEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  onUpdate = () => {
    this.setState({ update: false });
    const userId = this.props.currentUser.keyUserById.id;
    const user = this.props.currentUser.keyUserById;
    const { firstname, lastname, occupation, phoneno, email } = this.state;
    const data = {
      firstName: firstname === "" ? user.firstName : firstname,
      lastName: lastname === "" ? user.lastName : lastname,
      occupation: occupation === "" ? user.occupation : occupation,
      phoneNo: phoneno === "" ? user.phoneNo : phoneno,
      email: email === "" ? user.email : email
    };

    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      this.state.email === "" ? user.email : this.state.email
    ) === false
      ? alert("Geçersiz email adresi")
      : /^\d{11}$/.test(
          this.state.phoneno === "" ? user.phoneNo : this.state.phoneno
        ) === false
      ? alert("Geçersiz telefon numarası")
      : this.props.editUser(userId, data);
  };

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
    this.props.fetchUser(selectedNeighbourhood[0].id);
  };

  updateNeighbourhood = () => {
    const users = this.props.currentUser.key;
    const neighbourhoodAdmin =
      users.length !== 0 && users.filter(user => user.role === "Muhtar");
    const userId = this.props.currentUser.keyUserById.id;
    const { neighbourhoodName, neighbourhoodId } = this.state;

    const data = {
      neighbourhoodName: neighbourhoodName,
      neighbourhoodId: neighbourhoodId
    };

    this.props.currentUser.keyUserById.role !== "Muhtar"
      ? this.props.editNeighbourhood(userId, data)
      : neighbourhoodAdmin[0] === undefined
      ? this.props.editNeighbourhood(userId, data)
      : this.props.currentUser.keyUserById.role === "Muhtar" &&
        neighbourhoodAdmin[0].id === this.props.currentUser.keyUserById.id
      ? this.props.editNeighbourhood(userId, data)
      : alert("Seçilen mahallenin Muhtarı mevcuttur");
  };

  handleRoleSelect = (e, data) => {
    this.setState({ role: data.value });
    this.props.fetchUser(this.props.currentUser.keyUserById.neighbourhoodId);
  };

  updateRole = () => {
    const users = this.props.currentUser.key;
    const neighbourhoodAdmin =
      users.length !== 0 && users.filter(user => user.role === "Muhtar");
    const userId = this.props.currentUser.keyUserById.id;
    const { role } = this.state;

    const data = {
      role: role
    };

    role !== "Muhtar"
      ? this.props.editRole(userId, data)
      : neighbourhoodAdmin.length === 0
      ? this.props.editRole(userId, data)
      : neighbourhoodAdmin.length !== 0 &&
        neighbourhoodAdmin[0].id === this.props.currentUser.keyUserById.id
      ? this.props.editRole(userId, data)
      : alert("Bu mahallenin muhtarı mevcuttur");
  };

  handlePasswordChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changePassword = () => {
    const userId = this.props.currentUser.keyUserById.id;
    const { passwordOne, passwordTwo, oldPassword } = this.state;
    const data = {
      oldPassword: oldPassword,
      password: passwordTwo
    };
    passwordOne !== passwordTwo
      ? this.setState({ passerr: true })
      : this.props.editPassword(userId, data);
  };

  render() {
    const admin =
      this.props.currentUser.keyUserById && this.props.currentUser.keyUserById;

    const styleSegment = { fontSize: "16px", padding: "10px" };
    const styleSpan = {
      fontWeight: "bold",
      marginTop: this.state.update && "-15px"
    };

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
    return !localStorage.auth ? (
      <NotSignedIn />
    ) : (
      <Container
        style={{
          backgroundColor: "white",
          boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          width: "90%",
          borderRadius: "5px",
          height: this.state.update
            ? "530px"
            : this.state.updateNeighbourhood
            ? "650px"
            : this.state.updateRole
            ? "550px"
            : this.state.updatePassword
            ? "700px"
            : "380px",
          padding: "30px 15px 30px 15px",
          marginTop: "50px"
        }}
      >
        <Container
          style={{
            paddingLeft: "9px",
            paddingRight: "0px",
            width: "100%"
          }}
        >
          <Grid>
            <Grid.Row style={{ height: "280px", paddingBottom: "0px" }}>
              <Grid.Column width={4}>
                <Card style={{ marginLeft: "5px" }}>
                  <Image
                    src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                    wrapped
                    ui={false}
                    bordered
                    style={{
                      backgroundColor: "white",
                      boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      borderRadius: "2px",
                      border: "1px solid lightgrey"
                    }}
                  />
                </Card>
              </Grid.Column>

              <Grid.Column width={12} style={{ paddingRight: "0px" }}>
                <Container
                  style={{
                    backgroundColor: "white",

                    padding: "0px",
                    width: "100%",
                    height: "285px"
                  }}
                >
                  <Grid
                    columns="equal"
                    style={{
                      paddingTop: "0px",
                      paddingBottom: "10px",
                      paddingLeft: "10px",
                      marginTop: "0px",
                      marginLeft: "13px"
                    }}
                  >
                    <Grid.Row style={{ padding: "0px 0px 16px 0px" }}>
                      <Grid.Column>
                        <Segment style={styleSegment}>
                          <span style={styleSpan}>Ad:</span>{" "}
                          {this.state.update ? (
                            <textarea
                              contentEditable={this.state.update}
                              suppressContentEditableWarning={true}
                              placeholder={admin && admin.firstName}
                              onChange={this.onFirstnameChange}
                              style={{
                                width: "100%",
                                lineHeight: "15px",
                                paddingTop: "10px",
                                border: "none"
                              }}
                            />
                          ) : (
                            <span>{admin && admin.firstName}</span>
                          )}
                        </Segment>
                      </Grid.Column>
                      <Grid.Column>
                        <Segment style={styleSegment}>
                          <span style={styleSpan}>Soyad:</span>{" "}
                          {this.state.update ? (
                            <textarea
                              contentEditable={this.state.update}
                              suppressContentEditableWarning={true}
                              placeholder={admin && admin.lastName}
                              onChange={this.onLastnameChange}
                              style={{
                                width: "100%",
                                lineHeight: "15px",
                                paddingTop: "10px",
                                border: "none"
                              }}
                            />
                          ) : (
                            <span>{admin && admin.lastName}</span>
                          )}
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: "6px 0px 16px 0px" }}>
                      <Grid.Column>
                        <Segment style={styleSegment}>
                          <span style={styleSpan}>Meslek:</span>{" "}
                          {this.state.update ? (
                            <textarea
                              contentEditable={this.state.update}
                              suppressContentEditableWarning={true}
                              placeholder={admin && admin.occupation}
                              onChange={this.onOccupationChange}
                              style={{
                                width: "100%",
                                lineHeight: "15px",
                                paddingTop: "10px",
                                border: "none"
                              }}
                            />
                          ) : (
                            <span>{admin && admin.occupation}</span>
                          )}
                        </Segment>
                      </Grid.Column>
                      <Grid.Column>
                        <Segment style={styleSegment}>
                          <span style={styleSpan}>Tel No:</span>{" "}
                          {this.state.update ? (
                            <textarea
                              contentEditable={this.state.update}
                              suppressContentEditableWarning={true}
                              placeholder={admin && admin.phoneNo}
                              onChange={this.onPhonenoChange}
                              style={{
                                width: "100%",
                                lineHeight: "15px",
                                paddingTop: "10px",
                                border: "none"
                              }}
                            />
                          ) : (
                            <span>{admin && admin.phoneNo}</span>
                          )}
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: "6px 0px 16px 0px" }}>
                      <Grid.Column>
                        <Segment style={styleSegment}>
                          <span style={styleSpan}>Email:</span>{" "}
                          {this.state.update ? (
                            <textarea
                              contentEditable={this.state.update}
                              suppressContentEditableWarning={true}
                              placeholder={admin && admin.email}
                              onChange={this.onEmailChange}
                              style={{
                                width: "100%",
                                lineHeight: "15px",
                                paddingTop: "10px",
                                border: "none"
                              }}
                            ></textarea>
                          ) : (
                            <span>{admin && admin.email}</span>
                          )}
                        </Segment>
                      </Grid.Column>
                      <Grid.Column>
                        <Segment style={styleSegment}>
                          <span style={styleSpan}>Statü:</span>{" "}
                          <span>{admin && admin.role}</span>
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: "6px 0px 16px 0px" }}>
                      <Grid.Column>
                        <Segment style={styleSegment}>
                          <span style={styleSpan}>Adres:</span>{" "}
                          <span>{admin && admin.adress}</span>
                        </Segment>
                      </Grid.Column>
                      <Grid.Column>
                        <Segment style={styleSegment}>
                          <span style={styleSpan}>Mahalle:</span>{" "}
                          <span>{admin && admin.neighbourhoodName}</span>
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Container>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row
              style={{ width: "100%", marginTop: this.state.update && "150px" }}
            >
              <Grid.Column width={4}>
                <Button
                  style={{ width: "100%" }}
                  color="teal"
                  type="submit"
                  onClick={
                    this.state.update
                      ? this.onUpdate
                      : () =>
                          this.setState({
                            update: true,
                            updateNeighbourhood: false,
                            updateRole: false,
                            updatePassword: false
                          })
                  }
                >
                  {this.state.update ? "Kaydet" : "Güncelle"}
                </Button>
              </Grid.Column>
              <Grid.Column width={4}>
                <Button
                  style={{ width: "100%" }}
                  color="teal"
                  type="submit"
                  onClick={
                    this.state.updateNeighbourhood
                      ? this.updateNeighbourhood
                      : () =>
                          this.setState({
                            update: false,
                            updateNeighbourhood: true,
                            updateRole: false,
                            updatePassword: false
                          })
                  }
                >
                  {this.state.updateNeighbourhood
                    ? "Kaydet"
                    : "Mahalle Güncelleme"}
                </Button>
              </Grid.Column>
              <Grid.Column width={4}>
                <Button
                  style={{ width: "100%" }}
                  color="teal"
                  type="submit"
                  onClick={
                    this.state.updateRole
                      ? this.updateRole
                      : () =>
                          this.setState({
                            update: false,
                            updateNeighbourhood: false,
                            updateRole: true,
                            updatePassword: false
                          })
                  }
                >
                  {this.state.updateRole ? "Kaydet" : "Statü Güncelleme"}
                </Button>
              </Grid.Column>
              <Grid.Column width={4}>
                <Button
                  style={{ width: "100%" }}
                  color="teal"
                  type="submit"
                  onClick={
                    this.state.updatePassword
                      ? this.changePassword
                      : () =>
                          this.setState({
                            update: false,
                            updateNeighbourhood: false,
                            updateRole: false,
                            updatePassword: true
                          })
                  }
                >
                  {this.state.updatePassword ? "Kaydet" : "Şifre Güncelleme"}
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {this.state.updateNeighbourhood && (
            <Container
              style={{
                backgroundColor: "white",
                boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                width: "90%",
                borderRadius: "5px",
                height: "200px",
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
              </Form>
            </Container>
          )}
          {this.state.updateRole && (
            <Container
              style={{
                backgroundColor: "white",
                boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                width: "90%",
                borderRadius: "5px",
                height: "100px",
                padding: "30px 15px 30px 15px",
                marginTop: "50px"
              }}
            >
              <Form>
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
              </Form>
            </Container>
          )}
          {this.state.updatePassword && (
            <Container
              style={{
                backgroundColor: "white",
                boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                width: "50%",
                borderRadius: "5px",
                height: "270px",
                padding: "30px 15px 30px 15px",
                marginTop: "50px"
              }}
            >
              <Form>
                <Form.Input
                  label="Eski Şifreniz"
                  placeholder="Eski Şifreniz"
                  name="oldPassword"
                  value={this.state.oldPassword}
                  onChange={this.handlePasswordChange}
                />
                <Form.Input
                  label="Yeni Şifreniz"
                  placeholder="Yeni Şifreniz"
                  name="passwordOne"
                  value={this.state.passwordOne}
                  onChange={this.handlePasswordChange}
                />
                <Form.Input
                  label="Yeni Şifreniz Tekrar"
                  placeholder="Yeni Şifreniz Tekrar"
                  name="passwordTwo"
                  value={this.state.passwordTwo}
                  onChange={this.handlePasswordChange}
                  error={this.state.passerr ? true : false}
                />
              </Form>
            </Container>
          )}
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    cities: state.cities,
    towns: state.towns,
    districts: state.districts,
    neighbourhoods: state.neighbourhoods
  };
};

export default connect(
  mapStateToProps,
  {
    fetchCities,
    fetchTowns,
    fetchDistricts,
    fetchNeighbourhoods,
    fetchUserById,
    editUser,
    editNeighbourhood,
    fetchUser,
    editRole,
    editPassword
  }
)(ProfilePage);

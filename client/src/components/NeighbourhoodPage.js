import React from "react";
import { connect } from "react-redux";
import { Container, Card, Image, Grid, Segment } from "semantic-ui-react";
import { fetchNeighbourhood, fetchCities } from "../actions/dropdownActions";
import {
  fetchProject,
  fetchResume,
  fetchDescription
} from "../actions/boxActions";
import { fetchUser } from "../actions/userAction";
import Candidates from "./Canditates";
import GoogleMap from "./GoogleMap";
import Box from "./Box";

class NeighbourhoodPage extends React.Component {
  componentDidMount() {
    this.props.fetchNeighbourhood(this.props.match.params.id);
    this.props.fetchProject(this.props.match.params.neighbourhoodId);
    this.props.fetchResume(this.props.match.params.id);
    this.props.fetchDescription(this.props.match.params.neighbourhoodId);
    this.props.fetchUser(this.props.match.params.id);
    this.props.fetchCities();
  }

  render() {
    const selectedCity =
      this.props.cities.length > 0 && this.props.neighbourhoods.key
        ? this.props.cities[0].filter(
            city => city.id === this.props.neighbourhoods.key.cityId
          )
        : null;

    const newCenter =
      selectedCity !== null
        ? { lat: selectedCity[0].lat, lng: selectedCity[0].lon }
        : null;

    const markerCenter = this.props.neighbourhoods.key
      ? this.props.neighbourhoods.key.lat !== null
        ? {
            lat: this.props.neighbourhoods.key.lat,
            lng: this.props.neighbourhoods.key.lng
          }
        : null
      : null;

    const styleSegment = { fontSize: "16px", padding: "10px" };
    const styleSpan = { fontWeight: "bold" };
    const styleHeader = {
      backgroundColor: "white",
      boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      borderRadius: "5px",
      marginTop: "30px",
      marginBottom: "30px",
      paddingTop: "10px",
      paddingBottom: "10px",
      width: "100%",
      height: "70px",
      border: "1px solid lightgrey",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: "2em"
    };

    const admin =
      this.props.currentUser.key &&
      this.props.currentUser.key.filter(user => user.role === "Muhtar");

    const adminInfo =
      admin && admin.length !== 0
        ? {
            firstName: admin[0].firstName,
            lastName: admin[0].lastName,
            email: admin[0].email,
            phoneNo: admin[0].phoneNo,
            occupation: admin[0].occupation,
            adress: admin[0].adress,
            adminId: admin[0].id,
            adminRole: admin[0].role
          }
        : null;

    return (
      <div>
        <Container
          style={{
            backgroundColor: "white",
            boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            borderRadius: "5px",
            marginTop: "30px",
            marginBottom: "55px",
            padding: "0px",
            width: "100%",
            height: "450px",
            border: "1px solid lightgrey"
          }}
        >
          <GoogleMap
            height="450px"
            blur="0px"
            zoom={
              this.props.neighbourhoods.key
                ? this.props.neighbourhoods.key.lat !== null
                  ? "17"
                  : "11"
                : "11"
            }
            center={markerCenter !== null ? markerCenter : newCenter}
            neighbourhoodName={this.props.match.params.name}
          />
        </Container>

        <Container style={styleHeader}>Mahalle Muhtarı</Container>
        <Container
          style={{
            paddingLeft: "9px",
            paddingRight: "0px",
            width: "100%"
          }}
        >
          <Grid>
            <Grid.Row>
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
                    boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    borderRadius: "5px",
                    padding: "0px",
                    width: "100%",
                    height: "285px",
                    border: "1px solid lightgrey"
                  }}
                >
                  <Grid
                    columns="equal"
                    style={{
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      paddingLeft: "10px",
                      marginTop: "13px",
                      marginLeft: "13px"
                    }}
                  >
                    <Grid.Row style={{ padding: "6px 0px 6px 0px" }}>
                      <Grid.Column>
                        <Segment style={styleSegment}>
                          <span style={styleSpan}>Ad:</span>{" "}
                          <span>
                            {adminInfo !== null && adminInfo.firstName}
                          </span>
                        </Segment>
                      </Grid.Column>
                      <Grid.Column>
                        <Segment style={styleSegment}>
                          <span style={styleSpan}>Soyad:</span>{" "}
                          <span>
                            {adminInfo !== null && adminInfo.lastName}
                          </span>
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: "6px 0px 6px 0px" }}>
                      <Grid.Column>
                        <Segment style={styleSegment}>
                          <span style={styleSpan}>Meslek:</span>{" "}
                          <span>
                            {adminInfo !== null && adminInfo.occupation}
                          </span>
                        </Segment>
                      </Grid.Column>
                      <Grid.Column>
                        <Segment style={styleSegment}>
                          <span style={styleSpan}>Tel No:</span>{" "}
                          <span>{adminInfo !== null && adminInfo.phoneNo}</span>
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: "6px 0px 6px 0px" }}>
                      <Grid.Column>
                        <Segment style={styleSegment}>
                          <span style={styleSpan}>Email:</span>{" "}
                          <span>{adminInfo !== null && adminInfo.email}</span>
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: "6px 0px 6px 0px" }}>
                      <Grid.Column>
                        <Segment style={styleSegment}>
                          <span style={styleSpan}>Adres:</span>{" "}
                          <span>{adminInfo !== null && adminInfo.adress}</span>
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <Box
          boxType="Description"
          userId={adminInfo !== null && adminInfo.adminId}
          text="Mahalle Tanıtımı"
          id={this.props.match.params.id}
          role={adminInfo !== null && adminInfo.adminRole}
        />
        <Box
          boxType="Resume"
          userId={adminInfo !== null && adminInfo.adminId}
          text="Özgeçmiş"
          id={this.props.match.params.id}
          role={adminInfo !== null && adminInfo.adminRole}
        />
        <Box
          boxType="Project"
          userId={adminInfo !== null && adminInfo.adminId}
          text="Projeler"
          id={this.props.match.params.id}
          role={adminInfo !== null && adminInfo.adminRole}
        />
        <Container style={styleHeader}>Muhtar Adayları</Container>
        <Candidates
          id={this.props.match.params.id}
          userId={adminInfo !== null && adminInfo.adminId}
          role={adminInfo !== null && adminInfo.adminRole}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cities: state.cities,
    towns: state.towns,
    districts: state.districts,
    neighbourhoods: state.neighbourhoods,
    users: state.users,
    currentUser: state.currentUser,
    projects: state.project,
    resumes: state.resume,
    description: state.description,
    image: state.image
  };
};

export default connect(mapStateToProps, {
  fetchNeighbourhood,
  fetchUser,
  fetchCities,
  fetchProject,
  fetchResume,
  fetchDescription
})(NeighbourhoodPage);

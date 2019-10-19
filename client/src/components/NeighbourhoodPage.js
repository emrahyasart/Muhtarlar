import React from "react";
import { connect } from "react-redux";
import { Container, Card, Image, Grid, Segment } from "semantic-ui-react";
import { fetchNeighbourhood } from "../actions/neighbourhoodsAction";
import { fetchUser } from "../actions/userAction";

class NeighbourhoodPage extends React.Component {
  state = {
    editContent: false,
    body: "",
    id: ""
  };
  componentDidMount() {
    this.props.fetchNeighbourhood(this.props.match.params.id);
    this.props.fetchUser(this.props.match.params.id);
  }
  render() {
    const admin =
      this.props.currentUser.key &&
      this.props.currentUser.key.filter(
        currentAdmin => (currentAdmin.role = "Muhtar")
      );

    const styleSegment = { fontSize: "16px", padding: "10px" };
    const styleSpan = { fontWeight: "bold" };
    console.log(admin);
    console.log(this.props);
    return (
      <div>
        <Container
          style={{
            backgroundColor: "white",
            boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            borderRadius: "5px",
            marginTop: "30px",
            marginBottom: "30px",
            padding: "0px",
            width: "100%",
            height: "300px",
            border: "1px solid lightgrey"
          }}
        />
        <Container
          style={{
            paddingLeft: "9px",
            paddingRight: "0px",
            width: "100%"
          }}
        >
          <Grid>
            <Grid.Row>
              <Grid.Column width={5}>
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

              <Grid.Column width={11} style={{ paddingRight: "0px" }}>
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
                          <span>{admin && admin[0].firstName}</span>
                        </Segment>
                      </Grid.Column>
                      <Grid.Column>
                        <Segment style={styleSegment}>
                          <span style={styleSpan}>Soyad:</span>{" "}
                          <span>{admin && admin[0].lastName}</span>
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: "6px 0px 6px 0px" }}>
                      <Grid.Column>
                        <Segment style={styleSegment}>
                          <span style={styleSpan}>Meslek:</span>{" "}
                          <span>{admin && admin[0].occupation}</span>
                        </Segment>
                      </Grid.Column>
                      <Grid.Column>
                        <Segment style={styleSegment}>
                          <span style={styleSpan}>Tel No:</span>{" "}
                          <span>{admin && admin[0].phoneNo}</span>
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: "6px 0px 6px 0px" }}>
                      <Grid.Column>
                        <Segment style={styleSegment}>
                          <span style={styleSpan}>Email:</span>{" "}
                          <span>{admin && admin[0].email}</span>
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row style={{ padding: "6px 0px 6px 0px" }}>
                      <Grid.Column>
                        <Segment style={styleSegment}>
                          <span style={styleSpan}>Adres:</span>{" "}
                          <span>{admin && admin[0].adress}</span>
                        </Segment>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
        <Container
          style={{
            backgroundColor: "white",
            boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            borderRadius: "5px",

            margin: "30px 0px 30px 0px",
            padding: "0px",
            width: "100%",
            height: "300px",
            border: "1px solid lightgrey"
          }}
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
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  { fetchNeighbourhood, fetchUser }
)(NeighbourhoodPage);

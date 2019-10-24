import React from "react";
import { connect } from "react-redux";
import { Container, Card, Image, Grid, Segment } from "semantic-ui-react";
import { fetchUser } from "../actions/userAction";
import ContentEditable from "./ContentEditable";
import Projects from "./Projects";

class CandidatePage extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.match.params.neighbourhoodId);
  }
  render() {
    const admin =
      this.props.currentUser.key &&
      this.props.currentUser.key.filter(
        user => user.id === parseInt(this.props.match.params.id)
      );
    admin && console.log(admin[0]);

    const styleSegment = { fontSize: "16px", padding: "10px" };
    const styleSpan = { fontWeight: "bold" };
    console.log(this.props);
    return (
      admin !== false &&
      admin !== [] && (
        <div>
          <Container
            style={{
              marginTop: "50px",
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
          <ContentEditable
            id={this.props.match.params.neighbourhoodId}
            text="Özgeçmiş"
            type="Resume"
          />
          <Projects
            id={this.props.match.params.neighbourhoodId}
            text="Projeler"
            userId={admin && admin[0].id}
            role={admin && admin[0].role}
          />
        </div>
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(
  mapStateToProps,
  {
    fetchUser
  }
)(CandidatePage);

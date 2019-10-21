import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Card,
  Image,
  Grid,
  Segment,
  Button
} from "semantic-ui-react";
import { fetchNeighbourhood } from "../actions/neighbourhoodsAction";
import { fetchUser } from "../actions/userAction";
import { addResume, fetchResume, editResume } from "../actions/resumeAction";

import {
  addDescription,
  fetchDescription,
  editDescription
} from "../actions/descriptionAction";

class NeighbourhoodPage extends React.Component {
  state = {
    editResumeContent: false,
    addResumeContent: false,
    editDescriptionContent: false,
    addDescriptionContent: false,
    descriptionBody: "",
    body: "",
    id: ""
  };
  componentDidMount() {
    this.props.fetchNeighbourhood(this.props.match.params.id);
    this.props.fetchUser(this.props.match.params.id).then(() => {
      // console.log(this.props.currentUser.key);
    });
    this.props.fetchResume(this.props.match.params.id);
    this.props.fetchDescription(this.props.match.params.id);
  }

  onResumeChange = e => {
    this.setState({
      body: e.target.value
    });
  };

  onDescriptionChange = e => {
    this.setState({
      descriptionBody: e.target.value
    });
  };

  changeEditResumeState = () => {
    this.setState({ editResumeContent: true });
  };

  changeAddResumeState = () => {
    this.setState({ addResumeContent: true });
  };

  changeEditDescriptionState = () => {
    this.setState({ editDescriptionContent: true });
  };

  changeAddDescriptionState = () => {
    this.setState({ addDescriptionContent: true });
  };

  onResumeAdd = () => {
    this.setState({ addResumeContent: false });
    const resume = {
      body: this.state.body,
      neighbourhoodId: this.props.match.params.id
    };

    this.props.addResume(resume);
  };

  onResumeEdit = () => {
    this.setState({ editResumeContent: false });
    const neighbourhoodId = this.props.match.params.id;
    const resume = {
      body: this.state.body,
      neighbourhoodId: this.props.match.params.id
    };

    this.props.editResume(neighbourhoodId, resume);
  };

  onDescriptionAdd = () => {
    this.setState({ addDescriptionContent: false });
    const description = {
      body: this.state.descriptionBody,
      neighbourhoodId: this.props.match.params.id
    };

    this.props.addDescription(description);
  };

  onDescriptionEdit = () => {
    this.setState({ editDescriptionContent: false });
    const neighbourhoodId = this.props.match.params.id;
    const description = {
      body: this.state.descriptionBody,
      neighbourhoodId: this.props.match.params.id
    };

    this.props.editDescription(neighbourhoodId, description);
  };
  render() {
    this.props.currentUser.key && console.log(this.props.currentUser.key.role);
    const admin = this.props.currentUser.key
      ? this.props.currentUser.key[0]
      : false;

    const styleSegment = { fontSize: "16px", padding: "10px" };
    const styleSpan = { fontWeight: "bold" };

    const status =
      this.props.resumes.key &&
      this.props.resumes.key.length === 0 &&
      !this.state.addResumeContent
        ? true
        : false;

    const isBodyExists =
      this.props.resumes.key && this.props.resumes.key.body === ""
        ? false
        : true;

    const statusDescription =
      this.props.descriptions.key &&
      this.props.descriptions.key.length === 0 &&
      !this.state.addDescriptionContent
        ? true
        : false;

    const isDescriptionBodyExists =
      this.props.descriptions.key && this.props.descriptions.key.body === ""
        ? false
        : true;
    console.log(this.props);
    return (
      admin !== false &&
      admin !== [] && (
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
              backgroundColor: "white",
              boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              borderRadius: "5px",
              margin: "30px 0px 30px 0px",
              padding: "0px",
              width: "100%",
              height: "340px",
              border: "1px solid lightgrey"
            }}
          >
            <Grid
              style={{ width: "95%", marginLeft: "30px", paddingTop: "10px" }}
            >
              <Grid.Row>
                <Segment style={{ fontWeight: "bold" }}>
                  Mahalle Tanıtımı
                </Segment>
                {!this.state.editDescriptionContent &&
                !this.state.addDescriptionContent ? (
                  <Segment
                    style={{
                      width: "100%",
                      height: "200px",
                      marginTop: "-5px"
                    }}
                  >
                    {this.props.descriptions.key
                      ? this.props.descriptions.key.body
                      : null}
                  </Segment>
                ) : (
                  <Segment
                    style={{
                      width: "100%",
                      height: "200px",
                      marginTop: "-5px"
                    }}
                  >
                    <textarea
                      style={{
                        width: "100%",
                        height: "180px",
                        marginTop: "-5px",
                        borderColor: "white"
                      }}
                      contentEditable={this.state.editDescriptionContent}
                      suppressContentEditableWarning={true}
                      onChange={this.onDescriptionChange}
                    >
                      {this.props.descriptions.key.body}
                    </textarea>
                  </Segment>
                )}
                {localStorage.neighbourhoodId === this.props.match.params.id &&
                localStorage.role === "Muhtar" ? (
                  <Grid style={{ width: "100%", marginLeft: "35px" }}>
                    <Grid.Row>
                      <Grid.Column floated="left" width={14} />
                      <Grid.Column
                        floated="right"
                        width={2}
                        style={{ padding: "0px" }}
                      >
                        <Button
                          color="teal"
                          floated="right"
                          onClick={
                            statusDescription
                              ? this.changeAddDescriptionState
                              : this.state.addDescriptionContent
                              ? this.onDescriptionAdd
                              : this.state.editDescriptionContent
                              ? this.onDescriptionEdit
                              : this.changeEditDescriptionState
                          }
                        >
                          {statusDescription || !isDescriptionBodyExists
                            ? "Ekle"
                            : this.state.editDescriptionContent ||
                              this.state.addDescriptionContent
                            ? "Kaydet"
                            : "Düzenle"}
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                ) : null}
              </Grid.Row>
            </Grid>
          </Container>
          <Container
            style={{
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
            }}
          >
            Mahalle Muhtarı
          </Container>
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
                            <span>{admin && admin.firstName}</span>
                          </Segment>
                        </Grid.Column>
                        <Grid.Column>
                          <Segment style={styleSegment}>
                            <span style={styleSpan}>Soyad:</span>{" "}
                            <span>{admin && admin.lastName}</span>
                          </Segment>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row style={{ padding: "6px 0px 6px 0px" }}>
                        <Grid.Column>
                          <Segment style={styleSegment}>
                            <span style={styleSpan}>Meslek:</span>{" "}
                            <span>{admin && admin.occupation}</span>
                          </Segment>
                        </Grid.Column>
                        <Grid.Column>
                          <Segment style={styleSegment}>
                            <span style={styleSpan}>Tel No:</span>{" "}
                            <span>{admin && admin.phoneNo}</span>
                          </Segment>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row style={{ padding: "6px 0px 6px 0px" }}>
                        <Grid.Column>
                          <Segment style={styleSegment}>
                            <span style={styleSpan}>Email:</span>{" "}
                            <span>{admin && admin.email}</span>
                          </Segment>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row style={{ padding: "6px 0px 6px 0px" }}>
                        <Grid.Column>
                          <Segment style={styleSegment}>
                            <span style={styleSpan}>Adres:</span>{" "}
                            <span>{admin && admin.adress}</span>
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
              height: "340px",
              border: "1px solid lightgrey"
            }}
          >
            <Grid
              style={{ width: "95%", marginLeft: "30px", paddingTop: "10px" }}
            >
              <Grid.Row>
                <Segment style={{ fontWeight: "bold" }}>Özgeçmiş</Segment>
                {!this.state.editResumeContent &&
                !this.state.addResumeContent ? (
                  <Segment
                    style={{
                      width: "100%",
                      height: "200px",
                      marginTop: "-5px"
                    }}
                  >
                    {this.props.resumes.key
                      ? this.props.resumes.key.body
                      : null}
                  </Segment>
                ) : (
                  <Segment
                    style={{
                      width: "100%",
                      height: "200px",
                      marginTop: "-5px"
                    }}
                  >
                    <textarea
                      style={{
                        width: "100%",
                        height: "180px",
                        marginTop: "-5px",
                        borderColor: "white"
                      }}
                      contentEditable={this.state.editResumeContent}
                      suppressContentEditableWarning={true}
                      onChange={this.onResumeChange}
                    >
                      {this.props.resumes.key.body}
                    </textarea>
                  </Segment>
                )}
                {localStorage.neighbourhoodId === this.props.match.params.id &&
                localStorage.role === "Muhtar" ? (
                  <Grid style={{ width: "100%", marginLeft: "35px" }}>
                    <Grid.Row>
                      <Grid.Column floated="left" width={14} />
                      <Grid.Column
                        floated="right"
                        width={2}
                        style={{ padding: "0px" }}
                      >
                        <Button
                          color="teal"
                          floated="right"
                          onClick={
                            status
                              ? this.changeAddResumeState
                              : this.state.addResumeContent
                              ? this.onResumeAdd
                              : this.state.editResumeContent
                              ? this.onResumeEdit
                              : this.changeEditResumeState
                          }
                        >
                          {status || !isBodyExists
                            ? "Ekle"
                            : this.state.editResumeContent ||
                              this.state.addResumeContent
                            ? "Kaydet"
                            : "Düzenle"}
                        </Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                ) : null}
              </Grid.Row>
            </Grid>
          </Container>
        </div>
      )
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
    resumes: state.resume,
    descriptions: state.description
  };
};

export default connect(
  mapStateToProps,
  {
    fetchNeighbourhood,
    fetchUser,
    addResume,
    fetchResume,
    editResume,
    addDescription,
    fetchDescription,
    editDescription
  }
)(NeighbourhoodPage);

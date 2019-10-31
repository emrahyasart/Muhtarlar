import React from "react";
import { connect } from "react-redux";
import { Container, Grid, Segment, Button } from "semantic-ui-react";
import { addResume, fetchResume, editResume } from "../actions/resumeAction";
import {
  addDescription,
  fetchDescription,
  editDescription
} from "../actions/descriptionAction";

class ContentEditable extends React.Component {
  state = {
    editResumeContent: false,
    addResumeContent: false,
    editDescriptionContent: false,
    addDescriptionContent: false,
    descriptionBody: "",
    body: ""
  };

  componentDidMount() {
    this.props.fetchResume(this.props.userId);
    this.props.fetchDescription(this.props.id);
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
      neighbourhoodId: this.props.id,
      userId: this.props.userId
    };
    this.props.addResume(resume);
  };

  onResumeEdit = () => {
    this.setState({ editResumeContent: false });
    const userId = this.props.userId;
    const resume = {
      body: this.state.body,
      neighbourhoodId: this.props.id,
      userId: this.props.userId
    };
    this.props.editResume(userId, resume);
  };

  onDescriptionAdd = () => {
    this.setState({ addDescriptionContent: false });
    const description = {
      body: this.state.descriptionBody,
      neighbourhoodId: this.props.id
    };
    this.props.addDescription(description);
  };

  onDescriptionEdit = () => {
    this.setState({ editDescriptionContent: false });
    const neighbourhoodId = this.props.id;
    const description = {
      body: this.state.descriptionBody,
      neighbourhoodId: this.props.id
    };
    this.props.editDescription(neighbourhoodId, description);
  };

  render() {
    const styleSegment = {
      width: "100%",
      height: "200px",
      marginTop: "-5px"
    };

    const styleTextarea = {
      width: "100%",
      height: "180px",
      marginTop: "-5px",
      borderColor: "white"
    };

    const selectedResumeBody = this.props.resumes.key
      ? this.props.resumes.key.filter(
          resume => (resume.userId = this.props.userId)
        )
      : "";

    const status =
      this.props.resumes.key &&
      selectedResumeBody === "" &&
      !this.state.addResumeContent
        ? true
        : false;

    const isBodyExists =
      (this.props.resumes.key && selectedResumeBody === "") ||
      (this.props.resumes.key &&
        (selectedResumeBody !== "" || selectedResumeBody[0].body === ""))
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

    const boxType = this.props.type;

    return (
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
        <Grid style={{ width: "95%", marginLeft: "30px", paddingTop: "10px" }}>
          <Grid.Row>
            <Segment style={{ fontWeight: "bold" }}>{this.props.text}</Segment>
            {boxType === "Description" ? (
              !this.state.editDescriptionContent &&
              !this.state.addDescriptionContent ? (
                <Segment style={styleSegment}>
                  {this.props.descriptions.key
                    ? this.props.descriptions.key.body
                    : null}
                </Segment>
              ) : (
                <Segment style={styleSegment}>
                  <textarea
                    style={styleTextarea}
                    contentEditable={this.state.editDescriptionContent}
                    suppressContentEditableWarning={true}
                    onChange={this.onDescriptionChange}
                  >
                    {this.props.descriptions.key.body}
                  </textarea>
                </Segment>
              )
            ) : !this.state.editResumeContent &&
              !this.state.addResumeContent ? (
              <Segment style={styleSegment}>
                {selectedResumeBody === ""
                  ? ""
                  : selectedResumeBody[0] && selectedResumeBody[0].body}
              </Segment>
            ) : (
              <Segment style={styleSegment}>
                <textarea
                  style={styleTextarea}
                  contentEditable={this.state.editResumeContent}
                  suppressContentEditableWarning={true}
                  onChange={this.onResumeChange}
                >
                  {selectedResumeBody === "" ? "" : selectedResumeBody[0].body}
                </textarea>
              </Segment>
            )}
            {localStorage.neighbourhoodId === this.props.id &&
            parseInt(localStorage.userId) === this.props.userId ? (
              <Grid style={{ width: "100%", marginLeft: "35px" }}>
                <Grid.Row>
                  <Grid.Column floated="left" width={14} />
                  <Grid.Column
                    floated="right"
                    width={2}
                    style={{ padding: "0px" }}
                  >
                    {boxType === "Description" ? (
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
                    ) : (
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
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            ) : null}
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    resumes: state.resume,
    descriptions: state.description
  };
};

export default connect(
  mapStateToProps,
  {
    addResume,
    fetchResume,
    editResume,
    addDescription,
    fetchDescription,
    editDescription
  }
)(ContentEditable);

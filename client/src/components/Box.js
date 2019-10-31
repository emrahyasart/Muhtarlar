import React from "react";
import { connect } from "react-redux";
import { Container, Grid, Segment, Button } from "semantic-ui-react";
import { addResume, fetchResume, editResume } from "../actions/resumeAction";
import {
  addDescription,
  fetchDescription,
  editDescription
} from "../actions/descriptionAction";
import {
  addProject,
  fetchProject,
  editProject
} from "../actions/projectAction";

class Box extends React.Component {
  state = {
    body: "",
    user: false,
    editContent: false,
    addContent: false,
    isText: false
  };

  componentDidMount() {
    this.props.fetchDescription(this.props.id);

    const boxType = this.props.boxType;

    const boxInfo =
      boxType === "Project"
        ? this.props.projects
        : boxType === "Description"
        ? this.props.descriptions
        : this.props.resumes;

    const content =
      this.props.id && this.props.userId && boxInfo.key
        ? true
          ? boxType !== "Description"
            ? boxInfo.key.filter(info => info.userId === this.props.userId)
            : boxInfo.key.filter(
                info => info.neighbourhoodId === parseInt(this.props.id)
              )
          : false
        : false;

    content !== false && this.setState({ isText: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.userId !== undefined && this.state.user === false) {
      this.setState({ user: true });
      this.props.fetchResume(this.props.userId);
      this.props.fetchProject(this.props.userId);
    }
  }

  onChange = e => {
    e.target.value === ""
      ? this.setState({
          body: e.target.value,
          isText: false
        })
      : this.setState({
          body: e.target.value,
          isText: true
        });
  };

  addStateChange = () => {
    this.setState({ addContent: true });
  };

  editStateChange = () => {
    this.setState({ editContent: true });
  };

  onAdd = () => {
    this.setState({ addContent: false });
    const data = {
      body: this.state.body,
      neighbourhoodId: parseInt(this.props.id),
      userId: this.props.userId,
      role: this.props.role
    };

    const boxType = this.props.boxType;
    switch (boxType) {
      case "Project":
        return this.props.addProject(data);
      case "Description":
        return this.props.addDescription(data);
      case "Resume":
        return this.props.addResume(data);
      default:
        return;
    }
  };

  onEdit = () => {
    this.setState({ editContent: false });
    const userId = this.props.userId;
    const neighbourhoodId = this.props.id;
    const data = {
      body: this.state.body,
      neighbourhoodId: parseInt(this.props.id),
      userId: this.props.userId,
      role: this.props.role
    };

    const boxType = this.props.boxType;
    switch (boxType) {
      case "Project":
        return this.props.editProject(userId, data);
      case "Description":
        return this.props.editDescription(neighbourhoodId, data);
      case "Resume":
        return this.props.editResume(userId, data);
      default:
        return;
    }
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

    const boxType = this.props.boxType;

    const boxInfo =
      boxType === "Project"
        ? this.props.projects
        : boxType === "Description"
        ? this.props.descriptions
        : this.props.resumes;

    const content =
      this.props.id && this.props.userId && boxInfo.key
        ? true
          ? boxType !== "Description"
            ? boxInfo.key.filter(info => info.userId === this.props.userId)
            : boxInfo.key.filter(
                info => info.neighbourhoodId === parseInt(this.props.id)
              )
          : false
        : false;

    const isTextExists =
      content === false
        ? false
        : content.length === 0
        ? false
        : content[0] && content[0].body === ""
        ? "emtpty text"
        : true;

    const text =
      content !== false
        ? content.length !== 0
          ? boxType === "Description"
            ? content.filter(
                currentText =>
                  currentText.neighbourhoodId === parseInt(this.props.id)
              )
            : content.filter(
                currentText => currentText.userId === this.props.userId
              )
          : false
        : false;

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
            {!this.state.editContent && !this.state.addContent ? (
              <Segment style={styleSegment}>{text[0] && text[0].body}</Segment>
            ) : (
              <Segment style={styleSegment}>
                <textarea
                  style={styleTextarea}
                  contentEditable={this.state.editContent}
                  suppressContentEditableWarning={true}
                  onChange={this.onChange}
                >
                  {text[0] ? text[0].body : ""}
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
                    {
                      <Button
                        color="teal"
                        floated="right"
                        onClick={
                          !this.state.isText && !isTextExists
                            ? this.addStateChange
                            : this.state.addContent
                            ? this.onAdd
                            : this.state.editContent
                            ? this.onEdit
                            : this.editStateChange
                        }
                      >
                        {(!this.state.isText && !isTextExists) ||
                        isTextExists === "emtpty text"
                          ? "Ekle"
                          : this.state.editContent || this.state.addContent
                          ? "Kaydet"
                          : "Düzenle"}
                      </Button>
                    }
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
    descriptions: state.description,
    projects: state.project
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
    editDescription,
    addProject,
    fetchProject,
    editProject
  }
)(Box);

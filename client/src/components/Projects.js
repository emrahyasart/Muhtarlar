import React from "react";
import { connect } from "react-redux";
import { Container, Grid, Segment, Button } from "semantic-ui-react";
import {
  addProject,
  fetchProject,
  editProject
} from "../actions/projectAction";

class Projects extends React.Component {
  state = {
    editProjectContent: false,
    addProjectContent: false,
    body: ""
  };

  componentDidMount() {
    this.props.fetchProject(this.props.id);
  }

  onProjectChange = e => {
    this.setState({
      body: e.target.value
    });
  };

  changeEditProjectState = () => {
    this.setState({ editProjectContent: true });
  };

  changeAddProjectState = () => {
    this.setState({ addProjectContent: true });
  };

  onProjectAdd = () => {
    this.setState({ addProjectContent: false });
    const project = {
      body: this.state.body,
      neighbourhoodId: parseInt(this.props.id),
      userId: this.props.userId,
      role: this.props.role
    };
    this.props.addProject(project);
  };

  onProjectEdit = () => {
    this.setState({ editProjectContent: false });
    const userId = this.props.userId;
    const project = {
      body: this.state.body,
      neighbourhoodId: parseInt(this.props.id),
      userId: this.props.userId,
      role: this.props.role
    };

    this.props.editProject(userId, project);
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

    // const status =
    //   this.props.projects.key &&
    //   this.props.projects.key.length === 0 &&
    //   !this.state.addProjectContent
    //     ? true
    //     : false;

    const projectAdmin =
      this.props.projects.key &&
      this.props.projects.key.filter(project => project.role === "Muhtar");

    const projectCandidates =
      this.props.projects.key &&
      this.props.projects.key.filter(
        project => project.role === "Muhtar Adayı"
      );

    const selectedProject = this.props.name
      ? projectAdmin
      : projectCandidates &&
        projectCandidates.filter(
          project => project.userId === this.props.userId
        );

    const isBodyExists =
      selectedProject && selectedProject.length === 0
        ? false
        : selectedProject &&
          selectedProject.length !== 0 &&
          selectedProject[0].body === ""
        ? false
        : true;

    const status =
      selectedProject &&
      selectedProject.length === 0 &&
      !this.state.addProjectContent
        ? true
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
            {!this.state.editProjectContent && !this.state.addProjectContent ? (
              <Segment style={styleSegment}>
                {this.props.projects.key
                  ? selectedProject.length !== 0 && selectedProject[0].body
                  : null}
              </Segment>
            ) : (
              <Segment style={styleSegment}>
                <textarea
                  style={styleTextarea}
                  contentEditable={this.state.editProjectContent}
                  suppressContentEditableWarning={true}
                  onChange={this.onProjectChange}
                >
                  {selectedProject.length !== 0
                    ? selectedProject[0].body
                    : null}
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
                          status
                            ? this.changeAddProjectState
                            : this.state.addProjectContent
                            ? this.onProjectAdd
                            : this.state.editProjectContent
                            ? this.onProjectEdit
                            : this.changeEditProjectState
                        }
                      >
                        {status || !isBodyExists
                          ? "Ekle"
                          : this.state.editProjectContent ||
                            this.state.addProjectContent
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
    projects: state.project
  };
};

export default connect(
  mapStateToProps,
  {
    addProject,
    fetchProject,
    editProject
  }
)(Projects);

import React from "react";
import { connect } from "react-redux";
import { Card, Image } from "semantic-ui-react";
import { fetchUser } from "../actions/userAction";

class Candidates extends React.Component {
  componentDidMount() {
    const neighbourhoodId = this.props.id;
    this.props.fetchUser(neighbourhoodId);
  }
  render() {
    const users =
      this.props.users.key &&
      this.props.users.key.filter(user => user.role === "Muhtar Adayı");

    return (
      <Card.Group itemsPerRow={4}>
        {users &&
          users.map(user => (
            <Card
              color="teal"
              key={user.id}
              href={`/benimsayfam/${user.neighbourhoodId}/${user.id}`}
            >
              <Image
                src={
                  user.image !== null
                    ? user.image
                    : "https://react.semantic-ui.com/images/wireframe/image.png"
                }
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Header>{`${user.firstName}  ${user.lastName}`}</Card.Header>
                <Card.Meta>{user.occupation}</Card.Meta>
                {/* <Card.Description>{user.occupation}</Card.Description> */}
              </Card.Content>
            </Card>
          ))}
      </Card.Group>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.currentUser
  };
};

export default connect(mapStateToProps, {
  fetchUser
})(Candidates);

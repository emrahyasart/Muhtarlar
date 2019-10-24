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
    console.log(users);
    return (
      <Card.Group itemsPerRow={4}>
        {users &&
          users.map(user => (
            <Card
              color="teal"
              key={user.id}
              href={`/${user.neighbourhoodId}/${user.id}`}
            >
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
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

export default connect(
  mapStateToProps,
  {
    fetchUser
  }
)(Candidates);

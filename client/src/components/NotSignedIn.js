import React from "react";
import { Container, Grid, Button } from "semantic-ui-react";

const NotSignedIn = () => {
  return (
    <Container
      style={{
        backgroundColor: "white",
        boxShadow: "0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        width: "40%",
        borderRadius: "5px",
        height: "150px",
        padding: "30px 15px 30px 15px",
        marginTop: "150px"
      }}
    >
      <Grid>
        <Grid.Row
          style={{ marginLeft: "140px", fontWeight: "bold", fontSize: "20px" }}
        >
          Lütfen Giriş Yapınız
        </Grid.Row>
        <Grid.Row>
          <Button color="teal" style={{ marginLeft: "190px" }} href="/girişyap">
            Giriş Sayfası
          </Button>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default NotSignedIn;

import React, { useState } from "react";
import { Menu, Button } from "semantic-ui-react";

import history from "../history";

const Navbar = props => {
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [color3, setColor3] = useState("");
  const [color4, setColor4] = useState("");
  const [color5, setColor5] = useState("");

  const signOutClick = () => {
    localStorage.clear();
    history.push("/");
  };

  const styleItem = { margin: "40px 0px 40px -15px", fontWeight: "bold" };

  return (
    <Menu
      fluid
      borderless
      style={{
        borderWidth: "0px",
        boxShadow: "0px 0px 0px 0px",
        height: "80px"
      }}
    >
      <Menu.Item
        name="MUHTARLAR"
        style={{
          color: "teal",
          margin: "30px 0px 40px 50px",
          fontWeight: "bold",
          fontSize: "20px"
        }}
        href="/"
      />
      {/* <Menu.Item
        style={{
          margin: "40px 0px 40px 300px",
          color: color1,
          fontWeight: "bold",
          fontSize: "13px"
        }}
        name="BUTTON1"
        onMouseOver={() => setColor1("teal")}
        onMouseLeave={() => setColor1("black")}
      />

      <Menu.Item style={styleItem} name="I" /> */}
      <Menu.Item
        style={{
          margin: "40px 0px 40px 500px",
          color: color1,
          fontWeight: "bold",
          fontSize: "13px"
        }}
        icon="user plus"
        onMouseOver={() => setColor5("teal")}
        onMouseLeave={() => setColor5("black")}
        href="/KayıtSayfası"
      />
      <Menu.Item style={styleItem} name="I" />
      <Menu.Item
        style={{
          margin: "40px 0px 40px -15px",
          fontWeight: "bold",
          color: color2,
          fontSize: "13px"
        }}
        name="Profilim"
        onMouseOver={() => setColor2("teal")}
        onMouseLeave={() => setColor2("black")}
      />
      <Menu.Item style={styleItem} name="I" />
      <Menu.Item
        style={{
          margin: "40px 0px 40px -15px",
          fontWeight: "bold",
          color: color3,
          fontSize: "13px"
        }}
        name="Benim Sayfam"
        onMouseOver={() => setColor3("teal")}
        onMouseLeave={() => setColor3("black")}
      />
      <Menu.Item style={styleItem} name="I" />

      <Menu.Item
        style={{
          margin: "40px 0px 40px -15px",
          fontWeight: "bold",
          color: color4,
          fontSize: "13px"
        }}
        onMouseOver={() => setColor4("teal")}
        onMouseLeave={() => setColor4("black")}
      >
        <Button
          style={{ width: "100%" }}
          color={localStorage.auth ? "red" : "teal"}
          href={localStorage.auth ? "/" : "/girişyap"}
          onClick={localStorage.auth ? signOutClick : null}
        >
          {localStorage.auth ? "ÇIKIŞ YAP" : "GİRİŞ YAP"}
        </Button>
      </Menu.Item>
      {localStorage.auth ? (
        <Menu.Item
          style={{
            margin: "40px 0px 40px -15px",
            fontWeight: "bold",
            color: color4,
            fontSize: "13px"
          }}
        >
          {" "}
          <Button
            style={{ width: "100%" }}
            color="teal"
            href={`/mahalle/${localStorage.neighbourhoodId}/${localStorage.neighbourhoodName}`}
          >
            Mahallem
          </Button>
        </Menu.Item>
      ) : null}
    </Menu>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Menu, Dropdown, Button } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { signOut } from "../actions/signinAction";
import history from "../history";

const Navbar = () => {
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [color3, setColor3] = useState("");
  const [color4, setColor4] = useState("");
  const [color5, setColor5] = useState("");
  const [status, setStatus] = useState("");

  const ui = useSelector(state => state);
  // console.log(ui);
  // console.log(localStorage);

  const signOutClick = () => {
    localStorage.clear();

    history.push("/");
  };

  const signInClick = () => {
    setStatus("true");
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
          margin: "30px 0px 40px 100px",
          fontWeight: "bold",
          fontSize: "20px"
        }}
        href="/"
      />
      <Menu.Item
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
      <Menu.Item style={styleItem} name="I" />
      <Menu.Item
        style={{
          margin: "40px 0px 40px -15px",
          fontWeight: "bold",
          color: color2,
          fontSize: "13px"
        }}
        name="BUTTON2"
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
        name="BUTTON3"
        onMouseOver={() => setColor3("teal")}
        onMouseLeave={() => setColor3("black")}
      />
      <Menu.Item style={styleItem} name="I" />
      <Menu.Item
        style={{
          margin: "40px 0px 40px -15px",
          color: color5
        }}
        icon="user plus"
        onMouseOver={() => setColor5("teal")}
        onMouseLeave={() => setColor5("black")}
        href="/kayıtol"
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

      {/* <Menu.Item style={styleItem} name="I" />
      <Menu.Menu
        style={{
          margin: "42px 0px 40px 0px",
          color: color6
        }}
        onMouseOver={() => setColor6("teal")}
        onMouseLeave={() => setColor6("black")}
      >
        <Dropdown icon="bars">
          <Dropdown.Menu>
            <Dropdown.Item>ITEM1</Dropdown.Item>
            <Dropdown.Item>ITEM2</Dropdown.Item>
            <Dropdown.Item>ITEM3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu> */}
    </Menu>
  );
};

export default Navbar;

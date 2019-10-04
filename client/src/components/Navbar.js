import React, { useState } from "react";
import { Menu, Dropdown } from "semantic-ui-react";

const Navbar = () => {
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [color3, setColor3] = useState("");
  const [color4, setColor4] = useState("");
  const [color5, setColor5] = useState("");
  const [color6, setColor6] = useState("");
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
          color: "green",
          margin: "30px 0px 40px 100px",
          fontWeight: "bold",
          fontSize: "20px"
        }}
      />
      <Menu.Item
        style={{
          margin: "40px 0px 40px 300px",
          color: color1,
          fontWeight: "bold",
          fontSize: "13px"
        }}
        name="BUTTON1"
        onMouseOver={() => setColor1("green")}
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
        color={color2}
        name="BUTTON2"
        onMouseOver={() => setColor2("green")}
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
        onMouseOver={() => setColor3("green")}
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
        name="BUTTON4"
        onMouseOver={() => setColor4("green")}
        onMouseLeave={() => setColor4("black")}
      />
      <Menu.Item style={styleItem} name="I" />
      <Menu.Item
        style={{
          margin: "40px 0px 40px -15px",
          color: color5
        }}
        icon="user plus"
        onMouseOver={() => setColor5("green")}
        onMouseLeave={() => setColor5("black")}
      />
      <Menu.Item style={styleItem} name="I" />
      <Menu.Menu
        style={{
          margin: "42px 0px 40px 0px",
          color: color6
        }}
        onMouseOver={() => setColor6("green")}
        onMouseLeave={() => setColor6("black")}
      >
        <Dropdown icon="bars">
          <Dropdown.Menu>
            <Dropdown.Item>ITEM1</Dropdown.Item>
            <Dropdown.Item>ITEM2</Dropdown.Item>
            <Dropdown.Item>ITEM3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;

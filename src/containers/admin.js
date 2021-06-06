import React, { useContext, useState } from "react";
import { Header } from "../components";
import logo from "../logo.svg";
import { FirebaseContext } from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { CreateFilm, TableFilm, ManageUsers } from "../components";
import { Menu, Button, Row, Col } from "antd";
import { MenuLeft } from "./styles"
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AppstoreAddOutlined,
  TableOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;

export function AdminContainer() {
  const [dpCreate, setDpCreate] = useState("dp-none")
  const [dpTable, setDpTable] = useState("dp-none")
  const [category, setCategory] = useState("films")
  // const mCreate = () => {
  //   setDpCreate("dp-block")
  //   setDpTable("dp-none")
  //   console.log(dpCreate);
  // }
  // const mFilms = () => {
  //   setDpCreate("dp-none")
  //   setDpTable("dp-block")
  //   setCategory("films")
  // }
  // const mSeries = () => {
  //   setDpCreate("dp-none")
  //   setDpTable("dp-block")
  //   setCategory("series")
  // }

  const onClickMenu = (key) => {
    if (key == "1") {
      setDpCreate("dp-block")
      setDpTable("dp-none")
      console.log(dpCreate);
    }
    if (key == "2") {
      setDpCreate("dp-none")
      setDpTable("dp-block")
      setCategory("series")
    }
    if (key == "3") {
      setDpCreate("dp-none")
      setDpTable("dp-block")
      setCategory("films")
    }
  }
  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Header src="" dontShowOnSmallViewPort>
        <Header.Frame>
          <Header.Group>
            <Header.Logo to={ROUTES.HOME} src={logo} alt="Netflix" />
          </Header.Group>
          <Header.Group>
            <Header.Profile>
              <Header.Picture src={user.photoURL} />
              <Header.Dropdown>
                <Header.Group>
                  <Header.Picture src={user.photoURL} />
                  <Header.TextLink>{user.displayName}</Header.TextLink>
                </Header.Group>
                <Header.Group>
                  <Header.TextLink onClick={() => firebase.auth().signOut()}>
                    Sign out
                  </Header.TextLink>
                </Header.Group>
              </Header.Dropdown>
            </Header.Profile>
          </Header.Group>
        </Header.Frame>
      </Header>
      <Row>
        <Col span={2}>
          <MenuLeft>
            <Button
              type="primary"
              onClick={() => toggleCollapsed()}
              style={{ marginBottom: 16 }}
            >
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
              )}
            </Button>
            <Menu
              // defaultSelectedKeys={["1"]}
              // defaultOpenKeys={["sub1"]}
              mode="inline"
              theme="dark"
              inlineCollapsed={collapsed}
              onSelect={(e) => onClickMenu(e.key)}
            >
              <Menu.Item key="1" icon={<AppstoreAddOutlined />}>
                Create
            </Menu.Item>
              <SubMenu key="sub1" icon={<TableOutlined />} title="Table">
                <Menu.Item key="2">Series</Menu.Item>
                <Menu.Item key="3">Films</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                icon={<AppstoreOutlined />}
                title="Navigation Two"
              >
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                  <Menu.Item key="11">Option 11</Menu.Item>
                  <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
              </SubMenu>
            </Menu>
          </MenuLeft>
        </Col>
        <Col span={18}>
          <CreateFilm displ={dpCreate}></CreateFilm>
          <TableFilm displ={dpTable} category={category}></TableFilm>
          <ManageUsers></ManageUsers>
        </Col>
      </Row>
    </>
  );
}

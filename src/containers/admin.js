import React, { useContext, useState } from "react";
import { ChartFilm, Header } from "../components";
import logo from "../logo.svg";
import { FirebaseContext } from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { CreateFilm, TableFilm, ManageUsers, RatingUser } from "../components";
import { Menu, Button, Row, Col } from "antd";
import { MenuLeft } from "./styles"
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AppstoreAddOutlined,
  TableOutlined,
  CommentOutlined,
  BarChartOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;

export function AdminContainer() {
  const [dpCreate, setDpCreate] = useState("dp-block")
  const [dpTable, setDpTable] = useState("dp-none")
  const [dpUser, setDpUser] = useState("dp-none")
  const [dpTableRating, setDpTableRating] = useState("dp-none")
  const [dpChart, setDpChart] = useState("dp-none")
  const [category, setCategory] = useState("films")

  const onClickMenu = (key) => {
    if (key == "1") {
      setDpCreate("dp-block")
      setDpTable("dp-none")
      setDpUser("dp-none")
      setDpTableRating("dp-none")
      setDpChart('dp-none')
    }
    if (key == "2") {
      setDpCreate("dp-none")
      setDpTable("dp-block")
      setDpUser("dp-none")
      setDpTableRating("dp-none")
      setCategory("series")
      setDpChart('dp-none')
    }
    if (key == "3") {
      setDpCreate("dp-none")
      setDpTable("dp-block")
      setDpUser("dp-none")
      setDpTableRating("dp-none")
      setCategory("films")
      setDpChart('dp-none')
    }
    if (key == "6") {
      setDpCreate("dp-none")
      setDpTable("dp-none")
      setDpUser("dp-none")
      setDpTableRating("dp-none")
      setCategory("films")
      setDpChart('dp-block')
    }
    if (key == "7") {
      setDpCreate("dp-none")
      setDpTable("dp-none")
      setDpUser("dp-none")
      setDpTableRating("dp-none")
      setCategory("series")
      setDpChart('dp-block')

    }
    if (key == "4") {
      setDpCreate("dp-none")
      setDpTable("dp-none")
      setDpTableRating("dp-none")
      setDpUser("dp-block")
      setDpChart('dp-none')
    }
    if (key == "5"){
      setDpCreate("dp-none")
      setDpTable("dp-none")
      setDpUser("dp-none")
      setDpTableRating("dp-block")
      setDpChart('dp-none')
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
                Create Films
            </Menu.Item>
              <SubMenu key="sub1" icon={<TableOutlined />} title="Table Films">
                <Menu.Item key="2">Series</Menu.Item>
                <Menu.Item key="3">Films</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<BarChartOutlined />} title="Chart">
                <Menu.Item key="6">Series</Menu.Item>
                <Menu.Item key="7">Films</Menu.Item>
              </SubMenu>
              <Menu.Item key="5" icon={<CommentOutlined />}>
                Rating User
            </Menu.Item>
              <Menu.Item key="4" icon={<AppstoreAddOutlined />}>
                User
            </Menu.Item>
            </Menu>
          </MenuLeft>
        </Col>
        <Col span={18}>
          <CreateFilm displ={dpCreate}></CreateFilm>
          <TableFilm className='tbl' displ={dpTable} category={category}></TableFilm>
          <ManageUsers displ={dpUser}></ManageUsers>
          <RatingUser displ={dpTableRating}></RatingUser>
          <ChartFilm className='tbl' displ={dpChart} category={category}></ChartFilm>
        </Col>
      </Row>
    </>
  );
}

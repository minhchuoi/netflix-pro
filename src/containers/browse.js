import React, { useState, useEffect, useContext } from "react";
import Fuse from "fuse.js";
import { Card, Header, Loading, Player, Rating, UserRating, MyRating } from "../components";
import * as ROUTES from "../constants/routes";
import logo from "../logo.svg";
import { FirebaseContext } from "../context/firebase";
import { SelectProfileContainer } from "./profiles";
import { FooterContainer } from "./footer";
import { Modal, Button } from 'antd'
import './stbrowse.css'
// import { useCmontent } from '../hooks';
import { selectionFilter } from '../utils';
// import { useDispatch, useSelector } from 'react-redux'
// import { addBrowse  } from '../pages/slice'



export function BrowseContainer({ slides, seriess, filmss }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const showModal2 = () => {
    setIsModalVisible2(true);
  };
  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [category, setCategory] = useState("series");
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [slideRows, setSlideRows] = useState([]);
  const [idVideo, setIdVideo] = useState({});
  const [item, setItem] = useState()

  const { firebase } = useContext(FirebaseContext);
  const user = firebase.auth().currentUser || {};
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [profile.displayName]);

  useEffect(async () => {
    setSlideRows(slides[category]);
    // console.log(slideRows);
  }, [slides, category]);

  // console.log(data.dataBrowse);
  useEffect(() => {
    if (category === 'series') {
      const fuse = new Fuse(seriess, {
        threshold: 0.3,
        keys: ["title", "description", "genre"],
      });
      const series = fuse.search(searchTerm).map(({ item }) => item);
      const slidess = selectionFilter({ series, filmss });
      if (slideRows.length > 0 && searchTerm.length > 1 && series.length > 0) {
        setSlideRows(slidess[category]);
      } else {
        setSlideRows(slides[category]);
      }
    }
    if (category === 'films') {
      const fuse = new Fuse(filmss, {
        threshold: 0.3,
        keys: ["title", "description", "genre"],
      });
      const films = fuse.search(searchTerm).map(({ item }) => item);
      const slidess = selectionFilter({ seriess, films });
      console.log(slidess);
      if (slideRows.length > 0 && searchTerm.length > 1 && films.length > 0) {
        setSlideRows(slidess[category]);
      } else {
        setSlideRows(slides[category]);
      }
    }


  }, [searchTerm]);

  // console.log(slideRows);
  return profile.displayName ? (
    <>
      {loading ? <Loading src={user.photoURL} /> : <Loading.ReleaseBody />}

      <Header src="joker1" dontShowOnSmallViewPort>
        <Header.Frame>
          <Header.Group>
            <Header.Logo to={ROUTES.HOME} src={logo} alt="Netflix" />
            <Header.TextLink
              active={category === "series" ? "true" : "false"}
              onClick={() => setCategory("series")}
            >
              Series
            </Header.TextLink>
            <Header.TextLink
              active={category === "films" ? "true" : "false"}
              onClick={() => setCategory("films")}
            >
              Films
            </Header.TextLink>
          </Header.Group>
          <Header.Group>
            <Header.Search
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
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
                <Header.Group>
                  <Header.TextLink onClick={showModal2}>
                    My rating
                  </Header.TextLink>
                </Header.Group>
              </Header.Dropdown>
            </Header.Profile>
          </Header.Group>
        </Header.Frame>
        <Header.Feature>
          <Header.FeatureCallOut>Watch Joker Now</Header.FeatureCallOut>
          <Header.Text>
            Forever alone in a crowd, failed comedian Arthur Fleck seeks
            connection as he walks the streets of Gotham City. Arthur wears two
            masks -- the one he paints for his day job as a clown, and the guise
            he projects in a futile attempt to feel like h is part of the world
            around him.
          </Header.Text>
          <Player>
            <Player.Button />
            <Player.Video src="WbliHNs4q14" />
          </Player>
        </Header.Feature>
      </Header>

      <Card.Group>
        {slideRows.map((slideItem) => (
          <Card key={`${category}-${slideItem.title.toLowerCase()}`}>
            <Card.Title>{slideItem.title}</Card.Title>
            <Card.Entities>
              {slideItem.data.map((item) => (
                <Card.Item key={item.docId} setItem={setItem} setIdVideo={setIdVideo} item={item}>
                  <Card.Image
                    src={`/images/${category}/${item.genre}/${item.slug}/small.jpg`}
                  />
                  <Card.Meta>
                    <Card.SubTitle>{item.title}</Card.SubTitle>
                    <Card.Text>{item.description}</Card.Text>
                    <Rating category={category} docId={item.docId}></Rating>
                  </Card.Meta>
                </Card.Item>
              ))}
            </Card.Entities>
            <Card.Feature category={category}>
              <Player>
                <Player.Button />
                <Player.Video src={idVideo} />
              </Player>
              <Button className='btn-user-rating' onClick={showModal}>User Rating</Button>
              <Modal width={1000} title="User Rating" visible={isModalVisible} onCancel={handleCancel} footer={null}>
                <UserRating item={item} userName={user.displayName}></UserRating>
              </Modal>
            </Card.Feature>
          </Card>
        ))}
      </Card.Group>
      <FooterContainer />
      <Modal width={1200} title="My Rating" visible={isModalVisible2} onCancel={handleCancel2} footer={null}>
        <MyRating userName={user.displayName}></MyRating>
      </Modal>
    </>
  ) : (
    <SelectProfileContainer user={user} setProfile={setProfile} />
  );
}

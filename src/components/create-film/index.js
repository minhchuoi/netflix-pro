import React, { useContext, useState } from "react";
import { Body } from "./styles/create-film";
import { Form, Button, Input, Select } from "antd";
import { FirebaseContext } from "../../context/firebase";
import { useDispatch } from 'react-redux'
import { addFilms, addSeries  } from '../../pages/slice'

const { Option } = Select;
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
  },
};

export default function CreateFilm(props) {
  const dispatch = useDispatch();

  const formRef = React.createRef();
  const [genre, setGenre] = useState([])
  const onGenderChange = (value) => {
    switch (value) {
      case 'series':
        setGenre(['documentaries', 'comedies', 'children', 'crime', 'feel-good',]);
        return;

      case 'films':
        setGenre(['drama', 'thriller', 'children', 'suspense', 'romance',]);
    }
  };

  const { firebase } = useContext(FirebaseContext);
  function getUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const piece = (Math.random() * 16) | 0;
      const elem = c === "x" ? piece : (piece & 0x3) | 0x8;
      return elem.toString(16);
    });
  }

  const getDataSlice = async () => {
    await firebase
      .firestore()
      .collection('series')
      .get()
      .then((snapshot) => {
        const allContent = snapshot.docs.map((contentObj) => ({
          ...contentObj.data(),
          docId: contentObj.id,
        }));
        dispatch(addSeries(allContent));
      })
      .catch((error) => {
        console.log(error.message);
      });
    await firebase
      .firestore()
      .collection('films')
      .get()
      .then((snapshot) => {
        const allContent = snapshot.docs.map((contentObj) => ({
          ...contentObj.data(),
          docId: contentObj.id,
        }));
        dispatch(addFilms(allContent))
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  const onFinish = async (value) => {
    // console.log({
    //   id: getUUID(),
    //   title: value.title,
    //   description: value.description,
    //   genre: value.genre,
    //   maturity: value.maturity,
    //   slug: value.title.toLowerCase().split(' ').join('-'),
    // });
    await firebase
      .firestore()
      .collection(value.category)
      .add({
        id: getUUID(),
        title: value.title,
        description: value.description,
        genre: value.genre,
        maturity: value.maturity,
        slug: value.title.toLowerCase().split(' ').join('-'),
        idVideo: value.video,
        rating: value.rating,
      })
      .catch((errors) => {
        console.log(errors);
      });
    getDataSlice();
    formRef.current.resetFields();

  };

  return (
    <Body>
      <div className={props.displ}>
        <Form {...layout} ref={formRef} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item
            name="category"
            label="Category"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              onChange={onGenderChange}
              allowClear
            >
              <Option value="films">Films</Option>
              <Option value="series">Series</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="genre"
            label="Genre"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              allowClear
            >
              {genre.map((item, index) => <Option key={index} value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            name='title'
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='description'
            label="Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="maturity"
            label="Maturity"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              onChange={onGenderChange}
              allowClear
            >
              <Option value="0">0</Option>
              <Option value="12">12</Option>
              <Option value="15">15</Option>
              <Option value="18">18</Option>

            </Select>
          </Form.Item>
          <Form.Item
            name='video'
            label="Video"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name='rating'
            label="Expert reviews"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Body>
  );
}

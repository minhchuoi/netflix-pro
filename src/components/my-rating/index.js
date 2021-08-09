import React, { useContext, useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Button, Modal, Input, Select, Form } from "antd";
import { Body } from "./styles/my-rating";
import { FirebaseContext } from "../../context/firebase";
import { useDispatch, useSelector } from 'react-redux'
import { addRatingAdmin } from '../../pages/slice'
import { StarTop } from '../../components'


const { Option } = Select;
const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 20,
  },
};

const validateMessages = {
  required: '${label} is required!',
};

export default function MyRating({ userName }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.home);

  const { firebase } = useContext(FirebaseContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getDataSlice = async () => {
    await firebase
      .firestore()
      .collection('rating')
      .get()
      .then((snapshot) => {
        const allContent = snapshot.docs.map((contentObj) => ({
          ...contentObj.data(),
          docId: contentObj.id,
        }));
        // console.log(allContent.filter((i) => i.filmName === item.film));
        dispatch(addRatingAdmin(allContent.filter((i) => i.user === userName)));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    getDataSlice();
  }, [])

  const [dataEdit, setDataEdit] = useState([]);
  const showModal = () => {
    setIsModalVisible(true);
    // formRef.current.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    // formRef.current.resetFields();
  };



  const deleteItem = async (value) => {
    await firebase
      .firestore()
      .collection('rating')
      .doc(value.docId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error.message);
      });
    getDataSlice();
  };
  const editItem = async (value) => {
    setDataEdit(value)
    showModal();
  };
  const formRef = React.createRef();

  const columns = [
    {
      title: "Film",
      dataIndex: "filmName",
      key: "filmName",
    },
    {
      title: "Rating",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      className: "action",
      title: "Action",
      key: "Action",
      render: function bcd(record) {
        return (
          <div>
            <Button
              className="btn-delete"
              onClick={() => deleteItem(record)}
              icon={<DeleteOutlined />}
            ></Button>
            <Button
              className=""
              onClick={() => editItem(record)}
              icon={<EditOutlined />}
            ></Button>
          </div>
        );
      },
    },
  ];
  const onFinish = async (values) => {
    console.log(
      dataEdit
    );
    await firebase.firestore().collection('rating').doc(dataEdit.docId)
      .set({
        user: dataEdit.user,
        film: dataEdit.docId,
        filmName: dataEdit.filmName,
        comment: values.comment,
        rate: values.rating
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    handleCancel()

    getDataSlice();
    formRef.current.resetFields();
  };


  return (
    <>
      <Body>
        <div>
          <Table
            justify="end"
            className="table"
            columns={columns}
            dataSource={data.dataRatingAdmin}
          ></Table>
        </div>
      </Body>
      <Modal
        width={1000}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form {...layout} ref={formRef} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item

            name="comment"
            label="Comment"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea className='inputComment' />
          </Form.Item>
          <Form.Item
            name="rating"
            label="Rating"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              className='inputComment'
            // allowClear
            >
              <Option value="1"><StarTop rating={1}></StarTop></Option>
              <Option value="2"><StarTop rating={2}></StarTop></Option>
              <Option value="3"><StarTop rating={3}></StarTop></Option>
              <Option value="4"><StarTop rating={4}></StarTop></Option>
              <Option value="5"><StarTop rating={5}></StarTop></Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 1 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getData, updateData, deleteData } from '../../pages/slice'
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Button, Modal, Input } from "antd";
import { Body } from "./styles/manage-users";
import { useFormik } from "formik";
import * as yup from "yup";

export default function ManageUsers(props) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.home);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [initialValues, setInitialValues] = useState({
    addEmail: "",
    addName: "",
  });
  const [dtUser, setDtUser] = useState([])

  const dataTable = async()=>{
    await dispatch(getData());
    setDtUser(data.data.filter((item) => item.email !== 'ngoductuanminh9b@gmail.com'))
  }

  useEffect(async() => {
    await dataTable()
  }, [dtUser])

  const deleteItem = async(value) => {
    await dispatch(deleteData(value.uid));
    dataTable()
    setTimeout(() => location.reload(), 3000);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const editItem = (value) => {
    console.log(value);
    setDataEdit(value);
    setInitialValues({
      addEmail: value.email,
      addName: value.displayName,
    });
    showModal();
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: yup.object().shape({
      addEmail: yup.string().required("Required"),
      addName: yup.string().required("Required"),
    }),
    onSubmit: async(value, { resetForm }) => {
      console.log(dataEdit);
      console.log({
        email: value.addEmail,
        displayName: value.addName
      });
      await dispatch(updateData({
        uid: dataEdit.uid,
        email: value.addEmail,
        displayName: value.addName
      }));
      formik.resetForm();
      setIsModalVisible(false);
      dataTable()
      // setTimeout(() => location.reload(), 1500);
    },
  });

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Display name",
      dataIndex: "displayName",
      key: "displayName",
    },
    {
      title: "Avatar",
      dataIndex: "photoURL",
      key: "photoURL",
      render: function avt(record) {
        return (
          <img className="imgAvt" alt={record.photoURL} src={`/images/users/${record}.png`} />
        )
      }
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
  return (
    <Body>
      <div className={props.displ}>
      <Table
        justify="end"
        className="table"
        columns={columns}
        dataSource={dtUser}
      ></Table>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <form className="edit-detail" onSubmit={formik.handleSubmit}>
          <label htmlFor="Email">Email</label>
          <Input
            className={
              formik.touched.addEmail && formik.errors.addEmail ? "input" : ""
            }
            id="addEmail"
            name="addEmail"
            onChange={formik.handleChange}
            value={formik.values.addEmail}
          ></Input>
          {formik.touched.addEmail && formik.errors.addEmail ? (
            <div>{formik.errors.addEmail}</div>
          ) : null}

          <label htmlFor="addName">Name</label>
          <Input
            className={
              formik.touched.addName && formik.errors.addName
                ? "input"
                : ""
            }
            id="addName"
            name="addName"
            onChange={formik.handleChange}
            value={formik.values.addName}
          ></Input>
          {formik.touched.addName && formik.errors.addName ? (
            <div>{formik.errors.addName}</div>
          ) : null}

          <Button id="btn-add" type="primary" htmlType="submit">
            Edit
          </Button>
        </form>
      </Modal>
      </div>
    </Body>
  );
}

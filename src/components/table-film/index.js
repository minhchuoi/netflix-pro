import React, { useContext, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Button, Modal, Input } from "antd";
import { Body } from "./styles/table-film";
import { FirebaseContext } from "../../context/firebase";
import { useContent } from "../../hooks";
import { useFormik } from "formik";
import * as yup from "yup";

export default function TableFilm(props) {
  const { series } = useContent("series");
  const { films } = useContent("films");
  const { firebase } = useContext(FirebaseContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [dataEdit, setDataEdit] = useState({});
  const [initialValues, setInitialValues] = useState({
    addTitle: "",
    addDescription: "",
    addGenre: "",
    addMaturity: "",
    addSlug: "",
  });
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: yup.object().shape({
      addTitle: yup.string().required("Required"),
      addDescription: yup.string().required("Required"),
      addGenre: yup.string().required("Required"),
      addMaturity: yup.string().required("Required"),
      addSlug: yup.string().required("Required"),
    }),
    onSubmit: (value, { resetForm }) => {
      firebase
        .firestore()
        .collection(props.category)
        .doc(dataEdit.docId)
        .set({
          id: dataEdit.id,
          title: value.addTitle,
          description: value.addDescription,
          genre: value.addGenre,
          maturity: value.addMaturity,
          slug: value.addSlug,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      formik.resetForm();
      setIsModalVisible(false);
      setTimeout(() => location.reload(), 3000);
    },
  });

  const deleteItem = (value) => {
    firebase
      .firestore()
      .collection("films")
      .doc(value.docId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error.message);
      });
    setTimeout(() => location.reload(), 3000);
  };
  const editItem = (value) => {
    console.log(value);
    setDataEdit(value);
    setInitialValues({
      addTitle: value.title,
      addDescription: value.description,
      addGenre: value.genre,
      addMaturity: value.maturity,
      addSlug: value.slug,
    });
    showModal();
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Maturity",
      dataIndex: "maturity",
      key: "maturity",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
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
    <>
      <Body>
        <div className={props.displ}>
          <Table
            justify="end"
            className="table"
            columns={columns}
            dataSource={props.category == "series" ? series : films}
          ></Table>
        </div>
      </Body>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <form className="edit-detail" onSubmit={formik.handleSubmit}>
          <label htmlFor="addTitle">Title</label>
          <Input
            className={
              formik.touched.addTitle && formik.errors.addTitle ? "input" : ""
            }
            id="addTitle"
            name="addTitle"
            onChange={formik.handleChange}
            value={formik.values.addTitle}
          ></Input>
          {formik.touched.addTitle && formik.errors.addTitle ? (
            <div>{formik.errors.addTitle}</div>
          ) : null}

          <label htmlFor="addDescription">Description</label>
          <Input.TextArea
            className={
              formik.touched.addDescription && formik.errors.addDescription
                ? "input"
                : ""
            }
            id="addDescription"
            name="addDescription"
            onChange={formik.handleChange}
            value={formik.values.addDescription}
          ></Input.TextArea>
          {formik.touched.addDescription && formik.errors.addDescription ? (
            <div>{formik.errors.addDescription}</div>
          ) : null}

          <label htmlFor="addGenre">Genre</label>
          <Input
            className={
              formik.touched.addGenre && formik.errors.addGenre ? "input" : ""
            }
            id="addGenre"
            name="addGenre"
            onChange={formik.handleChange}
            value={formik.values.addGenre}
          ></Input>
          {formik.touched.addGenre && formik.errors.addGenre ? (
            <div>{formik.errors.addGenre}</div>
          ) : null}

          <label htmlFor="addMaturity">Maturity</label>
          <Input
            className={
              formik.touched.addMaturity && formik.errors.addMaturity
                ? "input"
                : ""
            }
            id="addMaturity"
            name="addMaturity"
            onChange={formik.handleChange}
            value={formik.values.addMaturity}
          ></Input>
          {formik.touched.addMaturity && formik.errors.addMaturity ? (
            <div>{formik.errors.addMaturity}</div>
          ) : null}

          <label htmlFor="addSlug">City</label>
          <Input
            className={
              formik.touched.addSlug && formik.errors.addSlug ? "input" : ""
            }
            id="addSlug"
            name="addSlug"
            onChange={formik.handleChange}
            value={formik.values.addSlug}
          ></Input>
          {formik.touched.addSlug && formik.errors.addSlug ? (
            <div>{formik.errors.addSlug}</div>
          ) : null}

          <Button id="btn-add" type="primary" htmlType="submit">
            Edit
          </Button>
        </form>
      </Modal>
    </>
  );
}

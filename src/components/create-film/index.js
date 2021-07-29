import React, { useContext } from "react";
import { Body } from "./styles/create-film";
import * as yup from "yup";
import { Button, Input, Row } from "antd";
import { useFormik } from "formik";
import { FirebaseContext } from "../../context/firebase";

export default function CreateFilm(props) {
  const { firebase } = useContext(FirebaseContext);
  function getUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const piece = (Math.random() * 16) | 0;
      const elem = c === "x" ? piece : (piece & 0x3) | 0x8;
      return elem.toString(16);
    });
  }
  const initialValues = {
    addCategory: "",
    addTitle: "",
    addDescription: "",
    addGenre: "",
    addMaturity: "",
    addSlug: "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: yup.object().shape({
      addCategory: yup.string().required("Required"),
      addTitle: yup.string().required("Required"),
      addDescription: yup.string().required("Required"),
      addGenre: yup.string().required("Required"),
      addMaturity: yup.string().required("Required"),
      addSlug: yup.string().required("Required"),
    }),
    onSubmit: (value, { resetForm }) => {
      firebase
        .firestore()
        .collection(value.addCategory)
        .add({
          id: getUUID(),
          title: value.addTitle,
          description: value.addDescription,
          genre: value.addGenre,
          maturity: value.addMaturity,
          slug: value.addSlug,
        })
        .catch((errors) => {
          console.log(errors);
        });
      formik.resetForm();
    },
  });

  return (
    <Row>
      <Body>
        <div className={props.displ}>
          <form className="edit-detail" onSubmit={formik.handleSubmit}>
            <label htmlFor="addTitle">Category</label>
            <Input
              className={
                formik.touched.addCategory && formik.errors.addCategory
                  ? "input"
                  : ""
              }
              id="addCategory"
              name="addCategory"
              onChange={formik.handleChange}
              value={formik.values.addCategory}
            ></Input>
            {formik.touched.addCategory && formik.errors.addCategory ? (
              <div>{formik.errors.addCategory}</div>
            ) : null}

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
            <Input
              className={
                formik.touched.addDescription && formik.errors.addDescription
                  ? "input"
                  : ""
              }
              id="addDescription"
              name="addDescription"
              onChange={formik.handleChange}
              value={formik.values.addDescription}
            ></Input>
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
              Create
            </Button>
          </form>
        </div>
      </Body>
    </Row>
  );
}

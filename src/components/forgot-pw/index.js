import React, { useContext } from "react";
// import React from "react";
import { FirebaseContext } from "../../context/firebase";
import { Form, Input, Button } from 'antd';
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
export default function ForgotPW(props) {
  const formRef = React.createRef();
  const { firebase } = useContext(FirebaseContext);
  const onFinish = (values) => {
    console.log('Success:', values.email);
    firebase.auth().sendPasswordResetEmail(values.email)
      .then(() => {
        console.log('ok');
      })
      .catch((error) => {
        console.log(error.message);
      });
    props.setModal();
  };
  return (
    <Form {...layout} ref={formRef} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item
        name={['email']}
        label="Email"
        rules={[
          {
            required: true,
            type: 'email',
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
  );
}

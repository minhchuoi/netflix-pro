import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Form, Input, Button, Select} from "antd";
import { FirebaseContext } from "../../context/firebase";
import { useDispatch, useSelector } from 'react-redux';
import { addRatingModal } from '../../pages/slice';
import { StarTop } from '../../components'
import { Body } from "./styles/user-rating";

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

export default function UserRating({ item, userName }) {
  const formRef = React.createRef();
  // console.log(item);
  // console.log(userName);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.home);
  const { firebase } = useContext(FirebaseContext);
  const [star, setStar] = useState(0);
  const [dplModal, setDplModal] = useState('form-rating')
  const averageStar = (ar) => {
    var total = 0;
    for (var i = 0; i < ar.length; i++) {
      total += Number(ar[i].rate);
    }
    var avg = total / ar.length;
    return Math.round(avg);
  };
  const a = async (arr) => {
    console.log(arr);
    await setDplModal('form-rating')
    arr.filter((i) => i.film === item.docId).map((item)=>{
      if(item.user===userName){
        console.log('none');
        setDplModal('dpl-none')
      }
    })
  }
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
        setStar(averageStar(allContent.filter((i) => i.film === item.docId)))
        dispatch(addRatingModal(allContent.filter((i) => i.film === item.docId)));
        console.log('setdispl');
        a(allContent)
        // allContent.filter((i) => i.film === item.docId).map((item)=>{
        //   console.log('setdispl');
        //   if(item.user===userName){
        //     console.log('none');
        //     setDplModal('dpl-none')
        //   }else{
        //     console.log('block');
        //     setDplModal('form-rating')
        //   }
        // })
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  const onFinish = async(values) => {
    await firebase.firestore().collection("rating").add({
      user: userName,
      film: item.docId,
      filmName: item.title,
      comment: values.comment,
      rate: values.rating
    }).catch((errors) => {
      console.log(errors);
    });
    getDataSlice();
    formRef.current.resetFields();
  };

  useEffect(() => {
    getDataSlice();
  }, [item])

  return (
    <Body>
      <Col>
        <div className="name-film">
          <span >{item.title}</span>
        </div>
        <Row>
          <span className="viewer-rating" >{`Viewer's rating:`}</span>
          <StarTop className="stTop" rating={star}></StarTop>
        </Row>
      </Col>
      <div className='title-comment'>
        <span>Comment: </span>
      </div>
      {data.dataModel.map((item, index) => (
        <div key={index} className='comment'>
          <Col>
            <div className="userName">
              <span>{item.user}</span>
            </div>
            <div className="userComment">
              <span>{item.comment}</span>
            </div>
          </Col>
        </div>
      ))}
      <Form className={dplModal} {...layout} ref={formRef} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item
          name={['comment']}
          label="Comment"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.TextArea className='inputComment'/>
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
              // defaultValue="5"
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

    </Body>
  )
}

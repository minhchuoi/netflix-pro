import React, { useContext, useEffect } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Table, Button } from "antd";
import { Body } from "./styles/table-rating-user";
import { FirebaseContext } from "../../context/firebase";
import { useDispatch, useSelector } from 'react-redux'
import { addRatingAdmin  } from '../../pages/slice'

export default function RatingUser(props) {


  const dispatch = useDispatch();
  const data = useSelector((state) => state.home);

  const { firebase } = useContext(FirebaseContext);

  const getDataSlice = async()=>{
    await firebase
      .firestore()
      .collection('rating')
      .get()
      .then((snapshot) => {
        const allContent = snapshot.docs.map((contentObj) => ({
          ...contentObj.data(),
          docId: contentObj.id,
        }));
        dispatch(addRatingAdmin(allContent));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    getDataSlice();
  }, [])

  const deleteItem = async(value) => {
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
    // setTimeout(() => location.reload(), 3000);
  };
  
  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
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
            dataSource={data.dataRatingAdmin}
          ></Table>
        </div>
      </Body>
    </>
  );
}

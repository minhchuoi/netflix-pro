import React, { useContext, useState, useEffect } from "react";

import {Body} from './style.js/rating'
import { FirebaseContext } from "../../context/firebase";


export default function Rating({category, docId}) {
  const { firebase } = useContext(FirebaseContext);
  const [rating, setRating] = useState(1);
  // const [hover, setHover] = useState(0);
  useEffect(() => {
    firebase
      .firestore().collection(category).doc(docId).get().then((snapshot) => {
        // const allContent = snapshot.docs.map((contentObj) => ({
        //   ...contentObj.data(),
        //   docId: contentObj.id,
        // }));
        // console.log(snapshot.data());
        setRating(Number(snapshot.data().rating))
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [])
  // console.log(hover)
  return (
    <Body className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (rating) ? "on" : "off"}
            // onClick={() => setRating(index)}
            // onMouseEnter={() => setHover(index)}
            // onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </Body>
  );
}
// import "./styles.css";

// export default function App() {
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   console.log(rating)
//   console.log(hover)
//   return (
//     <div className="star-rating">
//       {[...Array(5)].map((star, index) => {
//         index += 1;
//         return (
//           <button
//             type="button"
//             key={index}
//             className={index <= (hover || rating) ? "on" : "off"}
//             onClick={() => setRating(index)}
//             onMouseEnter={() => setHover(index)}
//             onMouseLeave={() => setHover(rating)}
//           >
//             <span className="star">&#9733;</span>
//           </button>
//         );
//       })}
//     </div>
//   );
// }

import React from "react";

import {Body} from './style.js/star-top-in-modal'

export default function StarTop({rating}) {
  return (
    <Body className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (rating) ? "on" : "off"}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </Body>
  );
}

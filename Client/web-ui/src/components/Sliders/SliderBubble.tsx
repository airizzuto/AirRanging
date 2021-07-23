import React, {useState,useEffect} from "react";

import "./SliderBubble.scss";

/* 
  Code taken from:
    https://medium.com/@narendersaini32/how-to-create-range-slider-with-bubble-in-react-b99e33c00b57 
*/
// TODO: add bubble to slider

export default function SliderBubble() {
  const [value,onChange]=useState(1);
  
  useEffect(()=>{
    const ele = document.querySelector('.buble');

    if (ele) {
      ele.style.left = `${Number(value / 4)}px`;
    }
  });

  return (
    <div className="slider-parent">
      <input type="range" min="1" max="500" value={value}
        onChange={({ target: { value: radius } }) => {
          onChange(radius);
        }}
      />
      <div className="bubble"> 
        {value}
      </div>
    </div>
  );
}

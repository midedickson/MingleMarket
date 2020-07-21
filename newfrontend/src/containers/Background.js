import React from "react";
 
const BackgroundChanger = ({ children, color}) => (
    <div
        style={{
          backgroundColor: color
        }}
      >
    {
      children
    }
  </div>

)

export default BackgroundChanger;
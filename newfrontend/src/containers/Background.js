import React from "react";
 
// by default delay = 0 and duration = 0.2s
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
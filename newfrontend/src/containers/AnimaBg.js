import React from "react";
import AnimatedBg from "react-animated-bg";
 
// by default delay = 0 and duration = 0.2s
const AnimateBg = ({ children, color}) => (
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

export default AnimateBg;
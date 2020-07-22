import React from "react";
import Sky from "react-sky";

import balloon from "../assets/newballoon.png";
import cake from "../assets/newcake.png";
import hat from "../assets/newhat.png";
import mingle from "../assets/newminglelogo.png";

const images = {
  1: balloon,
  2: cake,
  3: hat,
  4: mingle,
};

const SkyConfetti = ({ start, type }) => {
  return (
    <div>
      {start && Object.keys(images).includes(String(type)) ? (
        <Sky
          images={{
            0: images[type],
          }}
          how={
            100
          } /* Pass the number of images Sky will render chosing randomly */
          time={5} /* time of animation */
          size={"100px"} /* size of the rendered images */
          background={"palettedvioletred"} /* color of background */
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default SkyConfetti;

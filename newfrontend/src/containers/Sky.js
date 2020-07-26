import React from "react";
import Sky from "react-sky";

import balloon1 from "../assets/b1.png";
import balloon2 from "../assets/b2.png";
import balloon3 from "../assets/b3.png";
import balloon4 from "../assets/b4.png";
import balloon5 from "../assets/b5.png";

import hat1 from "../assets/hat1.png";
import hat2 from "../assets/hat2.png";
import hat3 from "../assets/hat3.png";
import hat4 from "../assets/hat4.png";
import hat5 from "../assets/hat5.png";
import hat6 from "../assets/hat6.png";
import hat7 from "../assets/hat7.png";

import mingle from "../assets/newminglelogo.png";

import cake from '../assets/cake.png'


const ballons = {
  0: balloon1,
  1: balloon2,
  2: balloon3,
  3: balloon4,
  4: balloon5
}

const hats = {
  0: hat1,
  1: hat2,
  2: hat3,
  3: hat4,
  4: hat5,
  5: hat6,
  6: hat7,
}



const cakes = {
  0: cake
}

const mingleLogo = {
  0: mingle
}

const getImageByTypeId = (id) => {
  switch (id) {
    case 1:
      return ballons
    case 2:
      return hats
    case 3:
      return cakes
    case 4:
      return mingleLogo
    default:
      break;
  }
}

const SkyConfetti = ({ start, type }) => {
  console.log(getImageByTypeId(type))
  return (
    <div>
      {start && [1,2,3,4].includes(type) ? (
        <Sky
          images={getImageByTypeId(type)}
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

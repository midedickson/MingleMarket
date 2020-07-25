import React from 'react';
import Sky from 'react-sky';

import balloon1 from "../assets/balloon1.PNG"
import balloon2 from "../assets/balloon2.PNG"
import balloon3 from "../assets/balloon3.PNG"
import cake1 from "../assets/cake1.PNG"
import cake2 from "../assets/cake2.PNG"
import hat1 from "../assets/hat1.PNG"
import hat2 from "../assets/hat2.PNG"
import mingle from "../assets/hey_mingle.png"

const images = {
  1: balloon1,
  2: balloon2,
  3: balloon3,
  4: cake1,
  5: cake2,
  6: hat1,
  7: mingle,
}


const  SkyConfetti = ({start, type}) => {
    return (
      <div>
        {
        start && Object.keys(images).includes(String(type))  ? (
        <Sky
          images={{
            0: images[type],
          }}
          how={100} /* Pass the number of images Sky will render chosing randomly */
          time={5} /* time of animation */
          size={'100px'} /* size of the rendered images */
          background={'palettedvioletred'} /* color of background */
        /> ) : <></>
        }
      </div>
    );
}

export default SkyConfetti;
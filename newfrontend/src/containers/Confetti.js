import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const ConfettiAni = ({ start, type }) => {
  const { width, height } = useWindowSize();
  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={start && type === 0 ? 1110 : 0}
    />
  );
};

export default ConfettiAni;

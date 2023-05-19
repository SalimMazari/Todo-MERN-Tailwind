import React from "react";
import Confetti from "react-confetti";

const Confettis = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const colors = ["#4c1d95", "#ede9fe", "#ffffff", "#dc3545", "#f87060"];

  return (
    <Confetti
      width={width}
      height={height}
      colors={colors}
      numberOfPieces={300}
      //   recycle={false} //Keep spawning confetti after numberOfPieces pieces have been shown
      //   run={false} //Run the animation loop
    />
  );
};

export default Confettis;

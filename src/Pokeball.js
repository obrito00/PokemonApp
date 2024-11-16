import React from "react";
import pokeball from "./pokeball-1.png";

const Pokeball = ({ className }) => {
  return (
    <div
      className={`pokeball ${className}`}
      style={{
        backgroundImage: `url(${pokeball})`,
        backgroundPosition: "50% 50%",
        backgroundSize: "cover",
        height: "45px",
        width: "45px"
      }}
    />
  );
};

export default Pokeball;
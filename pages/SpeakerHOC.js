import React from "react";
import withData from "../src/components/withData";

const Speaker = ({ speakers }) => {
  return speakers.map((speaker) => (
    <img src={`images/${speaker.imageSrc}.jpg`} alt={speaker.name}></img>
  ));
};

export default withData(2)(Speaker);

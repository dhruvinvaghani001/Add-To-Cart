import React from "react";
import { ColorRing } from "react-loader-spinner";

const RingSpinner = () => {
  return (
    <ColorRing
      visible={true}
      height="100"
      width="100"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={["black"]}
    />
  );
};

export default RingSpinner;

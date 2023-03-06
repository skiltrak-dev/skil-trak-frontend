import React from "react";

export const Heading = ({ text }:any) => {
  return (
    <div
      className="heading-wrapper inline-block"
      data-sal-duration="1000"
      data-sal-easing="ease"
    >
      <h2 className="font-bold uppercase text-xl lg:text-4xl">{text}</h2>
      <span className="block bg-black w-2/4 h-1.5 mt-4"></span>
    </div>
  );
};

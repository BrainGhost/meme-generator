import React from "react";

function ImgHolder({ randomImage, topText, bottomText, contentContainerRef }) {
  return (
    <div
      ref={contentContainerRef}
      className=" relative flex w-11/12 md:w-2/3 mx-auto rounded-xl overflow-hidden"
    >
      <img className=" object-contain w-full " src={randomImage} alt="" />
      <div className="absolute flex flex-col  h-full w-full ">
        <div className=" flex-1  text-center flex flex-col justify-between py-5 md:py-10 text-white uppercase text-xl md:text-3xl font-body tracking-wide px-5">
          <p className="bg-sombe-1 stroke-2 fill-black">{topText}</p>
          <p className="bg-sombe-1">{bottomText}</p>
        </div>
      </div>
    </div>
  );
}

export default ImgHolder;

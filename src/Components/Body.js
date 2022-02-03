import { RefreshIcon, RewindIcon } from "@heroicons/react/solid";
import axios from "axios";
import domtoimage from "dom-to-image-more";
import FileSaver from "file-saver";
import React, { useEffect, useRef, useState } from "react";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import ImgHolder from "./ImgHolder";

function Body() {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [allMemeImg, setAllMemeImg] = useState([]);
  const [randomImage, setRandomImage] = useState("");
  const [resultImage, setResultImage] = useState("");
  //   const handleClick = (event) => ({ [event.target.name]: event.target.value });

  const [isMemeGenerated, setIsMemeGenerated] = useState(false);
  let resultContainerRef = useRef();
  let contentContainerRef = useRef();

  useEffect(() => {
    axios
      .get("https://api.imgflip.com/get_memes")
      .then((response) => {
        const { memes } = response.data.data;
        setAllMemeImg(memes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const random = () => {
    const getRandomInt = (min, max) => {
      let step1 = max - min + 1;
      let step2 = Math.random() * step1;
      let result = Math.floor(step2) + min;
      return result;
    };
    let ImageIndex = getRandomInt(0, allMemeImg.length - 1);
    const memes = allMemeImg;
    setRandomImage(memes[ImageIndex].url);
  };
  const handleMemeGeneration = () => {
    if (resultContainerRef.current.childNodes.length > 0) {
      resultContainerRef.current.remove(
        resultContainerRef.current.childNodes[0]
      );
    }
    domtoimage.toPng(contentContainerRef.current).then((dataUrl) => {
      // Create new image
      const img = new Image();

      // Use url of the generated image as src
      img.src = dataUrl;

      // // Append new image to DOM
      // resultContainerRef.current.appendChild(img);

      // Update state for isMemeGenerated
      img
        .decode()
        .then(() => {
          resultContainerRef.current.appendChild(img);
          setResultImage(img);
        })
        .catch(() => {
          resultContainerRef.current.appendChild(
            new Text("Could not load the nebula :(")
          );
        });
    });
    domtoimage.toBlob(contentContainerRef.current).then((dataUrl) => {
      FileSaver.saveAs(dataUrl, "meme.png");
      setIsMemeGenerated(true);
    });
    alert(
      "Your create meme has been generated and ready to get downloaded, You can now click on the Share button or reset to Reset"
    );
  };
  const reset = () => {
    // Remove existing child node inside result container (generated meme image)
    // resultContainerRef.current.removeChild(
    //   resultContainerRef.current.childNodes[0]
    // );

    // Update state for isMemeGenerated
    setIsMemeGenerated(false);

    setTopText("");
    setBottomText("");
  };

  return (
    <div className="container mt-2  flex flex-1 px-4 flex-col md:flex-row w-full">
      <div className="pt-5 w-full flex flex-col md:w-2/5">
        <div className="flex items-center">
          <label className="text-lg text-sombe-400 mr-5 w-20">Top</label>
          <input
            value={topText}
            className="w-full bg-transparent border border-sombe-1 outline-0 rounded-xl px-3 py-1"
            type="text"
            onChange={(e) => setTopText(e.target.value)}
          />
        </div>
        <div className="flex items-center mt-5">
          <label className="text-lg text-sombe-400 mr-5 w-20">Bottom</label>
          <input
            value={bottomText}
            className="w-full bg-transparent border border-sombe-1 outline-0 rounded-xl px-3 py-1"
            type="text"
            onChange={(e) => setBottomText(e.target.value)}
          />
        </div>
        {(topText || bottomText) && (
          <button
            //   onChange={handleClick}
            onClick={handleMemeGeneration}
            className="text-white self-end mt-5 bg-gradient-to-b from-sombe-400 to-sombe-300  border border-sombe-400 px-10 py-1 rounded-3xl"
          >
            Generate Meme
          </button>
        )}

        <div
          ref={resultContainerRef}
          className="w-full h-full bg-green-900"
        ></div>
      </div>
      <div className=" h-full py-5 md:w-3/5 ">
        <ImgHolder
          randomImage={randomImage}
          topText={topText}
          bottomText={bottomText}
          random={random}
          contentContainerRef={contentContainerRef}
        />
        <div className="  flex justify-between  mx-2 md:w-2/3 md:mx-auto  p-2 md:py-5">
          <div className=" grid items-center  text-white cursor-pointer p-2 bg-sombe-400 rounded-full shadow shadow-sombe-400 hover:shadow-2xl">
            <RefreshIcon
              onClick={random}
              className="h-5 w-5 md:h-7 md:w-7 mx-1 "
            />
          </div>
          <div className=" grid items-center  text-white cursor-pointer p-2 bg-sombe-400 rounded-full shadow shadow-sombe-400 hover:shadow-2xl">
            <RewindIcon
              onClick={reset}
              className="h-5 w-5 md:h-7 md:w-7 mx-1 "
            />
          </div>
          <WhatsappShareButton
            url={` "${resultImage.src}"`}
            separator=" "
            title="Your meme"
          >
            <div className="flex items-center text-white cursor-pointer p-2 bg-sombe-400 rounded-full shadow shadow-sombe-400 hover:shadow-2xl">
              {/* <ShareIcon className="h-5 w-5 md:h-7 md:w-7  mx-1" /> */}
              <h1>Share</h1>
              <WhatsappIcon
                round={true}
                className="h-6 w-6 md:h-8 md:w-8  mx-1"
              />
            </div>
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
}

export default Body;

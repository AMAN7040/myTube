import React from "react";
import ButtonBar from "./ButtonBar";
import VideoContainer from "./VideoContainer";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const isBarOpen = useSelector((store) => store.sidebar.isBarOpen);

  return (
    <div
      className={`flex flex-col mt-14 transition-all duration-300 bg-transparent ${
        isBarOpen
          ? "ml-[4.8rem] md:ml-[8rem] 2xl:ml-[15rem]"
          : "ml-[0rem] md:ml-[3rem] 2xl:ml-[6rem] "
      } h-[calc(100vh-3.5rem)] overflow-hidden`}
    >
      <ButtonBar />
      <div className="flex-grow overflow-y-auto">
        <VideoContainer />
      </div>
    </div>
  );
};

export default MainContainer;

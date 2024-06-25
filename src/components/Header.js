import {
  faBars,
  faBell,
  faSearch,
  faUser,
} from "@fortawesome/fontawesome-free-solid";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Header = () => {
  return (
    <div className="h-16 w-full grid grid-flow-col items-center bg-gray-100">
      <div className=" flex col-span-2">
        <FontAwesomeIcon
          icon={faBars}
          className="text-black mx-6 text-xl font-light m-4"
        />
        <h2 className="text-black font-medium text-xl flex items-center ">
          <FontAwesomeIcon
            className="h-10 ml-2 mr-1"
            icon={faYoutube}
            style={{ color: "#ff0000" }}
          />
          MyTube
        </h2>
      </div>
      <div className="flex  col-span-10 justify-center items-center">
        <input
          className="border border-black my-2 w-1/2 h-10 rounded-l-full"
          type="text"
        />
        <button className="border border-black my-2 px-3 h-10 text-center rounded-r-full">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="flex  col-span-2 items-center justify-evenly space-x-10 ">
        <FontAwesomeIcon icon={faBell} className="text-black text-xl" />
        <FontAwesomeIcon
          icon={faUser}
          className="text-black border border-black  text-lg m-3 p-1 rounded-full"
        />
      </div>
    </div>
  );
};

export default Header;

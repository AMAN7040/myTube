import {
  faBars,
  faBell,
  faSearch,
  faUser,
} from "@fortawesome/fontawesome-free-solid";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useDispatch } from "react-redux";
import { toggleBar } from "../utils/sidebarSlice";

const Header = () => {

  const dispatch = useDispatch();

  const handleSideBar = () => {
    dispatch(toggleBar());
  }

  return (
    <div className="h-16 w-full fixed top-0 grid grid-flow-col bg-transparent items-center  z-10">
      <div className="flex col-span-2">
        <FontAwesomeIcon
          icon={faBars}
          className="text-white mx-7 p-1 text-xl font-light my-4 cursor-pointer"
          onClick={()=> handleSideBar()}
        />
        <h2 className="text-white font-medium text-xl flex items-center ">
          <FontAwesomeIcon
            className="h-10 ml-2 mr-1 cursor-pointer"
            icon={faYoutube}
            style={{ color: "#ff0000" }}
          />
          MyTube
        </h2>
      </div>
      <div className="flex col-span-10 justify-center items-center">
        <input
          className="border border-gray-600 my-2 w-1/2 h-10 rounded-l-full bg-transparent text-white px-2"
          type="text"
        />
        <button className="border border-gray-600 my-2 px-3 h-10 text-center rounded-r-full cursor-pointer text-white bg-transparent">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="flex col-span-2 items-center justify-evenly space-x-10 w-full">
        <FontAwesomeIcon icon={faBell} className="text-xl cursor-pointer text-white" />
        <FontAwesomeIcon
          icon={faUser}
          className="text-white border border-gray-600  text-lg m-3 p-1 rounded-full cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;

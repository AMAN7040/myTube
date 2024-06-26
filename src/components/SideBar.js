import {
  faFilm,
  faGamepad,
  faGreaterThan,
  faNewspaper,
} from "@fortawesome/fontawesome-free-solid";
import {
  faHistory,
  faHomeAlt,
  faLayerGroup,
  faMusic,
  faPodcast,
  faRss,
  faShoppingBag,
  faSquareCheck,
  faThumbsUp,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";

const SideBar = () => {
  const isBarOpen = useSelector((store) => store.sidebar.isBarOpen);

  return !isBarOpen ? (
    <div className="bg-black opacity-90 py-10 w-28 h-screen top-0 mt-[4rem] left-0 fixed">
      <div className="list-none font-semibold cursor-pointer mb-7 text-white">
        <li className="text-xl px-7 w-1/4">
          <FontAwesomeIcon icon={faHomeAlt} className="text-white" />
        </li>
        <li className="text-[11px] w-3/4 px-6">Home</li>
      </div>
      <div className="list-none font-semibold cursor-pointer mb-7 text-white">
        <li className="text-xl px-7">
          <FontAwesomeIcon icon={faFilm} />
        </li>
        <li className="text-[11px] w-3/4 px-5">Shorts</li>
      </div>
      <div className="list-none font-semibold cursor-pointer mb-7 text-white">
        <li className="text-xl px-7">
          <FontAwesomeIcon icon={faSquareCheck} />
        </li>
        <li className="text-[11px] px-1">Subscriptions</li>
      </div>
      <div className="list-none font-semibold cursor-pointer text-white">
        <li className="text-xl px-7">
          <FontAwesomeIcon icon={faUser} />
        </li>
        <li className="text-[11px] w-3/4 px-7">You</li>
      </div>
    </div>
  ) : (
    <div className="bg-black opacity-90 py-10 w-64 h-screen top-0 mt-[4rem] left-0 fixed overflow-y-scroll">
      <div className="flex items-center mb-7 cursor-pointer text-white">
        <FontAwesomeIcon className="text-xl mx-3 w-1/4" icon={faHomeAlt} />
        <h4 className="font-medium pl-4 w-3/4">Home</h4>
      </div>
      <div className="flex items-center mb-7 cursor-pointer text-white">
        <FontAwesomeIcon className="text-xl mx-3 w-1/4" icon={faFilm} />
        <h4 className="font-medium pl-4 w-3/4">Shorts</h4>
      </div>
      <div className="flex items-center mb-7 cursor-pointer text-white">
        <FontAwesomeIcon className="text-xl mx-3 w-1/4" icon={faSquareCheck} />
        <h4 className="font-medium pl-4 w-3/4">Subscriptions</h4>
      </div>
      <hr className="border-t border-black mx-4 my-1 mb-7 text-white"></hr>
      <div className="flex items-center mb-6">
        <h3 className="text-black ml-7 font-medium text-xl">You</h3>
        <FontAwesomeIcon className="text-lg pl-6 " icon={faGreaterThan} />
      </div>
      <div>
        <div className="flex items-center mb-7 cursor-pointer text-white">
          <FontAwesomeIcon className="text-xl mx-3 w-1/4" icon={faHistory} />
          <h4 className="font-medium pl-4 w-3/4">History</h4>
        </div>
        <div className="flex items-center mb-7 cursor-pointer text-white">
          <FontAwesomeIcon className="text-xl mx-3 w-1/4" icon={faLayerGroup} />
          <h4 className="font-medium pl-4 w-3/4">Playlists</h4>
        </div>
        <div className="flex items-center mb-7 cursor-pointer text-white">
          <FontAwesomeIcon
            className="text-xl mx-3 w-1/4"
            icon={faSquareCheck}
          />
          <h4 className="font-medium pl-4 w-3/4 text-white">Watch Later</h4>
        </div>
        <div className="flex items-center mb-7 cursor-pointer text-white">
          <FontAwesomeIcon className="text-xl mx-3 w-1/4" icon={faThumbsUp} />
          <h4 className="font-medium pl-4 w-3/4">Liked Vidoes</h4>
        </div>
        <hr className="border-t border-white mx-4 my-1 mb-7"></hr>
        <h3 className="text-white ml-7 mb-7 font-medium text-xl">
          Subscriptions
        </h3>
      </div>
      <div>
        <div className="flex items-center mb-7 cursor-pointer text-white">
          <FontAwesomeIcon className="text-xl mx-3 w-1/4" icon={faHistory} />
          <h4 className="font-medium pl-4 w-3/4">History</h4>
        </div>
        <hr className="border-t border-white mx-4 my-1 mb-7"></hr>
        <h3 className="text-white ml-7 mb-7 font-medium text-xl">Explore</h3>
        <div>
          <div className="flex items-center mb-7 cursor-pointer text-white">
            <FontAwesomeIcon className="text-xl mx-3 w-1/4" icon={faMusic} />
            <h4 className="font-medium pl-4 w-3/4">Musiv</h4>
          </div>
          <div className="flex items-center mb-7 cursor-pointer text-white">
            <FontAwesomeIcon className="text-xl mx-3 w-1/4" icon={faFilm} />
            <h4 className="font-medium pl-4 w-3/4">Films</h4>
          </div>
          <div className="flex items-center mb-7 cursor-pointer text-white">
            <FontAwesomeIcon
              className="text-xl mx-3 w-1/4"
              icon={faShoppingBag}
            />
            <h4 className="font-medium pl-4 w-3/4">Shopping</h4>
          </div>
          <div className="flex items-center mb-7 cursor-pointer text-white">
            <FontAwesomeIcon className="text-xl mx-3 w-1/4" icon={faGamepad} />
            <h4 className="font-medium pl-4 w-3/4">Gaming</h4>
          </div>
          <div className="flex items-center mb-7 cursor-pointer text-white">
            <FontAwesomeIcon className="text-xl mx-3 w-1/4" icon={faRss} />
            <h4 className="font-medium pl-4 w-3/4">Live</h4>
          </div>
          <div className="flex items-center mb-7 cursor-pointer text-white">
            <FontAwesomeIcon
              className="text-xl mx-3 w-1/4"
              icon={faNewspaper}
            />
            <h4 className="font-medium pl-4 w-3/4 text-white">News</h4>
          </div>
          <div className="flex items-center mb-7 cursor-pointer text-white">
            <FontAwesomeIcon className="text-xl mx-3 w-1/4" icon={faPodcast} />
            <h4 className="font-medium pl-4 w-3/4">Podcast</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

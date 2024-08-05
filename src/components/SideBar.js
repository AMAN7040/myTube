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
  faSignIn,
  faSignOut,
  faSquareCheck,
  faThumbsUp,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../utils/userSlice";
import { auth } from "../utils/firebase";

const SideBar = () => {
  const isBarOpen = useSelector((store) => store.sidebar.isBarOpen);
  const user = useSelector((store) => store.user.userInfo);
  const subscribers = useSelector((store) => store.subscribers.userSubscribers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return !isBarOpen ? (
    <div className="bg-transparent py-8 w-10 h-screen top-0 mt-[3rem] left-0 fixed md:w-20 2xl:py-10 2xl:w-28">
      <Link to={"/"}>
        <div className="list-none font-semibold cursor-pointer mb-7 text-white">
          <li className="text-lg px-[9px] w-1/4 md:px-5 md:py-1 2xl:text-xl 2xl:px-7 2xl:py-1">
            <FontAwesomeIcon icon={faHomeAlt} className="text-white" />
          </li>
          <li className="text-[11px] w-3/4 px-1 md:px-4 md:py-1 2xl:px-5 2xl:text-[14px]">Home</li>
        </div>
      </Link>
      <div className="list-none font-semibold cursor-pointer text-white">
        <li className="text-lg px-[9px] md:px-5 md:py-1 2xl:text-xl 2xl:px-7 2xl:py-1 ">
          <FontAwesomeIcon icon={faUser} />
        </li>
        <li className="text-[11px] w-3/4 px-[6px] md:px-4 md:py-1 2xl:px-6 2xl:text-[14px]">You</li>
      </div>
    </div>
  ) : (
    <div className="bg-transparent py-8 w-28 h-screen top-0 mt-[3rem] left-0 fixed overflow-y-auto md:w-36 2xl:py-10 2xl:w-64">
      <Link to={"/"}>
        <div className="flex items-center mb-4 cursor-pointer text-white">
          <FontAwesomeIcon className="text-lg px-[9px] w-1/4 md:px-5 md:py-2 2xl:text-xl 2xl:px-4 2xl:py-2" icon={faHomeAlt} />
          <h4 className="font-medium text-[14px] pl-2 w-3/4 2xl:text-[15px] 2xl:pl-4">Home</h4>
        </div>
      </Link>

      <hr className="mx-1 my-1 mb-5 2xl:mx-4 2xl:mb-4 text-white"></hr>
      <div className="flex items-center mb-6">
        <h3 className="text-white ml-2 font-medium text-lg md:pl-3 2xl:ml-7">You</h3>
        <FontAwesomeIcon
          className="text-md pl-4 2xl:pl-10 text-white"
          icon={faGreaterThan}
        />
      </div>
      {user ? (
        <div>
          {/* <div className="flex items-center mb-4 cursor-pointer text-white">
            <FontAwesomeIcon className="text-xl mx-3 w-1/4" icon={faHistory} />
            <h4 className="font-medium text-[15px] pl-4 w-3/4">History</h4>
          </div> */}
          {/* <div className="flex items-center mb-4 cursor-pointer text-white">
            <FontAwesomeIcon
              className="text-xl mx-3 w-1/4"
              icon={faLayerGroup}
            />
            <h4 className="font-medium text-[15px] pl-4 w-3/4">Playlists</h4>
          </div> */}
          <Link to={"/watchlater"}>
            <div className="flex items-center mb-4 cursor-pointer text-white">
              <FontAwesomeIcon
                className="text-xl mx-1 w-1/4 md:mx-2 2xl:mx-3"
                icon={faSquareCheck}
              />
              <h4 className="font-medium text-[12px] pl-1 w-3/4   2xl:text-[15px] 2xl:pl-4 text-white">
                Watch Later
              </h4>
            </div>
          </Link>
          <Link to={`/like`}>
            <div className="flex items-center mb-4 cursor-pointer text-white">
              <FontAwesomeIcon
                className="text-xl mx-1 w-1/4 md:mx-2 2xl:mx-3"
                icon={faThumbsUp}
              />
              <h4 className="font-medium text-[12px] pl-1 w-3/4 2xl:text-[15px] 2xl:pl-4 text-white">
                Liked Vidoes
              </h4>
            </div>
          </Link>

          <div
            className="flex items-center mb-8 cursor-pointer text-white"
            onClick={() => handleSignOut()}
          >
            <FontAwesomeIcon className="text-xl mx-1 w-1/4 md:mx-2 2xl:mx-3 " icon={faSignOut} />
            <h4 className="font-medium text-[12px] pl-1 w-3/4 2xl:text-[15px] 2xl:pl-4 text-white ">Sign Out</h4>
          </div>

          <hr className="border-t border-white mx-1 2xl:mx-4 my-1 mb-4"></hr>
          <div>
            <h3 className="text-white ml-2 font-medium text-[15px] md:ml-4 2xl:text-lg 2xl:ml-7 mb-4">
              Subscriptions
            </h3>
            {subscribers &&
              subscribers.map((subs) => (
                <Link to={`/channel?c=${subs?.id}`}>
                  <div
                    key={subs?.id}
                    className="flex items-center ml-2 mb-2 cursor-pointer text-white 2xl:ml-7"
                  >
                    <div className="w-1/4 mx-1">
                      <img
                        className="h-6 w-6 2xl:h-8 2xl:w-8 rounded-full"
                        src={subs?.snippet?.thumbnails?.default?.url}
                        alt="channelImg"
                      />
                    </div>
                    <p className="text-white text-[10px] md:text-[12px] 2xl:text-[13px] mb-1 w-3/4">
                      {subs?.snippet?.title}
                    </p>
                  </div>
                </Link>
              ))}
            <hr className="mx-1 my-1 mb-2 2xl:mx-4 2xl:mb-4 text-white"></hr>
          </div>
        </div>
      ) : (
        <>
          <Link to="/login">
            <div className="flex items-center mb-4 cursor-pointer text-white">
              <FontAwesomeIcon className="text-xl mx-1 w-1/4 md:mx-3 2xl:mx-3" icon={faSignIn} />
              <h4 className="font-medium text-[14px] pl-1 w-3/4 2xl:text-[15px] 2xl:pl-4">Login</h4>
            </div>
          </Link>
          <div>
            {" "}
            <h3 className="text-white ml-1 mb-4 font-medium text-sm md:ml-3 md:mb-5 md:text-md 2xl:ml-7 2xl:mb-4 2xl:text-lg">
              {" "}
              Subscriptions{" "}
            </h3>{" "}
            <p className="text-white ml-2 text-xs font-normal mb-4 md:ml-5 2xl:ml-8 2xl:text-sm">Login to see Subscriptions</p>{" "}
            <hr className="border-t border-white mx-1 my-1 mb-4 2xl:mx-4 text-white font-bold"></hr>{" "}
          </div>
        </>
      )}

      {/* <div>
        <h3 className="text-white ml-7 mb-4 font-medium text-lg">Explore</h3>
        <div>
          <div className="flex items-center mb-4 cursor-pointer text-white">
            <FontAwesomeIcon className="text-xl mx-3 w-1/4" icon={faMusic} />
            <h4 className="font-medium text-[15px] pl-4 w-3/4">Music</h4>
          </div>
          <div className="flex items-center mb-4 cursor-pointer text-white">
            <FontAwesomeIcon className="text-xl mx-3 w-1/4" icon={faFilm} />
            <h4 className="font-medium text-[15px] pl-4 w-3/4">Films</h4>
          </div>
          <div className="flex items-center mb-4 cursor-pointer text-white">
            <FontAwesomeIcon
              className="text-xl mx-3 w-1/4"
              icon={faShoppingBag}
            />
            <h4 className="font-medium text-[15px] pl-4 w-3/4">Shopping</h4>
          </div>
          <div className="flex items-center mb-4 cursor-pointer text-white">
            <FontAwesomeIcon className="text-xl mx-3 w-1/4" icon={faGamepad} />
            <h4 className="font-medium text-[15px] pl-4 w-3/4">Gaming</h4>
          </div>
          <div className="flex items-center mb-4 cursor-pointer text-white">
            <FontAwesomeIcon className="text-xl mx-3 w-1/4" icon={faRss} />
            <h4 className="font-medium text-[15px] pl-4 w-3/4">Live</h4>
          </div>
          <div className="flex items-center mb-4 cursor-pointer text-white">
            <FontAwesomeIcon
              className="text-xl mx-3 w-1/4"
              icon={faNewspaper}
            />
            <h4 className="font-medium text-[15px] pl-4 w-3/4 text-white">
              News
            </h4>
          </div>
          <div className="flex items-centermb-4 cursor-pointer text-white">
            <FontAwesomeIcon className="text-xl mx-3 w-1/4" icon={faPodcast} />
            <h4 className="font-medium text-[15px] pl-4 w-3/4">Podcast</h4>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SideBar;

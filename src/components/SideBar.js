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
    <div className="bg-transparent py-10 w-28 h-screen top-0 mt-[3rem] left-0 fixed">
      <Link to={"/"}>
        <div className="list-none font-semibold cursor-pointer mb-7 text-white">
          <li className="text-xl px-7 w-1/4">
            <FontAwesomeIcon icon={faHomeAlt} className="text-white" />
          </li>
          <li className="text-[11px] w-3/4 px-6">Home</li>
        </div>
      </Link>
      <div className="list-none font-semibold cursor-pointer text-white">
        <li className="text-xl px-7">
          <FontAwesomeIcon icon={faUser} />
        </li>
        <li className="text-[11px] w-3/4 px-7">You</li>
      </div>
    </div>
  ) : (
    <div className="bg-transparent py-10 w-64 h-screen top-0 mt-[3rem] left-0 fixed overflow-y-auto">
      <Link to={"/"}>
        <div className="flex items-center mb-4 cursor-pointer text-white">
          <FontAwesomeIcon className="text-xl mx-3 w-1/4" icon={faHomeAlt} />
          <h4 className="font-medium text-[15px] pl-4 w-3/4">Home</h4>
        </div>
      </Link>

      <hr className="mx-4 my-1 mb-4 text-white"></hr>
      <div className="flex items-center mb-6">
        <h3 className="text-white ml-7 font-medium text-lg">You</h3>
        <FontAwesomeIcon
          className="text-md pl-6 text-white"
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
                className="text-xl mx-3 w-1/4"
                icon={faSquareCheck}
              />
              <h4 className="font-medium text-[15px] pl-4 w-3/4 text-white">
                Watch Later
              </h4>
            </div>
          </Link>
          <Link to={`/like`}>
            <div className="flex items-center mb-4 cursor-pointer text-white">
              <FontAwesomeIcon
                className="text-xl mx-3 w-1/4"
                icon={faThumbsUp}
              />
              <h4 className="font-medium text-[15px] pl-4 w-3/4">
                Liked Vidoes
              </h4>
            </div>
          </Link>

          <div
            className="flex items-center mb-8 cursor-pointer text-white"
            onClick={() => handleSignOut()}
          >
            <FontAwesomeIcon className="text-xl mx-3 w-1/4 " icon={faSignOut} />
            <h4 className="font-medium text-[15px] pl-4 w-3/4 ">Sign Out</h4>
          </div>

          <hr className="border-t border-white mx-4 my-1 mb-4"></hr>
          <div>
            <h3 className="text-white ml-7 mb-4 font-medium text-lg">
              Subscriptions
            </h3>
            {subscribers &&
              subscribers.map((subs) => (
                <Link to={`/channel?c=${subs?.id}`}>
                  <div
                    key={subs?.id}
                    className="flex items-center ml-7 mb-2 cursor-pointer text-white"
                  >
                    <div className="w-1/4 mx-1">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={subs?.snippet?.thumbnails?.default?.url}
                        alt="channelImg"
                      />
                    </div>
                    <p className="text-white text-sm w-3/4">
                      {subs?.snippet?.title}
                    </p>
                  </div>
                </Link>
              ))}
            <hr className="border-t border-white mx-4 my-1 mb-4"></hr>
          </div>
        </div>
      ) : (
        <>
          <Link to="/login">
            <div className="flex items-center mb-4 cursor-pointer text-white">
              <FontAwesomeIcon className="text-xl mx-3 w-1/4" icon={faSignIn} />
              <h4 className="font-medium text-[15px] pl-4 w-3/4">Login</h4>
            </div>
          </Link>
          <div>
            {" "}
            <h3 className="text-white ml-7 mb-4 font-medium text-lg">
              {" "}
              Subscriptions{" "}
            </h3>{" "}
            <p className="text-white ml-8 text-sm font-normal mb-4">Login to see Subscriptions</p>{" "}
            <hr className="border-t border-white mx-3 my-1 mb-4 font-bold"></hr>{" "}
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

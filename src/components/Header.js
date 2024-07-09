import {
  faBars,
  faBell,
  faSearch,
  faUser,
} from "@fortawesome/fontawesome-free-solid";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleBar } from "../utils/sidebarSlice";
import { setToggleSuggestion, updateQuery } from "../utils/searchSlice";
import useSearchQuery from "../hooks/useSearchQuery";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { searchQuery, suggestions, toggleSuggestion } = useSelector(
    (store) => store.search
  );
  const user = useSelector((store) => store.user.userInfo);
  const [inputValue, setInputValue] = useState(searchQuery);
  useSearchQuery(searchQuery);

  const handleSideBar = () => {
    dispatch(toggleBar());
  };

  const handleSearch = () => {
    if (inputValue.trim() !== '') {
      navigate(`/results?q=${inputValue}`);
      dispatch(setToggleSuggestion(false)); // Close suggestions after search
    }
  };

  const handleQuery = (e) => {
    const newQuery = e.target.value;
    setInputValue(newQuery);
    dispatch(updateQuery(newQuery));
    if (newQuery.trim() !== '') {
      dispatch(setToggleSuggestion(true)); // Show suggestions when typing
    } else {
      dispatch(setToggleSuggestion(false)); // Hide suggestions if input is empty
    }
  };
  

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    dispatch(updateQuery(suggestion));
    dispatch(setToggleSuggestion(false))
  };

  const handleShowSuggestion = () => {
    if (inputValue.trim() !== '') {
      dispatch(setToggleSuggestion(true)); // Show suggestions only if there's input
    } else {
      dispatch(setToggleSuggestion(false)); // Hide suggestions if input is empty
    }
  };
  

  return (
    <div
      className="h-16 w-full fixed top-0 grid grid-flow-col items-center z-10"
      style={{ backgroundColor: "#141414" }}
    >
      <div className="flex col-span-2">
        <FontAwesomeIcon
          icon={faBars}
          className="text-white mx-7 p-1 text-xl font-light my-4 cursor-pointer"
          onClick={() => handleSideBar()}
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
      <div className="col-span-10 flex justify-center items-center">
        <input
          className="border my-2 w-1/2 h-11 rounded-l-full bg-transparent text-white px-4"
          placeholder="Search"
          style={{ borderColor: "#FFFFFF14" }}
          type="text"
          value={inputValue}
          onChange={handleQuery}
          onFocus={handleShowSuggestion}
          onBlur={handleShowSuggestion}
        />
        <button
          className="border my-2 px-3 h-11 text-center rounded-r-full cursor-pointer text-white "
          style={{ backgroundColor: "#FFFFFF1A", borderColor: "#FFFFFF14" }}
          onClick={()=> handleSearch()}
        >
          <FontAwesomeIcon icon={faSearch} className="px-2" />
        </button>
        {toggleSuggestion && suggestions && (
          <div
            className="absolute mt-[29rem] text-white rounded-lg border shadow-lg z-20 w-[38rem] -ml-[3rem] py-2 "
            style={{ backgroundColor: "#191a19", borderColor: "#FFFFFF14" }}
          >
            {suggestions.map((suggestion) => (
              <div
                key={suggestion}
                className="p-2 hover:bg-gray-700 "
                onMouseDown={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex col-span-2 items-center justify-evenly space-x-10 w-full">
        <FontAwesomeIcon
          icon={faBell}
          className="text-xl cursor-pointer text-white"
        />
        {user ? (
          <img className="h-8 w-8 rounded-full" src={user.photoUrl} alt="userImg" />
        ) : (
          <FontAwesomeIcon
            icon={faUser}
            className="text-white border border-gray-600  text-lg m-3 p-1 rounded-full cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default Header;

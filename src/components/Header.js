import {
  faBars,
  faSearch,
  faUser,
} from "@fortawesome/fontawesome-free-solid";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleBar } from "../utils/sidebarSlice";
import { setToggleSuggestion, updateQuery } from "../utils/searchSlice";
import useSearchQuery from "../hooks/useSearchQuery";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchQuery, suggestions, toggleSuggestion } = useSelector(
    (store) => store.search
  );
  const user = useSelector((store) => store.user.userInfo);
  const [inputValue, setInputValue] = useState(searchQuery);

  useSearchQuery(searchQuery);

  const handleSideBar = useCallback(() => {
    dispatch(toggleBar());
  }, [dispatch]);

  const handleSearch = useCallback(() => {
    if (inputValue.trim()) {
      navigate(`/results?q=${inputValue}`);
      dispatch(setToggleSuggestion(false));
    }
  }, [inputValue, navigate, dispatch]);

  const handleQuery = useCallback((e) => {
    const newQuery = e.target.value;
    setInputValue(newQuery);
    dispatch(updateQuery(newQuery));
    dispatch(setToggleSuggestion(newQuery.trim() !== ''));
  }, [dispatch]);

  const handleSuggestionClick = useCallback((suggestion) => {
    setInputValue(suggestion);
    dispatch(updateQuery(suggestion));
    dispatch(setToggleSuggestion(false));
  }, [dispatch]);

  return (
    <div
      className="h-16 w-full fixed top-0 items-center z-10 grid grid-flow-col"
      style={{ backgroundColor: "#141414" }}
    >
      <div className="flex col-span-2">
        <FontAwesomeIcon
          icon={faBars}
          className="text-white mx-2 my-1 p-1 text-md font-light cursor-pointer md:mx-5 2xl:mx-7 2xl:my-4 2xl:text-xl"
          onClick={handleSideBar}
        />
        <h2 className="text-white font-medium text-md mx-1 flex items-center 2xl:text-xl 2xl:mx-16">
          <FontAwesomeIcon
            className="h-8 ml-1 cursor-pointer 2xl:h-10 2xl:ml-2 2xl:mr-1"
            icon={faYoutube}
            style={{ color: "#ff0000" }}
          />
          <span className="hidden md:block 2xl:block">MyTube</span>
        </h2>
      </div>
      <div className="col-span-10 flex justify-center items-center">
        <input
          className="border my-1 w-[80%] h-9 rounded-l-full bg-transparent text-white px-1 2xl:px-4 2xl:h-11 2xl:my-2 2xl:w-1/2"
          placeholder="Search"
          style={{ borderColor: "#FFFFFF14" }}
          type="text"
          value={inputValue}
          onChange={handleQuery}
          onFocus={() => dispatch(setToggleSuggestion(true))}
          onBlur={() => setTimeout(() => dispatch(setToggleSuggestion(false)), 100)}
        />
        <button
          className="border my-1 px-1 h-9 text-center rounded-r-full cursor-pointer text-white 2xl:my-2 2xl:px-3 2xl:h-11"
          style={{ backgroundColor: "#FFFFFF1A", borderColor: "#FFFFFF14" }}
          onClick={handleSearch}
        >
          <FontAwesomeIcon icon={faSearch} className="px-1 2xl:px-2" />
        </button>
        {toggleSuggestion && suggestions && (
          <div
            className="absolute mt-[30rem] text-white rounded-lg border shadow-lg z-20 w-[14rem] -ml-[2rem] md:-ml-[2rem] md:w-[24rem] md:mt-[29rem] lg:-ml-[2rem] lg:w-[32rem] 2xl:-ml-[3rem] py-2 2xl:w-[37rem] 2xl:mt-[29rem]"
            style={{ backgroundColor: "#191a19", borderColor: "#FFFFFF14" }}
          >
            {suggestions.map((suggestion) => (
              <div
                key={suggestion}
                className="p-2 hover:bg-gray-700"
                onMouseDown={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex col-span-2 items-center justify-evenly w-full">
        {user ? (
          <img className="h-8 w-8 rounded-full" src={user.photoUrl} alt="userImg" />
        ) : (
          <FontAwesomeIcon
            icon={faUser}
            className="text-white border border-gray-600 text-lg m-1 p-1 rounded-full cursor-pointer 2xl:m-3"
          />
        )}
      </div>
    </div>
  );
};

export default Header;

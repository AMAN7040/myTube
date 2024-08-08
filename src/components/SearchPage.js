import React from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import useSearchResults from "../hooks/useSearchResults";
import useFormatViews from "../hooks/useFormatViews";
import useFormattedDate from "../hooks/useFormattedDate";
import useFormatSubscribers from "../hooks/useFormatSubscribers";

const SearchPage = () => {
  const isSidebarOpen = useSelector((store) => store.sidebar.isBarOpen);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const searchResults = useSelector((store) => store.search.searchResults);
  const formatViews = useFormatViews();
  const formattedDate = useFormattedDate();
  const formatSubscribers = useFormatSubscribers();
  // Fetch search results based on query
  useSearchResults(query);

  return (
    <div
      className={`mt-20 bg-transparent ${
        isSidebarOpen ? "ml-[4.5rem] md:ml-[7.8rem]" : "ml-[0.5rem] md:ml-[2rem]"
      } h-full w-full`}
    >
      <div className="grid pl-10 gird-col-1 bg-transparent w-full">
        {searchResults &&
          searchResults.map((result) => {
            const { id, snippet, kind } = result;
            const isVideo = kind === "youtube#video";
            const isChannel = kind === "youtube#channel";
            const isPlaylist = kind === "youtube#playlist";

            return (
              <div key={id} className="my-4 flex justify-center w-[90%]">
                {isVideo && (
                  <Link to={`/watch?v=${id}`}>
                    <div className="md:flex lg:flex 2xl:flex py-1 rounded-lg lg:w-4/5 2xl:4/5 justify-center cursor-pointer">
                      <img
                        src={snippet?.thumbnails.high.url}
                        alt={snippet?.title}
                        className="rounded-lg w-full md:w-2/5 lg:w-3/5 object-cover"
                      />
                      <div className="mx-2 my-2 w-full space-y-2 md:w-2/5 md:mx-3 md:my-3 md:space-y-3 lg:mx-5 lg:my-5 lg:w-2/5 lg:space-y-4">
                        <h3 className="text-[14px] md:text-[15px] lg:text-[16px] text-white font-bold">
                          {snippet.title}
                        </h3>
                        <div className="">
                          <h2 className="text-gray-400 font-semibold text-xs 2xl:text-sm lg:mx-0 2xl:mx-0">
                            {formatViews(result?.statistics?.viewCount)} views .{" "}
                            {formattedDate(result?.snippet?.publishedAt)}
                          </h2>
                        </div>
                        <h3 className="text-white text-xs 2xl:text-sm">
                          {result?.snippet?.channelTitle}
                        </h3>
                        {result?.snippet?.description && (
                          <p className="text-gray-200 text-[10px] md:text-xs lg:text-xs 2xl:text-sm">
                            {result?.snippet?.description.substring(0, 100)}...
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                )}
                {isChannel && snippet?.channelId && (
                  <Link to={`/channel?c=${snippet?.channelId}`}>
                    <div className="md:flex lg:flex 2xl:flex  py-1 rounded-lg lg:w-4/5 2xl:w-4/5 justify-center">
                      <div className="w-full md:w-2/5 lg:w-3/5 flex justify-center">
                        <img
                          src={snippet?.thumbnails?.medium?.url}
                          alt={snippet.title}
                          className="rounded-full w-full md:w-2/5 lg:w-3/5 object-cover"
                        />
                      </div>

                      <div className="mx-5 my-5  w-2/5 space-y-4">
                        <h3 className="text-[14px] md:text-[15px] lg:text-[16px] text-white font-bold">
                          {snippet.title}
                        </h3>
                        <div className="flex">
                          <p className="text-white font-semibold text-sm">
                            {formatSubscribers(
                              result?.statistics?.subscriberCount
                            )}{" "}
                            . {result?.snippet?.customUrl}
                          </p>
                        </div>
                        <h3 className="text-white text-sm">{snippet?.title}</h3>
                        <p className="text-gray-400 font-semibold text-xs 2xl:text-sm">
                          {snippet?.description.substring(0, 200)}...
                        </p>
                      </div>
                    </div>
                  </Link>
                )}
                {isPlaylist && (
                  <Link to={`/channel?c=${snippet?.channelId}`}>
                    <div className="md:flex lg:flex 2xl:flex py-1 rounded-lg lg:w-4/5 2xl:w-4/5 justify-center">
                      <img
                        src={snippet?.thumbnails?.high?.url}
                        alt={snippet?.title}
                        className="rounded-lg w-full md:w-2/5 lg:w-3/5 object-cover"
                      />

                      <div className="mx-2 my-2 w-full space-y-2 md:w-2/5 md:mx-3 md:my-3 md:space-y-3 lg:mx-5 lg:my-5 lg:w-2/5 lg:space-y-4">
                        <h3 className="text-[14px] md:text-[15px] lg:text-[16px] text-white font-bold">
                          {snippet.title}
                        </h3>
                        <p className="text-white text-xs 2xl:text-sm">
                          {result?.snippet?.channelTitle}
                        </p>
                        <h3 className="text-white text-xs 2xl:text-sm">
                          {result?.contentDetails?.itemCount} Videos{" "}
                        </h3>
                        {result?.snippet?.description && (
                          <p className="text-gray-200 text-xs 2xl:text-sm">
                            {result?.snippet?.description.substring(0, 100)}...
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchPage;

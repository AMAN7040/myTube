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
        isSidebarOpen ? "ml-[15rem]" : "ml-[6rem]"
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
              <div key={id} className="my-4 flex justify-center">
                {isVideo && (
                  <Link to={`/watch?v=${id}`}>
                    <div className="flex py-1 rounded-lg w-[80%] justify-center cursor-pointer">
                      <img
                        src={snippet.thumbnails.standard.url}
                        alt={snippet.title}
                        className="rounded-lg w-[40%] object-cover"
                      />
                      <div className="mx-5 my-5  w-[60%] space-y-4">
                        <h3 className="text-md text-white font-bold">
                          {snippet.title}
                        </h3>
                        <div className="">
                          <h2 className="text-gray-400 font-semibold text-sm mx-2">
                            {formatViews(result?.statistics?.viewCount)} views .{" "}
                            {formattedDate(result?.snippet?.publishedAt)}
                          </h2>
                        </div>
                        <h3 className="text-white">
                          {result?.snippet?.channelTitle}
                        </h3>
                        {result?.snippet?.description && (
                          <p className=" text-sm text-white">
                            {result?.snippet?.description.substring(0, 100)}...
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                )}
                {isChannel && (
                  <div className="flex py-1 rounded-lg  w-[80%] justify-center">
                    <div className="w-[40%] flex justify-center">
                      <img
                        src={snippet?.thumbnails?.medium?.url}
                        alt={snippet.title}
                        className="rounded-full w-[30%] my-2"
                      />
                    </div>

                    <div className="mx-5 my-5  w-[60%] space-y-4">
                      <h3 className="text-md text-white font-bold">
                        {snippet.title}
                      </h3>
                      <div className="flex">
                        <p className="text-gray-400 font-semibold text-sm">
                          {formatSubscribers(
                            result?.statistics?.subscriberCount
                          )}{" "}
                          . {result?.snippet?.customUrl}
                        </p>
                      </div>
                      <h3 className="text-white">{snippet?.title}</h3>
                      <p className=" text-sm text-white">
                        {snippet?.description.substring(0, 200)}...
                      </p>
                    </div>
                  </div>
                )}
                {isPlaylist && (
                  <div className="flex py-1 rounded-lg   w-[80%] justify-center">
                    <img
                      src={snippet?.thumbnails?.standard?.url}
                      alt={snippet?.title}
                      className="rounded-lg w-[40%] object-cover"
                    />

                    <div className="mx-5 my-5  w-[60%] space-y-4">
                      <h3 className="text-md text-white font-bold">
                        {snippet.title}
                      </h3>
                      <p className="text-white">
                        {result?.snippet?.channelTitle}
                      </p>
                      <h3 className="text-white">
                        {result?.contentDetails?.itemCount} Videos{" "}
                      </h3>
                      {result?.snippet?.description && (
                        <p className=" text-sm text-white">
                          {result?.snippet?.description.substring(0, 100)}...
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchPage;

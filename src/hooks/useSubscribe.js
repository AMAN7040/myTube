import { useDispatch } from "react-redux";
import { YT_SUBSCRIPTION } from "../utils/constants";
import { getSubDetail } from "../utils/subSlice";
import { useEffect } from "react";

const useSubscribe = (channelId) => {
  const dispatch = useDispatch();

  const getSubscribe = async () => {
    try {
      const response = await fetch(`${YT_SUBSCRIPTION}${channelId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const filterData = data.items[0];
      dispatch(getSubDetail(filterData));
    } catch (error) {
      console.error("Failed to fetch video:", error);
    }
  };
  useEffect(() => {
    if (channelId) {
      getSubscribe();
    }
  }, [channelId]);
};

export default useSubscribe;

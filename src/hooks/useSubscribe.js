import { useDispatch } from "react-redux";
import { useEffect, useCallback } from "react";
import { YT_SUBSCRIPTION } from "../utils/constants";
import { getSubDetail } from "../utils/subSlice";

const useSubscribe = (channelId) => {
  const dispatch = useDispatch();

  const fetchSubscriptionDetails = useCallback(async () => {
    if (!channelId) return;

    try {
      const response = await fetch(`${YT_SUBSCRIPTION}${channelId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const filterData = data.items[0];
      dispatch(getSubDetail(filterData));
    } catch (error) {
      console.error("Failed to fetch subscription details:", error);
    }
  }, [channelId, dispatch]);

  useEffect(() => {
    fetchSubscriptionDetails();
  }, [fetchSubscriptionDetails]);
};

export default useSubscribe;

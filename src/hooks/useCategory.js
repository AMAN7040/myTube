import { useEffect } from "react";
import { YT_CATEGORY } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../utils/videoSlice";

const useCategory = () => {
  const dispatch = useDispatch(); // Get dispatch function from Redux
  const category = useSelector((store) => store.video.category);

  const fetchCategory = async () => {
    try {
      const response = await fetch(YT_CATEGORY);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const categories = data.items;
      dispatch(getCategory(categories)); // Dispatch fetched categories to Redux
    } catch (error) {
      console.error("Failed to fetch video categories:", error);
    }
  };

  useEffect(() => {
    if (!category || category.length === 0) {
      fetchCategory();
    }
  }, [category, dispatch]);
};

export default useCategory;
     
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { YT_SEARCH } from "../utils/constants";
import { getSuggestions, setCache } from "../utils/searchSlice";

const useSearchQuery = (searchQuery) => {
   const dispatch = useDispatch();
   const cache = useSelector((store)=> store.search.cache);

   const fetchSuggestions = async () => {
    try {
      const response = await fetch(YT_SEARCH + searchQuery);
      const data = await response.json();
      const filterData = data[1];
      dispatch(getSuggestions(filterData));
      dispatch(setCache({
        [searchQuery] : filterData,
      }))
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

   useEffect(()=>{

    if(!searchQuery) return;

    const timer = setTimeout(()=> {
        if(cache[searchQuery]){
            dispatch(getSuggestions(cache[searchQuery]));
        }
        else{
            fetchSuggestions();
        }
    }, 300);

    return () => {
        clearTimeout(timer);
    }

   },[searchQuery])
}

export default useSearchQuery;
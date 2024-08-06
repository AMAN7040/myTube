import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import useCategory from "../hooks/useCategory";
import { updateCategoryId } from "../utils/videoSlice";

const ButtonBar = () => {
  useCategory();

  const category = useSelector((store) => store.video.category);
  const dispatch = useDispatch();

  const handlecategory = (id) => {
    dispatch(updateCategoryId(id));
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 9,      
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1030,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  if (!category) return null;

  return (
    <div className="px-12 py-2 md:px-10 2xl:px-10 2xl:py-3 overflow-visible text-white bg-transparent  ">
      <Slider {...settings}>
        <div className="px-1 pt-3 2xl:px-2 text-xs 2xl:text-sm">
          <button
            className="py-1 px-1 2xl:px-2 w-full border border-gray-700 rounded-lg shadow-md text-white"
            style={{ backgroundColor: "#FFFFFF1A" }}
            onClick={()=> handlecategory(0)}
          >
            All
          </button>
        </div>
        {category.map((item) => (
          <div key={item.snippet.title} className="px-1 pt-3 2xl:px-2 text-xs 2xl:text-sm">
            <button
              className="py-1 px-1 2xl:px-2 w-full border border-gray-700 rounded-lg shadow-md text-white"
              style={{ backgroundColor: "#FFFFFF1A" }}
              onClick={()=> handlecategory(item.id)}
            >
              {item.snippet.title}
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ButtonBar;

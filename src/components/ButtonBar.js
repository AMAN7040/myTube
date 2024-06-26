import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ButtonBar = () => {
  const lists = [
    "All",
    "Gaming",
    "Music",
    "News",
    "Sports",
    "Learning",
    "Fashion",
    "Travel",
    "Comedy",
    "Technology",
    "Cooking",
    "Fitness",
    "Health",
    "Education",
    "Movies",
    "DIY",
    "Science",
    "Nature",
    "Animation",
    "Live",
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 15,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
          infinite: true,
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
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
    ],
  };
  

  return (
    <div className="px-5 py-3 w-[1790px] overflow-hidden text-white">
      <Slider {...settings}  >
        {lists.map((item, index) => (
          <div key={index} className="px-2 pt-3 text-sm">
            <button
              className="py-1 px-2 w-full bg-black opacity-90 border border-gray-700 rounded-xl shadow-md text-white hover:bg-gray-700"
            >
              {item}
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ButtonBar;

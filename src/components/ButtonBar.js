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
    <div className="px-10 py-3 overflow-visible text-white bg-transparent  ">
      <Slider {...settings}  >
        {lists.map((item, index) => (
          <div key={index} className="px-2 pt-3 text-sm">
            <button
              className="py-1 px-2 w-full border border-gray-700 rounded-lg shadow-md text-white"
              style={{backgroundColor:'#FFFFFF1A'}}
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

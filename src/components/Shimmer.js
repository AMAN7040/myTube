// Shimmer.js
import React from 'react';

const Shimmer = ({ isBarOpen }) => {
  // Generate 12 placeholders dynamically
  const placeholders = Array.from({ length: 12 }, (_, index) => (
    <div key={index} className='bg-gray-400 my-2 w-[400px] shadow-lg'></div>
  ));

  return (
    <div>
      {placeholders}
    </div>
  );
};

export default Shimmer;

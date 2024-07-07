import React from 'react';

const Shimmer = () => {
  // Example: Generate 12 placeholders dynamically
  const placeholders = Array.from({ length: 12 }, (_, index) => (
    <div key={index} className='bg-red-400 w-[25%] h-16 animate-pulse rounded-md'></div>
  ));

  return (
    <div className='grid gap-4 pl-10 grid-cols-4 w-full'>
      {placeholders}
    </div>
  );
};

export default Shimmer;

import React from 'react';

function AuthorsCards ({ coverImage, authorName }) {
  const defaultImage = "https://via.placeholder.com/250x400.png?text=No+Image+Available";

  return (
    <div className="w-full min-h-[300px]">
      <div className="flex flex-col h-full">
        <div className="w-full">
        <img src={coverImage} alt={authorName} className="rounded-md h-[300px]  w-full object-cover" />
        </div>
        <div className='p-3 flex-1'>
        <h2 className="mt-4 text-center text-base uppercase font-semibold font-barlow ">{authorName}</h2>
        </div>
      </div>
    </div>
  );
}

export default AuthorsCards;


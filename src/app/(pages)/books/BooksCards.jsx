import React from 'react';

function BooksCards({ title, bookPrice, authorName, coverImage }) {
  const defaultImage = "https://via.placeholder.com/250x400.png?text=No+Image+Available";

  return (
    <div className="w-full min-h-[400px]">
      <div className="flex flex-col h-full">
        <div className="h-[300px]">
          <img
            src={coverImage || defaultImage}
            alt={title || "Book cover"}
            className="object-cover w-full h-full"
          />
        </div>
        <div className='p-3 flex-1'>
          <h3 className="mt-2 uppercase text-xl font-bold text-black leading-5">
            {title || "Unknown Title"}
          </h3>
          <h4 className="uppercase pt-2 text-base">{authorName || "Unknown Author"}</h4>
          <p className=" text-gray-500">
            <span>&#8377;</span> {bookPrice || "Not Available"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BooksCards;

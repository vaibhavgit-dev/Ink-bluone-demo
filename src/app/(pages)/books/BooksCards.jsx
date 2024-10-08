import React from 'react';

function BooksCards({ title, bookPrice, authorName, coverImage, publishYear }) {
  const defaultImage = "https://via.placeholder.com/250x400.png?text=No+Image+Available";

  return (
    <div className="w-full min-h-[300px]">
      <div className="flex flex-col h-full">
        <div className="h-[300px]">
          <img
            src={coverImage || defaultImage}
            alt={title || "Book cover"}
            className="object-cover w-full h-full"
          />
        </div>
        <div className='flex-1'>
          {title && (
            <h6 className="pt-4 uppercase font-semibold font-barlow leading-5">
              {title}
            </h6>
          )}
          {authorName && (
            <h4 className="uppercase font-light font-barlow pt-2 text-base leading-5 text-[#0D1928]">
              {authorName}
            </h4>
          )}
          {bookPrice && (
            <h4 className="text-gray-500 text-base font-barlow">
              {bookPrice}
            </h4>
          )}
          {publishYear && (
            <p className="text-gray-500">
              {publishYear}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BooksCards;

"use client"
import { useState, useEffect } from "react";
import { AuthorsDetail } from "@/app/API/getauthorDetails";
import { BooksList } from "@/app/API/allBookList";
import { BooksDetails } from "@/app/API/getbookDetails";
import AuthorsCards from "../authorsCards";
import inkdouble1 from "@/app/assests/image/inkdouble1.svg";
import inkdouble2 from "@/app/assests/image/inkdouble2.svg";
import Image from "next/image";
import BooksCards from "../../books/BooksCards";
import bgauthor from "@/app/assests/image/authors-back.svg";
import Loader from "@/app/components/Loader";

const Page = ({ params }) => {
  const { pageNo: id } = params;

  // Find the specific author based on ID
  const authorInfo = AuthorsDetail.find((author) => author.id === parseInt(id));

  // Check if the author exists
  if (!authorInfo) {
    return <div>Loading...</div>;
  }

  // Filter the books based on the author's ID
  const authorBooks = BooksList.filter(
    (book) => book.authorId === authorInfo.id
  );

  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to copy the link to the clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Short and full description logic
  const descriptionWords = authorInfo.authorDescription.split(" ");
  const shortDescription =
    descriptionWords.slice(0, 100).join(" ") +
    (descriptionWords.length > 100 ? "..." : "");
  const fullDescription = authorInfo.authorDescription;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <>
    {loading ? (
    <Loader />
  ) : (
    <main className="wrapper pt-20 pb-10">
      {/* Page Container */}
      <div className="container pt-20">
        <div className="relative pb-20">
          <div className="absolute top-0 left-0 right-0 pb-20 z-[10]">
            <img
              className="m-auto p-1 aspect-square object-cover border-2 border-dotted border-[#241B6D] rounded-full"
              src={authorInfo.authorImage}
              alt="Author"
              width={300}
              height={250}
            />
          </div>
        </div>

        {/* Author Details Section */}
        <div className="author-details-container mx-auto p-10 rounded-2xl w-full lg:w-[65%] bg-cover bg-center mt-20" style={{ position: 'relative' }}>
        <Image 
        src={bgauthor}
        alt="Background"
        layout="fill" 
        objectFit="cover"
        objectPosition="top"
        borderRadius= "30px"
      />
          <div className="text-center" style={{ position: 'relative', zIndex: 1 }}>
            <h4 className="mt-20 pt-10 text-4xl mb-5">
              {authorInfo.authorName}
            </h4>

            {/* Conditionally render description */}
            <p className="pt-4 pb-4 ">
              {isExpanded ? fullDescription : shortDescription}
              &nbsp;
              {descriptionWords.length > 50 && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-blue-500 mt-2 focus:outline-none"
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              )}
            </p>

            {/* Author's Social Media Links */}
            <ul className="list-disc flex flex-wrap justify-center gap-6 pb-6">
              {authorInfo.authorSocial.map((social, index) => (
                <li key={index} className="list-none hover:text-[#007DD7]">
                  <a
                    href={`https://${social}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.split(".")[0]}
                  </a>
                </li>
              ))}
            </ul>

            {/* Copy Link Button */}
            <p className="text-center text-blue-600 mt-6 mb-12">
              <em>Send a message to the Author</em>
              <button
                onClick={copyLink}
                className="md:ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                aria-label="Copy link"
              >
                {copied ? <span>📋 Copied!</span> : <span>📩</span>}
              </button>
            </p>
          </div>
        </div>

        {/* Author's Books Section */}
        <div className="books-section w-full pt-20">
          <div className="flex items-center gap-2 justify-center pb-6 pt-6">
            <Image src={inkdouble1} width={55} height={55} alt="inkdouble1" />
            <h3 className="font-bold text-base md:text-4xl text-center">
              {authorInfo.authorName}’s books published by BluOne Ink
            </h3>
            <Image src={inkdouble2} width={55} height={55} alt="inkdouble2" />
          </div>
          <div className="wrapper mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {authorBooks.map((book, i) => {
              const bookAuthorName = AuthorsDetail.find(
                (author) => author.id === book.authorId
              )?.authorName || "Unknown Author";

              return (
                <div key={i}>
                  <a
                    href={`/books/${book.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <BooksCards
                      title={book.title}
                      coverImage={book.image}
                      bookPrice={book.price}
                      authorName={bookAuthorName}
                    />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
    )}
    </>
  );
};

export default Page;
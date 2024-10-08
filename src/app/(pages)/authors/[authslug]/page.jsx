"use client";
import { useState, useEffect } from "react";
import { AuthorsList } from "@/app/API/allAuthorList";
import { BooksDetails } from "@/app/API/getbookDetails";
import inkdouble1 from "@/app/assests/image/inkdouble1.svg";
import inkdouble2 from "@/app/assests/image/inkdouble2.svg";
import Image from "next/image";
import BooksCards from "../../books/BooksCards";
import bgauthor from "@/app/assests/image/authors-back.svg";
import Loader from "@/app/components/Loader";
import Link from "next/link";

const Page = ({ params }) => {
  const { authslug } = params;

  // Find the author using the slug
  const authorInfo = AuthorsList.find((author) => author.authslug === authslug);

  if (!authorInfo) {
    return <div>Loading...</div>;
  }

  // author's books by filtering BooksDetails
  const authorBooks = BooksDetails.filter((book) => {
    const bookAuthorsArray = Array.isArray(book.author)
      ? book.author
      : [book.author];
    return (
      bookAuthorsArray.join(", ") === authorInfo.author_name &&
      book.slug !== authorInfo.slug
    );
  });

  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // copy Link
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

  // Loading
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
                  src={authorInfo.image}
                  alt="Author"
                  width={300}
                  height={250}
                />
              </div>
            </div>

            {/* Author Details Section */}
            <div
              className="author-details-container mx-auto p-10 rounded-2xl w-full lg:w-[65%] bg-cover bg-center mt-20"
              style={{ position: "relative" }}
            >
              <Image
                src={bgauthor}
                alt="Background"
                layout="fill"
                objectFit="cover"
                objectPosition="top"
                borderRadius="30px"
              />
              <div className="text-center" style={{ position: "relative", zIndex: 1 }}>
                <h4 className="mt-20 pt-10 text-4xl mb-5">{authorInfo.author_name}</h4>

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
                  {authorInfo.author_name}’s books published by BluOne Ink
                </h3>
                <Image src={inkdouble2} width={55} height={55} alt="inkdouble2" />
              </div>
              <div className="wrapper mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {authorBooks.length > 0 ? (
                  authorBooks.map((book, i) => (
                    <div key={i} className="p-4">
                      <Link href={`/books/${book.slug}`} style={{ textDecoration: "none" }}>
                        <BooksCards
                          title={book.title}
                          coverImage={book.book_image}
                          publishYear={book.publish_year}
                          authorName={book.author}
                        />
                      </Link>
                    </div>
                  ))
                ) : (
                  <p>No related books found for this author.</p>
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Page;

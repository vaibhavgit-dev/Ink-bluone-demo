"use client";
import { BooksDetails } from "@/app/API/getbookDetails";
import { AuthorsList } from "@/app/API/allAuthorList";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import bgauthor from "@/app/assests/image/authors-back.svg";
import aboutbookbg from "@/app/assests/image/aboutbookbg.png";
import inkdouble1 from "@/app/assests/image/inkdouble1.svg";
import inkdouble2 from "@/app/assests/image/inkdouble2.svg";
import BooksCards from "../BooksCards";
import SliderBook from "@/app/components/SliderBook";
import amazonimg from "@/app/assests/image/amazon.svg";
import flipkartimg from "@/app/assests/image/Flipkart.svg";
import Loader from "@/app/components/Loader";

const testimonials = [
  {
    quote:
      "Manogna Sastry has once again demonstrated her prowess as one of India’s finest historians. It's an experience that takes you through the depths of India's spiritual and historical landscapes.",
    name: "Manogna Sastry",
    designation: "Author",
  },
  {
    quote:
      "Manogna Sastry has once again demonstrated her prowess as one of India’s finest historians. It's an experience that takes you through the depths of India's spiritual and historical landscapes.",
    name: "Manogna Sastry",
    designation: "Author",
  },
];

const Page = ({ params }) => {
  const { slug } = params;
  const bookInfo = BooksDetails.find((book) => book.slug === slug);

  if (!bookInfo) {
    return <div>Loading...</div>;
  }

  const authorsArray = Array.isArray(bookInfo.author)
    ? bookInfo.author
    : [bookInfo.author];

  // const authorBooks = BooksDetails.filter((book) => {
  //   const bookAuthorsArray = Array.isArray(book.author)
  //     ? book.author
  //     : [book.author];
  //   return (
  //     bookAuthorsArray.join(", ") === authorsArray.join(", ") &&
  //     book.slug !== bookInfo.slug
  //   );
  // });

  const noImageUrl = "https://via.placeholder.com/150?text=No+Image";

  const thumbnails = Array.isArray(bookInfo.book_thumbnail)
    ? bookInfo.book_thumbnail
    : [];

  // State to track current index and cloned slides logic
  const clonedThumbnails = [...thumbnails, ...thumbnails];

  // Authors details
  const [activeTab, setActiveTab] = useState(authorsArray[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const selectedCategory = "Fiction";

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className="pt-10">
          <section className="relative overflow-hidden w-full z-[111]">
            <div className="slider-track flex items-center">
              {/* Duplicating thumbnails for continuous scroll */}
              {clonedThumbnails
                .concat(clonedThumbnails)
                .map((thumbnail, index) => (
                  <div
                    key={index}
                    className="flex-none slide_item h-[400px] object-cover"
                  >
                    <img
                      className="w-full object-cover"
                      src={thumbnail || noImageUrl}
                      alt={`Thumbnail ${index}`}
                      onError={(e) => {
                        e.target.src = noImageUrl;
                      }}
                    />
                  </div>
                ))}
            </div>
          </section>

          <style jsx>{`
            .slider-track {
              display: flex;
              animation: scroll 30s linear infinite;
            }

            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-100%);
              }
            }

            .slide_item {
              min-width: 25%; /* Adjust based on how many items you want visible */
            }
          `}</style>

          {/* Main Book Information Section */}
          <div className="mx-auto max-w-5xl px-4 py-8">
            <section className="about_the_book_sec text-center pt-6">
              <h1 className="text-4xl font-bold mb-4">{bookInfo.title}</h1>
              <h2 className="text-xl text-[#007DD7] font-semibold mb-2">
                {authorsArray.join(", ")}
              </h2>

              <div className="flex w-[50%] mx-auto pt-6">
                <div className="flex-1">{bookInfo.language}</div>
                <div className="flex-1">{bookInfo.book_format}</div>
              </div>

              <div className="flex md:w-[50%] gap-3 md:mx-auto pt-6">
                <div className="flex-1">
                  <h3>{bookInfo.publish_year}</h3>
                  <p>PUBLISHED</p>
                </div>
                <div className="flex-1">
                  <h3>{bookInfo.pages}</h3>
                  <p>PAGES</p>
                </div>

                <div className="flex-1">
                  <h3>₹{bookInfo.price}</h3>
                  <p>PRICE</p>
                </div>
              </div>

              <div className="flex w-[50%] md:gap-10 gap-10 justify-center mx-auto pt-6">
                <Link href={`${bookInfo.amazonlink}`} target="_blank">
                  <button className="bg-black rounded-full px-10 py-3 text-[#fff]">
                    <Image
                      src={amazonimg}
                      width={80}
                      height={80}
                      className="mt-1.5 max-w-full h-auto"
                    ></Image>
                  </button>
                </Link>
                <Link href={`${bookInfo.flipkartlink}`}>
                  <button className="bg-[#007BD7] rounded-full px-10 py-4 text-[#fff]">
                    <Image src={flipkartimg} width={100} height={100}></Image>
                  </button>
                </Link>
              </div>
            </section>

            {/* About the Book */}
            <div id="about-book" className="container pt-2">
              <div
                className="author-details-container mx-auto p-10 rounded-2xl w-full lg:w-[85%] min-h-[550px] bg-cover bg-center mt-20"
                style={{ position: "relative" }}
              >
                <Image
                  src={aboutbookbg}
                  alt="Background"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="bottom"
                  borderRadius="30px"
                />
                <div
                  className="text-center"
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <div className="w-full pt-6">
                    <h3 className="pb-4">About the Book</h3>
                    <p className="text-lg font-light mb-4">
                      {bookInfo.about_book}
                    </p>
                  </div>

                  {/* book category */}
                  <div className="flex w-full">
                    <h3 className="text-lg font-light">
                      Categories:{" "}
                      <span className="text-[#007DD7]">
                        {bookInfo.category}
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* About the Book Authour */}
            <div
              id="about-author"
              className="container mx-auto text-center py-10"
            >
              <div
                className="author-details-container mx-auto p-10 rounded-2xl w-full lg:w-[85%] bg-cover bg-center mt-20"
                style={{ position: "relative" }}
              >
                <Image
                  src={bgauthor}
                  alt="Background"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top"
                />
                <div className="flex justify-center space-x-8 mb-8">
                  {authorsArray.map((author, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveTab(author)}
                      className="cursor-pointer z-[10]"
                    >
                      <img
                        src={bookInfo.Authorimage}
                        alt={author}
                        className={`rounded-full border-4 w-[130px] h-[130px] transition duration-200  ${
                          activeTab === author
                            ? "border-[#FF8100]"
                            : "border-[#FF8100]"
                        }`}
                      />
                    </div>
                  ))}
                </div>

                <div className="p-8 pt-10 mx-auto">
                  <div className="relative cursor-pointer z-[10]">
                    <h3 className="font-bold mb-4">{activeTab}</h3>
                    <p className="text-gray-700 mb-4">{bookInfo.AuthorInfo}</p>
                    {/* <p onClick={toggleReadMore} className="text-blue-500 underline">
          {isReadMore ? 'Read Less' : 'Read More'}
        </p> */}
                    <div className="w-full">
                      <Link
                        href={`/authors/${bookInfo.author_slug}`}
                        className="text-blue-500 underline"
                      >
                        Visit the Author Page
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Endorement section */}
          {/* <div id="endorsements" className="wrapper bg-[#DDF5FF] w-full">
          <div className="container mx-auto p-10 pt-10">
            <SliderBook testimonials={testimonials} />
          </div>
        </div> */}

          {/* Other Books by the Same Author */}
          <div id="related-titles" className="container mt-16">
            <div className="flex items-center gap-2 justify-center pb-6 pt-6">
              <Image src={inkdouble1} width={55} height={55} alt="inkdouble1" />
              <h3 className="font-bold text-xl md:text-2xl text-center">
                Related Titles
              </h3>
              <Image src={inkdouble2} width={55} height={55} alt="inkdouble2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {BooksDetails.filter(
                (book) => book.category === selectedCategory
              ).map((filteredBook, i) => (
                <div key={i} className="p-4">
                  <Link
                    href={`./${filteredBook.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <BooksCards
                      title={filteredBook.title}
                      coverImage={filteredBook.book_image}
                      bookPrice={filteredBook.price}
                      authorName={filteredBook.author}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-[#FF81001A] py-6 mt-6 flex justify-center">
            <div className="container flex gap-4 justify-center items-center">
              <div className="w-[60%] md:w-full flex-wrap md:flex md:justify-center mx-auto gap-2">
                <h6 className="font-medium">Other Specifications: </h6>
                <ul className="flex-wrap items-center space-x-6 md:flex">
                  <li className="md:list-none pl-6 md:pl-0">
                    ISBN10:{bookInfo.isbn10}
                  </li>
                  <li className="md:list-disc">ISBN13:{bookInfo.isbn13}</li>
                  <li className="md:list-disc">Weight:{bookInfo.weight}</li>
                  <li className="md:list-disc">
                    Dimensions:x{bookInfo.dimension}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="fixed top-40 left-4 z-1 bg-white shadow-lg p-6 pt-10 pb-10 rounded-lg z-10 hidden lg:block">
            <h3 className="font-bold text-lg pb-3">Go to Top</h3>
            <ul className="flex flex-col">
              <li>
                <a
                  href="#about-book"
                  className="text-black hover:text-[#007BD7] pb-2"
                >
                  About the Book
                </a>
              </li>
              <li>
                <a
                  href="#about-author"
                  className="text-black hover:text-[#007BD7] pb-2"
                >
                  About the Author
                </a>
              </li>
              {/* <li>
              <a href="#endorsements" className="text-black hover:text-[#007BD7] pb-2">Endorsements</a>
            </li> */}
              <li>
                <a
                  href="#related-titles"
                  className="text-black hover:text-[#007BD7] pb-2"
                >
                  Related Titles
                </a>
              </li>
            </ul>
          </div>
        </main>
      )}
    </>
  );
};

export default Page;

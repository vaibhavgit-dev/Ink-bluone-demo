"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { BooksDetails } from "./API/getbookDetails";
import FictionImg from "@/app/assests/image/Fiction.png";
import NonFictionImg from "@/app/assests/image/Non-fiction.png";
import ChildrenImg from "@/app/assests/image/children.png";
import jlf from "@/app/assests/image/jlf.png";
import plf from "@/app/assests/image/plf.png";
import thejaipur from "@/app/assests/image/thejaipur.png";
import inksingleicon from "@/app/assests/image/inksingleicon.svg";
import Link from "next/link";
import dynamic from "next/dynamic";
import BannerSlider from "./components/BannerSlider";
import inkdouble1 from "@/app/assests/image/inkdouble1.svg";
import inkdouble2 from "@/app/assests/image/inkdouble2.svg";
import Loader from "./components/Loader";

export default function Home() {
  // Helper function to group books by publishYear
  const booksByYear = BooksDetails.reduce((acc, book) => {
    if (!acc[book.publish_year]) {
      acc[book.publish_year] = [];
    }
    acc[book.publish_year].push(book);
    return acc;
  }, {});

  // Helper function to get the number of distinct authors for each year
  const getAuthorsCount = (booksArray) => {
    const authors = new Set(); // Use a Set to ensure uniqueness

    booksArray.forEach((book) => {
      const authorsList = Array.isArray(book.author)
        ? book.author
        : [book.author];
      authorsList.forEach((author) => {
        if (
          typeof author === "string" &&
          author.trim() !== "" &&
          author !== "author black"
        ) {
          authors.add(author);
        }
      });
    });

    return authors.size;
  };

  // Helper function to get the number of distinct languages for each year
  const getLanguagesCount = (booksArray) => {
    const languages = new Set();

    booksArray.forEach((book) => {
      if (book.language && book.language.trim() !== "") {
        languages.add(book.language);
      }
    });

    return languages.size;
  };

  const sortedYears = Object.keys(booksByYear).sort();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="relative wrapper pt-[60px] homepage">
          <div className="main pt-5">
            <section className="slider relative z-1 top-2">
              <BannerSlider />
            </section>
          </div>
          <div className="bg-[#ffffff] w-full relative z-[11]">
            <div className="w-full h-full bg-[#1084090D] pt-[60px] pb-[60px] bookpart relative z-[111]">
              <div className="container mx-auto">
                <section className="book_by_year ">
                  <i>
                    <h6 className="text-center font-semibold ">
                      In 2021, the year BluOne Ink was founded, we published X
                      titles.
                      <br />
                      This year, we aim to cross 100 published titles.
                    </h6>
                  </i>

                  {sortedYears.map((year, index) => {
                    const nextYear = sortedYears[index + 1];
                    const displayYear = nextYear ? `${year}-${nextYear}` : year; // Format as "2021-2022"

                    return (
                      <>
                        <div className="flex justify-center mt-[54px] ">
                          <Image
                            src={inksingleicon}
                            width={30}
                            height={30}
                          ></Image>
                        </div>
                        <div className="flex flex-col mt-[26px]" key={year}>
                          <span className="text-center text-[#241B6D] spanfont">
                            {displayYear}
                          </span>
                          <i className="mt-[4px]">
                            <h6 className="text-center font-normal ">
                              {booksByYear[year].length} titles,{" "}
                              {getLanguagesCount(booksByYear[year])} languages,{" "}
                              {getAuthorsCount(booksByYear[year])} authors
                            </h6>
                          </i>
                          <div className="flex flex-wrap gap-2 justify-center mt-[30px]">
                            {booksByYear[year].map((book) => (
                              <div key={book.id}>
                                <Link
                                  href={`./books/${book.slug}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  <img
                                    // src={
                                    //   Array.isArray(book.book_thumbnail)
                                    //     ? book.book_thumbnail[0]
                                    //     : book.book_thumbnail
                                    // }
                                    src = {book.book_image}
                                    alt={book.title}
                                    className="h-32 w-20 mb-[5px] object-cover"
                                  />
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </section>
              </div>
            </div>
            <section className="w-full items-center pt-[90px] catergory relative z-[111]  bg-[#fff]">
              <div className="container flex items-center gap-2 justify-center ">
                <Image
                  src={inkdouble1}
                  width={55}
                  height={55}
                  className=""
                ></Image>
                <i>
                  <h3 className="text-center font-semibold ">Categories</h3>
                </i>
                <Image
                  src={inkdouble2}
                  width={55}
                  height={55}
                  className=""
                ></Image>
              </div>
              <div className="flex container lg:pl-[100px] lg:pr-[100px] mt-[20px] justify-center  gap-[10px] md:gap-[60px]">
                {/* Fiction */}
                <div className="relative overflow-hidden w-full">
                  <Image
                    src={FictionImg}
                    alt="Fiction"
                    width={0}
                    height={0}
                    className=""
                  />
                  <Link href="/comingsoon">
                    <div className="absolute inset-0 flex justify-center items-center">
                      <span className="text-white font-medium text-lg md:text-[40px] ">
                        FICTION
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Non-Fiction */}
                <div className="relative overflow-hidden w-full">
                  <Image
                    src={NonFictionImg}
                    alt="Non-Fiction"
                    width={0}
                    height={0}
                    className=""
                  />
                  <Link href="/comingsoon">
                    <div className="absolute inset-0 flex justify-center items-center">
                      <span className="text-white font-medium text-lg md:text-[40px]">
                        NON-FICTION
                      </span>
                    </div>
                  </Link>
                </div>

                {/* Children */}
                <div className="relative overflow-hidden w-full">
                  <Image
                    src={ChildrenImg}
                    alt="Children"
                    width={0}
                    height={0}
                    className=""
                  />
                  <Link href="/comingsoon">
                    <div className="absolute inset-0 flex justify-center items-center">
                      <span className="text-white font-medium text-lg md:text-[40px]">
                        CHILDREN
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </section>
            <section className="container event mt-[80px] pb-[60px]">
              <div className="flex items-center justify-center gap-2 pb-[18px] ">
                <Image
                  src={inkdouble1}
                  width={55}
                  height={55}
                  className=""
                ></Image>
                <i>
                  <h3 className="text-center font-medium ">
                    Events We’ve Been A Part Of
                  </h3>
                </i>
                <Image
                  src={inkdouble2}
                  width={55}
                  height={55}
                  className=""
                ></Image>
              </div>
              <div className="w-full max-w-[650px] mx-auto">
                <div className="flex items-center gap-10 self-center justify-center">
                  {/* JLF */}
                  <div className="relative overflow-hidden w-full h-[200px] flex justify-center">
                    <Link
                      href="https://jaipurliteraturefestival.org/"
                      target="blank"
                    >
                      <Image
                        src={jlf}
                        alt="jlf"
                        width={200}
                        height={200}
                        className=""
                      />
                    </Link>
                  </div>
                  {/* PLF */}
                  <div className="relative overflow-hidden w-full h-full flex justify-center">
                    <Link href="http://pondylitfest.com/" target="blank">
                      <Image
                        src={plf}
                        alt="plf"
                        width={200}
                        height={200}
                        className=""
                      />
                    </Link>
                  </div>

                  {/* The Jaipur */}
                  <div className="relative overflow-hidden w-full h-full flex justify-center">
                    <Link
                      href="https://www.thejaipurdialogues.com/"
                      target="blank"
                    >
                      <Image
                        src={thejaipur}
                        alt="the jaipur"
                        width={200}
                        height={200}
                        className=""
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

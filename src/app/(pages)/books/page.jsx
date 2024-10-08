"use client";
import { useState, useEffect } from "react";
import { BooksList } from "@/app/API/allBookList";
import { AuthorsList } from "@/app/API/allAuthorList";
import BooksCards from "./BooksCards";
import {
  FiSearch,
  FiXCircle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Link from "next/link";
import Loader from "@/app/components/Loader";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [genreFilter, setGenreFilter] = useState([]);
  const [languageFilter, setLanguageFilter] = useState([]);
  const [formatFilter, setformatFilter] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  const booksPerPage = 15;
  const genre = ["Fiction", "Education", "Non-Fiction"];
  const language = ["English", "Hindi", "Marathi", "Telugu"];
  const format = ["Hardcover", "Paperback", "Ebook"];
  const prices = [
    { label: "Under 399", range: [0, 399] },
    { label: "Between 400-599", range: [400, 599] },
    { label: "Above 600", range: [600, Infinity] },
  ];

  const getAuthorById = (authorId) => {
    return AuthorsList.find((author) => author.id === authorId);
  };

  const handleFilterChange = (filter, setFilter, value) => {
    setFilter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const resetFilters = () => {
    setSortOption("");
    setGenreFilter([]);
    setLanguageFilter([]);
    setPriceRange([0, 1000]);
    setSearchQuery("");
  };

  const filteredBooks = BooksList.filter((book) => {
    const searchCondition =
      (book.title?.toLowerCase().includes(searchQuery.toLowerCase()) || "") ||
      (typeof book.author === "string" &&
        book.author.toLowerCase().includes(searchQuery.toLowerCase()));
  
    const genreCondition =
      genreFilter.length === 0 || genreFilter.includes(book.genre);
  
    const languageCondition =
      languageFilter.length === 0 || languageFilter.includes(book.language);
  
    const priceCondition =
      book.price >= priceRange[0] && book.price <= priceRange[1];
  
    return searchCondition && genreCondition && languageCondition && priceCondition;
  }).sort((a, b) => {
    if (sortOption === "Title: A to Z") return a.title.localeCompare(b.title);
    if (sortOption === "Title: Z to A") return b.title.localeCompare(a.title);
    if (sortOption === "Publish Year: Newest First")
      return b.publishYear - a.publishYear;
    if (sortOption === "Publish Year: Oldest First")
      return a.publishYear - b.publishYear;
    return 0;
  });
  

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <>
    {loading ? (
    <Loader /> 
  ) : (
    <main
      className="flex flex-col h-full pt-28 pb-20 mx-auto bg-gradient-to-b"
      style={{
        background: "linear-gradient(to bottom, #ffc3000f 10%, #FFFFFF33 90%)",
      }}
    >
      <div className="container px-8 mx-auto">
        <div className="w-full flex justify-center pb-4 pt-6">
          <h1 className="text-[42px]">All Books</h1>
        </div>
        <div className="w-full flex-wrap md:flex gap-4 pt-6">
          <div className="w-[50%] md:w-[15%]">
            <button
              className="border-2 flex justify-center rounded-3xl text-[#8A8A8A] p-3 mb-4 w-full"
              onClick={() => setShowFilters(!showFilters)}
            >
              <span className="flex gap-4 items-center">
                {showFilters ? "Sort & Filters" : "Sort & Filters"}
                {showFilters ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>

            {showFilters && (
              <div className="w-[75%] absolute gap-4 mb-4 z-[1111]">
                <div
                  className="border-[#8A8A8A] p-6 rounded-2xl shadow-xl bg-white hover:shadow-2xl"
                  style={{ padding: "50px" }}
                >
                  <div className="flex">
                    <div className="w-full">
                      <i>
                        <h4 className="font-normal mb-3 text-[#007DD7] text-2xl">
                          Sort
                        </h4>
                      </i>
                      <div className="flex flex-col mb-4 gap-3">
                        {[
                          "Title: A to Z",
                          "Title: Z to A",
                          "Price: Lowest First",
                          "Price: Highest First",
                          "Publish Year: Newest First",
                          "Publish Year: Oldest First",
                        ].map((option) => (
                          <label
                            key={option}
                            className="text-lg text-[#0D1928] font-light pt-2"
                          >
                            <input
                              type="radio"
                              name="sort"
                              value={option}
                              onChange={(e) => setSortOption(e.target.value)}
                            />{" "}
                            <span className="ml-2">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="border-l-2 border-gray-300 mx-8"></div>

                    <div className="w-full flex flex-col">
                      <i>
                        <h4 className="font-normal mb-3 text-[#007DD7] text-2xl">
                          Genre & Category
                        </h4>
                      </i>
                      {genre.map((g) => (
                        <div key={g}>
                          <label className="text-lg pt-2 block text-[#0D1928] font-light">
                            <input
                              type="checkbox"
                              value={g}
                              checked={genreFilter.includes(g)}
                              onChange={() =>
                                handleFilterChange(
                                  genreFilter,
                                  setGenreFilter,
                                  g
                                )
                              }
                            />{" "}
                            <span className="ml-2">{g}</span>
                          </label>

                          {/* Add new checkboxes if the genre is Non-Fiction */}
                          {g === "Non-Fiction" && (
                            <div className="ml-4">
                              {[
                                "Biography",
                                "Memoir",
                                "History",
                                "Self-Help",
                              ].map((subgenre) => (
                                <label
                                  key={subgenre}
                                  className="text-lg pt-2 block text-[#0D1928] font-light"
                                >
                                  <input
                                    type="checkbox"
                                    value={subgenre}
                                    checked={genreFilter.includes(subgenre)}
                                    onChange={() =>
                                      handleFilterChange(
                                        genreFilter,
                                        setGenreFilter,
                                        subgenre
                                      )
                                    }
                                  />{" "}
                                  <span className="ml-2">{subgenre}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="border-l-2 border-[#D9D9D9] mx-8"></div>

                    <div className="w-full flex flex-col">
                      <i>
                        <h4 className="font-normal mb-3 text-[#007DD7] text-2xl">
                          Language
                        </h4>
                      </i>
                      {language.map((lang) => (
                        <label
                          key={lang}
                          className="text-lg pt-2 text-[#0D1928] font-light"
                        >
                          <input
                            type="checkbox"
                            value={lang}
                            checked={languageFilter.includes(lang)}
                            onChange={() =>
                              handleFilterChange(
                                languageFilter,
                                setLanguageFilter,
                                lang
                              )
                            }
                          />{" "}
                          <span className="ml-2">{lang}</span>
                        </label>
                      ))}

                      <div className="border-b-2 border-gray-300 mx-8 pt-3"></div>

                      <i>
                        <h4 className="font-normal pt-3 mb-3 text-[#007DD7] text-2xl">
                          Format
                        </h4>
                      </i>
                      {format.map((lang) => (
                        <label
                          key={lang}
                          className="text-lg pt-2 text-[#0D1928] font-light"
                        >
                          <input
                            type="checkbox"
                            value={lang}
                            checked={formatFilter.includes(lang)}
                            onChange={() =>
                              handleFilterChange(
                                formatFilter,
                                setformatFilter,
                                lang
                              )
                            }
                          />{" "}
                          <span className="ml-2">{lang}</span>
                        </label>
                      ))}
                    </div>

                    <div className="border-l-2 border-gray-300 mx-8"></div>

                    <div className="w-full flex flex-col justify-between">
                      <div className="w-full flex flex-col">
                        <i>
                          <h4 className="font-normal mb-3 text-[#007DD7] text-2xl">
                            Price
                          </h4>
                        </i>
                        {prices.map(({ label, range }) => (
                          <label
                            key={label}
                            className="text-lg pt-2 text-[#0D1928] font-light"
                          >
                            <input
                              type="checkbox"
                              value={label}
                              onChange={() => {
                                const newPriceRange = range;
                                setPriceRange(newPriceRange);
                              }}
                            />{" "}
                            <span className="ml-2">{label}</span>
                          </label>
                        ))}
                      </div>
                      <div className="w-full">
                        <div className="flex gap-4">
                          <div className="w-full">
                            <button
                              className="mt-4 border-2 text-black py-2 px-4 rounded-3xl hover:bg-[#241b6d] hover:text-white w-full"
                              onClick={() => setShowFilters(!showFilters)}
                            >
                              Close
                            </button>
                          </div>
                          <div className="w-full">
                            <button
                              className="mt-4 text-black py-2 px-4 rounded-3xl hover:bg-[#241b6d] hover:text-white w-full"
                              onClick={resetFilters}
                            >
                              Reset
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:w-3/4">
            <div className="relative">
              <FiSearch className="absolute left-4 top-3 w-6 h-6 text-gray-500" />
              {searchQuery && (
                <FiXCircle
                  className="absolute right-4 top-2 w-6 h-6 text-gray-500 cursor-pointer"
                  onClick={() => setSearchQuery("")}
                />
              )}
              <input
                type="text"
                placeholder="Which Book or Author interests you today?"
                className="p-3 bg-transparent border-2 shadow-sm rounded-3xl w-full mb-4 text-black pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 pt-8 pb-6">
          {currentBooks.map((book) => {
            const author = getAuthorById(book.author);
            return (
              <div
                key={book.id}
                className="p-4 mb-4 hover:shadow-md border-2 border-[#ffffff00] hover:border-[#BABABA] rounded-md"
              >
                <Link
                  href={`./books/${book.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <BooksCards
                    title={book.title}
                    coverImage={book.book_image}
                    bookPrice= {`₹${book.price}`} 
                    authorName={book.author? book.author : "No Author"}
                  />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="w-full flex-wrap md:flex justify-center md:justify-between pt-6">
          <div className="flex justify-center md:justify-between">
            <i><p>
              Showing {indexOfFirstBook + 1} -{" "}
              {Math.min(indexOfLastBook, filteredBooks.length)} of{" "}
              {filteredBooks.length} total
            </p></i>
          </div>

          <div className="flex justify-center gap-2 items-center">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`p-2 mx-2 flex items-center ${
                currentPage === 1
                  ? "cursor-not-allowed text-[#241b6d]"
                  : "hover:rounded-md text-[#241b6d] hover:text-[#241b6d]"
              }`}
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`p-1 px-3 border rounded-full ${
                  currentPage === i + 1
                    ? "bg-[#8A8A8A66] text-black"
                    : "bg-white hover:bg-[#241b6d] hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`p-2 mx-2 flex items-center ${
                currentPage === totalPages
                  ? "cursor-not-allowed text-[#241b6d]"
                  : "hover:rounded-md text-[#241b6d] hover:text-[#241b6d]"
              }`}
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </main>
    )}
    </>
  );
}

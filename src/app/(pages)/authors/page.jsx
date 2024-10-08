"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AuthorsCards from "./authorsCards";
import { AuthorsList } from "@/app/API/allAuthorList";
import { FiChevronLeft, FiChevronRight, FiSearch, FiXCircle } from "react-icons/fi";
import AlphabetFilter from "@/app/components/AlphabetFilter";
import slugify from 'slugify';
import Loader from "@/app/components/Loader";


export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State for search
  const [alphabetFilter, setAlphabetFilter] = useState("ALL"); // State for alphabetic filter
  const authorsPerPage = 18;

  // Sort authors in ascending order by author_name
  const sortedAuthorsList = AuthorsList.sort((a, b) => {
    const nameA = a.author_name.toLowerCase();
    const nameB = b.author_name.toLowerCase();
    return nameA.localeCompare(nameB); // Sort in ascending order
  });

  // Filter authors by search query and alphabetic filter
  const filteredAuthors = sortedAuthorsList.filter((author) => {
    const authorName = author.author_name || "Unknown Author"; // Handle undefined author names

    const matchesSearchQuery = authorName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesAlphabet =
      alphabetFilter === "ALL" ||
      (authorName && authorName[0].toUpperCase()) === alphabetFilter;

    return matchesSearchQuery && matchesAlphabet;
  });

  const totalPages = Math.ceil(filteredAuthors.length / authorsPerPage);
  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = filteredAuthors.slice(indexOfFirstAuthor, indexOfLastAuthor);

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
          <h1 className="text-[42px]">All Authors</h1>
        </div>

        <div className="w-full flex justify-between items-center pt-6 pb-2">
          <div className="w-full">
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

        <div className="w-full pt-2">
          {/* Alphabet Filter */}
          <AlphabetFilter onFilter={setAlphabetFilter} />
        </div>

        {/* Authors Grid */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-6 pb-6">
          {currentAuthors.map((author, i) => (
            <div className="bg-transparent" key={i}>
              <Link href={`/authors/${slugify(author.author_name || 'unknown-author', { lower: true })}`}>
                <AuthorsCards
                  coverImage={author.image}
                  authorName={author.author_name || 'Unknown Author'}
                />
              </Link>
              
            </div>
          ))}
        </div> */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-6">
        {currentAuthors.map((author, i) => (
          <div key={i} className="p-4 hover:shadow-md border-2 border-[#ffffff00] hover:border-[#BABABA] rounded-md">
            {/* <Link href={`/authors/${slugify(author.author_name || 'unknown-author', { lower: true })}`}>
              <AuthorsCards
                coverImage={author.image}
                authorName={author.author_name || 'Unknown Author'}
              />
            </Link> */}
            <Link href={`/authors/${author.authslug}`}>
              <AuthorsCards
                coverImage={author.image}
                authorName={author.author_name || 'Unknown Author'}
              />
            </Link>
            
          </div>
        ))}
      </div>

        <div className="w-full flex-wrap md:flex justify-center md:justify-between mt-10">
          <div className="flex justify-center md:justify-between">
            <i><p>
              Showing {indexOfFirstAuthor + 1} -{" "}
              {Math.min(indexOfLastAuthor, filteredAuthors.length)} of{" "}
              {filteredAuthors.length} total
            </p></i>
          </div>

          <div className="flex justify-center gap-2 items-center">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`p-2 mx-2 flex items-center ${currentPage === 1
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
                className={`p-1 px-3 border rounded-full ${currentPage === i + 1
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
              className={`p-2 mx-2 flex items-center ${currentPage === totalPages
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

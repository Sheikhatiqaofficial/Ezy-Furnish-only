
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Topnav = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State for search bar visibility
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query

  // Toggle the visibility of the search input
  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  // Properly type the event as ChangeEvent<HTMLInputElement>
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle the search when the user presses "Enter" or clicks the button
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      // Redirect to the products page with the search query
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <nav className="relative w-full bg-white p-2">
      {/* Section 1 */}
      <div className="relative flex items-center justify-between">
        {/* Magnifying Glass Icon */}
        <div
          className="absolute left-7 top-6 cursor-pointer hover:stroke-gray-400"
          onClick={toggleSearchBar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="stroke-[#2A254B] hover:stroke-gray-400 transition-all duration-200"
          >
            <circle cx="10" cy="10" r="7" strokeWidth="2" />
            <line x1="16" y1="16" x2="22" y2="22" strokeWidth="2" />
          </svg>
        </div>

        {/* Search Bar */}
        {isSearchVisible && (
          <div className="absolute left-16 top-3 flex">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none"
              onBlur={() => setIsSearchVisible(false)} // Hide the search bar when focus is lost
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearchSubmit(); // Trigger search on pressing "Enter"
              }}
            />
            <button
              onClick={handleSearchSubmit}
              className="ml-2 px-4 py-2 bg-[#2A254B] text-white rounded-lg"
            >
              Search
            </button>
          </div>
        )}

        {/* Ezy Furnish Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-5 opacity-9">
          <Link href={"/"}>
            <h1
              className="font-clash-display text-[#22202E] text-3xl font-normal leading-[29.52px] text-left"
              style={{ fontFamily: "Clash Display" }}
            >
              Ezy Furnish
            </h1>
          </Link>
        </div>

        {/* Cart Icon */}
        <Link href={"/cart"}>
          <div className="absolute right-20 top-6 cursor-pointer hover:opacity-50 transition-all duration-200">
            <Image
              src="/cart.svg"
              alt="Shopping Cart"
              width={20}
              height={20}
            />
          </div>
        </Link>

        {/* User Avatar Icon */}
        <div className="absolute right-10 top-6 cursor-pointer hover:opacity-50 transition-all duration-200">
          <Link href={"/user"}>
          <Image
            src="/user.svg"
            alt="User Avatar"
            width={20}
            height={20}
          />
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] border-t border-[#0000001A] opacity-1 mt-16"></div>

      {/* Section 2 Links */}
      <div className="flex flex-wrap justify-center items-center mt-6 space-x-[44px] sm:flex hidden">
        <a
          href={"/products"}
          className="w-[81px] h-[22px] text-[#726E8D] font-satoshi text-[16px] font-normal leading-[21.6px] hover:text-[#2A254B] hover:underline hover:underline-offset-4 hover:text-shadow-md transition-all duration-300"
          style={{ fontFamily: "Satoshi" }}
        >
          All Products
        </a>

        <a
          href="#"
          className="w-[66px] h-[22px] text-[#726E8D] font-satoshi text-[16px] font-normal leading-[21.6px] hover:text-[#2A254B] hover:underline hover:underline-offset-4 hover:text-shadow-md transition-all duration-300"
          style={{ fontFamily: "Satoshi" }}
        >
          Ceramics
        </a>

        <a
          href="#"
          className="w-[44px] h-[22px] text-[#726E8D] font-satoshi text-[16px] font-normal leading-[21.6px] hover:text-[#2A254B] hover:underline hover:underline-offset-4 hover:text-shadow-md transition-all duration-300"
          style={{ fontFamily: "Satoshi" }}
        >
          Tables
        </a>

        <a
          href="#"
          className="w-[45px] h-[22px] text-[#726E8D] font-satoshi text-[16px] font-normal leading-[21.6px] hover:text-[#2A254B] hover:underline hover:underline-offset-4 hover:text-shadow-md transition-all duration-300"
          style={{ fontFamily: "Satoshi" }}
        >
          Chairs
        </a>

        <a
          href="#"
          className="w-[64px] h-[22px] text-[#726E8D] font-satoshi text-[16px] font-normal leading-[21.6px] hover:text-[#2A254B] hover:underline hover:underline-offset-4 hover:text-shadow-md transition-all duration-300"
          style={{ fontFamily: "Satoshi" }}
        >
          Crockery
        </a>

        <a
          href="#"
          className="w-[71px] h-[22px] text-[#726E8D] font-satoshi text-[16px] font-normal leading-[21.6px] hover:text-[#2A254B] hover:underline hover:underline-offset-4 hover:text-shadow-md transition-all duration-300"
          style={{ fontFamily: "Satoshi" }}
        >
          Tableware
        </a>

        <a
          href="#"
          className="w-[51px] h-[22px] text-[#726E8D] font-satoshi text-[16px] font-normal leading-[21.6px] hover:text-[#2A254B] hover:underline hover:underline-offset-4 hover:text-shadow-md transition-all duration-300"
          style={{ fontFamily: "Satoshi" }}
        >
          Cutlery
        </a>
      </div>
    </nav>
  );
};

export default Topnav;

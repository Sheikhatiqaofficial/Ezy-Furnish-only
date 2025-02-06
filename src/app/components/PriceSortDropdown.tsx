// src/app/components/PriceSortDropdown.tsx

import React from "react";

interface PriceSortDropdownProps {
  onPriceSort: (order: string) => void; // Function to handle price sort
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PriceSortDropdown: React.FC<PriceSortDropdownProps> = ({
  onPriceSort,
  isDropdownOpen,
  setIsDropdownOpen,
}) => {
  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 cursor-pointer hover:stroke-gray-400"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <h1 className="font-normal">Price</h1>
      </div>

      {isDropdownOpen && (
        <div className="absolute bg-white shadow-lg p-4 mt-2 rounded-lg w-full md:w-auto z-10">
          <div
            onClick={() => onPriceSort("lowToHigh")}
            className="cursor-pointer hover:text-gray-500 py-2"
          >
            Low to High
          </div>
          <div
            onClick={() => onPriceSort("highToLow")}
            className="cursor-pointer hover:text-gray-500 py-2"
          >
            High to Low
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceSortDropdown;

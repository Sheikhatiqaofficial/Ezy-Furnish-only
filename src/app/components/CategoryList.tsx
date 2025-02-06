
// src/app/components/CategoryList.tsx
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";

interface Category {
  name: string;
  slug: { current: string };
}

interface CategoryListProps {
  categories: Category[];
  onCategorySelect: (category: Category) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onCategorySelect }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-3 md:px-20 p-3 md:text-base sm:text-sm text-xs">
      <div className="flex flex-wrap gap-8 items-center justify-center md:justify-start w-full">
        <div className="flex items-center gap-2 cursor-pointer hover:stroke-gray-400">
          <h1 className="font-normal">Category</h1>
          <IoMdArrowDropdown />
        </div>
        {categories.map((category) => (
          <div
            key={category.slug.current}
            onClick={() => onCategorySelect(category)}
            className="cursor-pointer hover:text-gray-500"
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;

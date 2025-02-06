
import React, { useState, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { client } from "../../../scripts/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { Products } from "../../../types";
import Image from "next/image";

const builder = imageUrlBuilder(client);

function urlFor(source: Products) {
  // Check if the image is present, if not, return a default image URL
  if (source.image) {
    return builder.image(source.image).width(305).height(375).url();
  }
  return '/images/default.jpg'; // Default image URL in case no image is provided
}

interface Category {
  name: string;
  slug: { current: string };
}

const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Products[]>([]); // All products for price sort
  const [filteredData, setFilteredData] = useState<Products[]>([]); // Filtered products after search
  const [allProducts, setAllProducts] = useState<Products[]>([]); // Store all products for "You might also like"
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryData = await client.fetch(`*[_type == "category"]{name, slug}`);
      setCategories(categoryData);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    fetchAllProducts(); // Always fetch all products for "You might also like"
  }, []);

  const fetchProductsByCategory = async (categorySlug: string) => {
    const productData = await client.fetch(
      `*[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)]{
        _id, name, slug, price, image
      }`,
      { categorySlug }
    );
    setProducts(productData);
    setFilteredData(productData); // Apply the same data to filtered products when a category is selected
  };

  const fetchAllProducts = async () => {
    const allProductData = await client.fetch(
      `*[_type == "product"]{
        _id, name, slug, price, image
      }`
    );
    setAllProducts(allProductData);
    setProducts(allProductData); // Initially set products with all products
    setFilteredData(allProductData); // Filtered data will initially show all products
  };

  const handleCategorySelect = (category: Category) => {
    fetchProductsByCategory(category.slug.current);
    setIsDropdownOpen(false);
  };

  const handlePriceSort = (order: string) => {
    const sortedProducts = [...filteredData]; // Use `const` as sortedProducts doesn't get reassigned

    if (order === "lowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price); // Sort low to high
    } else if (order === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price); // Sort high to low
    }

    setFilteredData(sortedProducts); // Update filteredData based on sorting
    setIsPriceDropdownOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);

    // Filter products by name or tags
    const filteredProducts = products.filter((product) => {
      const productTags = product.tags || []; // Ensure tags is always an array

      return (
        product.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        productTags.some((tag) =>
          tag.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    });

    setFilteredData(filteredProducts); // Set filtered products
  };

  return (
    <div>
      {/* Dropdown for category selection */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-3 md:px-20 p-3 md:text-base sm:text-sm text-xs">
        <div className="flex flex-wrap gap-8 items-center justify-center md:justify-start w-full">
          <div
            className="flex items-center gap-2 cursor-pointer hover:stroke-gray-400 relative"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <h1 className="font-normal">Category</h1>
            <IoMdArrowDropdown />
          </div>
          {isDropdownOpen && (
            <div className="absolute bg-white shadow-lg p-4 mt-60 rounded-lg w-full md:w-auto z-10">
              {categories.map((category) => (
                <div
                  key={category.slug.current}
                  onClick={() => handleCategorySelect(category)}
                  className="cursor-pointer hover:text-gray-500 py-2"
                >
                  {category.name}
                </div>
              ))}
            </div>
          )}

          {/* Price Sort Dropdown */}
          <div
            className="flex items-center gap-2 cursor-pointer hover:stroke-gray-400 relative"
            onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
          >
            <h1 className="font-normal">Price</h1>
            <IoMdArrowDropdown />
          </div>
          {isPriceDropdownOpen && (
            <div className="absolute bg-white shadow-lg p-4 mt-60 rounded-lg w-full md:w-auto z-10 mb-[100px] ml-[95px]">
              <div
                onClick={() => handlePriceSort("lowToHigh")}
                className="cursor-pointer hover:text-gray-500 py-2"
              >
                Low to High
              </div>
              <div
                onClick={() => handlePriceSort("highToLow")}
                className="cursor-pointer hover:text-gray-500 py-2"
              >
                High to Low
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mt-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name or tags..."
          className="w-full max-w-lg px-4 py-2 text-sm border rounded-md"
        />
      </div>

      {/* Render products based on selected category or search */}
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[16px] sm:gap-[24px] mt-4 mx-[20px] sm:mx-[70px]">
          {filteredData.length === 0 ? (
            <p>No products available</p>
          ) : (
            filteredData.map((product) => (
              <div
                key={product._id}
                className="w-full h-[462px] transform transition-transform hover:translate-y-[-10px]"
              >
                <div className="w-full h-[375px]">
                  <a href={`/products/${product.slug.current}`}>
                    <Image
                      src={urlFor(product)} // Use the updated urlFor function
                      alt={product.name}
                      className="w-full h-full opacity-1 cursor-pointer"
                      width={305}
                      height={375}
                    />
                  </a>
                </div>
                <h4 className="text-[#2A254B] text-[20px] font-normal mt-[12px]">{product.name}</h4>
                <p className="text-[#2A254B] text-[18px] font-normal mt-[15px]">£{product.price}</p>
              </div>
            ))
          )}
        </div>

        {/* "You Might Also Like" Section */}
        {(products.length > 0 || searchTerm) && (
          <div>
            <h3 className="text-3xl font-semibold mt-18 mb-9 text-center">You might also like</h3>

            {/* Display all products in a similar grid layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[16px] sm:gap-[24px] mx-[20px] sm:mx-[70px]">
              {allProducts.map((product) => (
                <div key={product._id} className="w-full h-[462px] transform transition-transform hover:translate-y-[-10px]">
                  <div className="w-full h-[375px]">
                    <a href={`/products/${product.slug.current}`}>
                      <Image
                        src={urlFor(product)} // Use the updated urlFor function
                        alt={product.name}
                        className="w-full h-full opacity-1 cursor-pointer"
                        width={305}
                        height={375}
                      />
                    </a>
                  </div>
                  <h4 className="text-[#2A254B] text-[20px] font-normal mt-[12px]">{product.name}</h4>
                  <p className="text-[#2A254B] text-[18px] font-normal mt-[15px]">£{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;

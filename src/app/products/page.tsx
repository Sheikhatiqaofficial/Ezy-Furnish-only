
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../../scripts/sanityClient";
import imageUrlBuilder from '@sanity/image-url';
import Topnav from "../components/Topnav";
import Category from "../components/Category";

type Product = {
  _id: string;
  name: string;
  image: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  price: number;
  tags: string[];
};

const builder = imageUrlBuilder(client);

// Function to generate image URL
function urlFor(source: Product) {
  return builder.image(source.image).width(305).height(375).url(); // Adjust image dimensions as needed
}

const ProductsPage = () => {
  // const [setData] = useState<Product[]>([]); // Properly typed state for the product data
  const [filteredData, setFilteredData] = useState<Product[]>([]); // Filtered products based on search
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  const query = `*[_type == "product"]{
    _id,
    name,
    image,
    slug,
    price,
    tags,
  }`;

  useEffect(() => {
    // Fetch products on component mount
    const getProductData = async () => {
      setLoading(true); // Start loading
      setError(null); // Reset previous errors
      try {
        const products = await client.fetch(query);
        if (products.length === 0) {
          setError("Something went wrong, please try again later");
        } else {
           // Set all products
          setFilteredData(products); // Initially show all products
        }
      } catch {
        setError("Error fetching products, please try again later");
      }
      setLoading(false); // Finished loading
    };

    getProductData();
  }, [query]);

  return (
    <>
      <Topnav />
      <div className="w-full">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            <div className="w-full">
              <Image
                src="/bgframe.png"
                alt="bgframe"
                width={1440}
                height={209}
                className="w-full object-cover"
              ></Image>
            </div>

            <Category />

            {/* Product Images */}
            <div className="flex flex-wrap justify-between gap-[16px] sm:gap-[24px] mt-[52px] mx-[20px] sm:mx-[70px] lg:gap-[0px]">
              {filteredData.length > 0 ? (
                filteredData.map((product) => (
                  <div
                    key={product._id}
                    className="w-full sm:w-[305px] h-[462px] transform transition-transform hover:translate-y-[-10px]"
                  >
                    <Link href={`/products/${product.slug.current}`}>
                    <div className="w-full h-[375px]">
                      {/* Link to Product Detail Page */}
                     
                        <Image
                          src={urlFor(product).toString()} // Use the URL builder for the image
                          alt={product.name}
                          width={305}
                          height={375}
                          className="w-full h-full opacity-1 cursor-pointer"
                        ></Image>
                      
                    </div>
                    <h4 className="text-[#2A254B] text-[20px] font-normal mt-[12px]">
                      {product.name}
                    </h4>
                    <p className="text-[#2A254B] text-[18px] font-normal mt-[15px]">
                      £{product.price}
                    </p>
                    </Link>
                  </div>
                ))
              ) : (
                <p>No products found matching your search.</p>
              )}
            </div>

            {/* View Collection Button */}
            <Link href="/link">
              <button className="w-full lg:w-[170px] h-[56px] bg-[#F9F9F9] text-[#2A254B] text-[16px] font-normal leading-[24px] transition-all hover:bg-[#2A254B] hover:text-white flex justify-center items-center transition-all mt-[30px] lg:ml-[709px] mb-[5px]">
                View Collection
              </button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default ProductsPage;

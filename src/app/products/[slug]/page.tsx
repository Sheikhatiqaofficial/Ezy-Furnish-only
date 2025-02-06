"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { client } from "../../../../scripts/sanityClient";
import imageUrlBuilder from '@sanity/image-url';
import Topnav from "../../components/Topnav";
import Banner from "@/app/components/Banner";
import CeramicAbout from "@/app/components/CeramicAbout";
import Feature from "@/app/components/Feature";
import Signup from "@/app/components/Signup";
import Swal from "sweetalert2";
import { addToCart } from "@/app/button/button";
import { Products } from "../../../../types";
export type Category = {
  _id: string;
  name: string;
};

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
  description: string;
  tags: string[];
  features: string[];
  dimensions: {
    height: string;
    width: string;
    depth: string;
  };
  quantity: number;
  category: Category; // Add this
};

const builder = imageUrlBuilder(client);

// Function to generate image URL
function urlFor(source: Product) {
  return builder.image(source.image).width(700).height(700).url();
}

const SingleProductPage = () => {
  const pathname = usePathname();
  const slug = pathname?.split("/")[2]; // Extract slug from pathname

  const [product, setProduct] = useState<Product | null>(null); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
   const [quantity, setQuantity] = useState(1); // Quantity state for the cart

  useEffect(() => {
    if (!slug) {
      setError("Slug is not available");
      setLoading(false);
      return;
    }

    const getSingleProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const productData = await client.fetch(
          `*[_type == "product" && slug.current == $slug][0]{
            _id,
            name,
            image,
            slug,
            price,
            description,
            tags,
            features,
            dimensions
          }`,
          { slug }
        );

        if (!productData) {
          setError("Product not found");
        } else {
          setProduct(productData);
        }
      } catch {
        setError("Error fetching product details, please try again later");
      } finally {
        setLoading(false);
      }
    };

    getSingleProduct();
  }, [slug]);

  const handleQuantityChange = (action: 'increment' | 'decrement') => {
    setQuantity((prevQuantity) =>
      action === 'increment' ? prevQuantity + 1 : prevQuantity > 1 ? prevQuantity - 1 : 1
    );
  };


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>No product found</div>;

  const handleAddToCart = (e: React.MouseEvent, product:Products) => {
    e.preventDefault();
    addToCart(product, quantity)
    Swal.fire({
      icon: "success",
      title: `${product?.name} is now in the cart! ✅`,
      showConfirmButton: false,
      timer: 10000,
    });
   
  };
  return (
    <>
    <Banner />
    <Topnav />
    <div className="w-full h-auto md:h-[759px] px-[55px] opacity-1 bg-white flex flex-col md:flex-row mt-[65px] mb-[50px] sm:mb-[80px]">
      {/* Left Image Section (Completely Unchanged) */}
      <div>
        <Image
          src={urlFor(product).toString()}
          alt={product.name}
          width={900}
          height={900}
        />
      </div>
  
      {/* Right Section */}
      <div className="relative w-full md:w-[50%] h-auto flex flex-col gap-13 opacity-1 md:pl-[30px] sm:px-[20px]">
        {/* Heading */}
        <div className="w-full h-auto md:w-[281px] h-[89px] mt-[30px] md:mt-[70px] gap-[13px] opacity-1 ml-[25px]">
          <h1 className="w-full text-[#2A254B] text-[36px] font-normal leading-[44.28px] text-left opacity-1 md:ml-[60px]">
            {product.name}
          </h1>
          <div className="w-full text-[#2A254B] text-[24px] font-normal leading-[32.4px] text-left opacity-1 md:ml-[60px]">
            £{product.price}
          </div>
        </div>
  
        {/* Description Section */}
        <div className="w-full md:w-[602px] h-auto md:h-[251px] mt-[30px] px-[10px] md:px-[100px] py-[40px] gap-[16px] opacity-1">
          <div className="w-full md:w-[522px] h-auto gap-[16px] opacity-1">
            <h2 className="font-clash-display text-[19px] text-[#2A254B]">Description</h2>
            <p className="font-satoshi text-[16px] text-[#2A254B] mt-[25px]">{product.description}</p>
            <ul className="font-satoshi text-[16px] text-[#2A254B] mt-[25px] px-[20px] md:px-0">
              {product.features && Array.isArray(product.features) && product.features.length > 0 ? (
                product.features.map((feature, index) => (
                  <li key={index}> ◼️ {feature}</li>
                ))
              ) : (
                <>
                  <li> ◼️ Premium material</li>
                  <li> ◼️ Handmade upholstery</li>
                  <li> ◼️ Quality timeless classic</li>
                </>
              )}
            </ul>
          </div>
        </div>
  
        {/* Dimensions Section */}
        <div className="w-full md:w-[241px] h-auto md:h-[99px] mt-[25px] md:mt-[70px] gap-[28px] opacity-1 ml-[45px]">
          <h3 className="text-[#2A254B] font-clash-display text-[18px]">Dimensions</h3>
          <div className="flex flex-row justify-between gap-[20px] opacity-1 mt-[25px]">
            <div className="w-[30%] h-[51px]">
              <p className="w-[43px] h-[17px] font-clash-display text-[14px] text-[#2A254B]">Height</p>
              <p className="w-[44px] h-[22px] font-satoshi text-[16px] text-[#2A254B] mt-3">
                {product.dimensions?.height || '110cm'}
              </p>
            </div>
            <div className="w-[30%] h-[51px]">
              <p className="w-[43px] h-[17px] font-clash-display text-[14px] text-[#2A254B]">Width</p>
              <p className="w-[44px] h-[22px] font-satoshi text-[16px] text-[#2A254B] mt-3">
                {product.dimensions?.width || '75cm'}
              </p>
            </div>
            <div className="w-[30%] h-[51px]">
              <p className="w-[43px] h-[17px] font-clash-display text-[14px] text-[#2A254B]">Depth</p>
              <p className="w-[44px] h-[22px] font-satoshi text-[16px] text-[#2A254B] mt-3">
                {product.dimensions?.depth || '50cm'}
              </p>
            </div>
          </div>
        </div>
  
        {/* Add to Cart Section */}
        <div className="w-full md:w-[602px] h-auto mt-[50px] md:mt-[70px] px-[20px] md:px-[105px] py-[32px] opacity-1">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="w-full md:w-[209px] h-auto flex gap-[22px] opacity-1">
              <div className="w-[65px] h-[20px] font-clash-display text-[18px] text-[#2A254B] mt-[8px]">Amount</div>
              <div className="w-[122px] h-[46px] flex justify-between items-center px-[16px] bg-[#F9F9F9]">
                <button
                  className="text-[black] text-[16px]"
                  onClick={() => handleQuantityChange('decrement')}
                >
                  -
                </button>
                <span className="text-[#2A254B] text-[16px]">{quantity}</span>
                <button
                  className="text-[black] text-[16px]"
                  onClick={() => handleQuantityChange('increment')}
                >
                  +
                </button>
              </div>
            </div>
  
            <button
              className="w-full md:w-[143px] h-[56px] bg-[#2A254B] text-white text-[16px] font-medium leading-[24px] opacity-1 mt-[20px] md:mt-0 hover:bg-[#F9F9F9] hover:text-[#2A254B] transform hover:scale-105 transition-all duration-300"
              onClick={(e)=> handleAddToCart(e, product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  
    <CeramicAbout />
    <Feature />
    <Signup />
  </>
  );
};

export default SingleProductPage;

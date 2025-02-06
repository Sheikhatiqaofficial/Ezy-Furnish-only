import React from "react";
import Image from "next/image";
import Link from "next/link";

const Popular = () => {
  return (
    <div className="w-full bg-white opacity-1 sm:ml-0 lg:ml-[50px] sm:mt-[80px] lg:mt-[100px]">
      {/* Heading Section */}
      <div className="w-full h-[39px] mt-[80px] mx-auto text-center sm:text-left opacity-1 lg:text-left">
        <h3 className="text-[#2A254B] text-[35px] font-normal leading-[39.36px] sm:text-left">
          Our popular products
        </h3>
      </div>

      {/* Image Grid */}
      <div className="flex flex-col sm:flex-row justify-between gap-[16px] sm:gap-[24px] mt-[59px] mx-[20px] sm:mx-[70px] lg:mx-[70px] lg:gap-[1px] lg:ml-[50px]">
        {/* Image 1 */}
        <div className="w-full sm:w-[630px] h-[375px] opacity-1 hidden md:block transform transition-transform hover:translate-y-[-10px] cursor-pointer">
          <div className="w-[630px] h-[375px] opacity-1">
           <Link href={"/products/the-poplar-suede-sofa"}> <Image
              src="/Large.jpg"
              alt="The Popular suede sofa"
              width={630}
              height={375}
              className="w-full h-full opacity-1"
            /></Link>
          </div>
          {/* Image Details */}
          <div className="w-[202px] h-[63px] gap-[8px] opacity-1 mt-[16px]">
            <h4 className="text-[#2A254B] text-[19px] font-normal leading-[28px] mt-[16px]">
              The Popular suede sofa
            </h4>
            <p className="text-[#2A254B] text-[18px] font-normal leading-[27px] mt-[8px]">
              £980
            </p>
          </div>
        </div>

        {/* Image 2 */}
        <div className="w-full sm:w-[305px] h-[462px] opacity-1 transform transition-transform hover:translate-y-[-10px] cursor-pointer">
          <div className="w-full h-[375px] opacity-1">
          <Link href={"/products/the-dandy-chair"}> <Image
              src="/chair.jpg"
              alt="Rustic Vase Set"
              width={305}
              height={375}
              className="w-full h-full opacity-1"
            /></Link>
          </div>
          {/* Image Details */}
          <div className="w-[154px] h-[63px] gap-[8px] opacity-1 mt-[16px]">
            <h4 className="text-[#2A254B] text-[20px] font-normal leading-[28px] mt-[16px]">
              The Dandy Chair
            </h4>
            <p className="text-[#2A254B] text-[18px] font-normal leading-[27px] mt-[8px]">
              £250
            </p>
          </div>
        </div>

        {/* Image 3 */}
        <div className="w-full sm:w-[305px] h-[462px] opacity-1 transform transition-transform hover:translate-y-[-10px] cursor-pointer">
          <div className="w-full h-[375px] opacity-1">
          <Link href={"/products/the-dandy-chair"}>  <Image
              src="/chair2.jpg"
              alt="Rustic Vase Set"
              width={305}
              height={375}
              className="w-full h-full opacity-1"
            /></Link>
          </div>
          {/* Image Details */}
          <div className="w-[154px] h-[63px] gap-[8px] opacity-1 mt-[16px]">
            <h4 className="text-[#2A254B] text-[20px] font-normal leading-[28px] mt-[16px]">
              The Dandy Chair
            </h4>
            <p className="text-[#2A254B] text-[18px] font-normal leading-[27px] mt-[8px]">
              £250
            </p>
          </div>
        </div>
      </div>


    <Link href={"/products"}>  <button className="w-full lg:w-[170px] h-[56px] bg-[#F9F9F9] text-[#2A254B] text-[16px] font-normal leading-[24px] transition-all hover:bg-[#2A254B] hover:text-white flex justify-center items-center transition-all mt-[20px] lg:ml-[709px]">
        View Collection

      </button></Link>


    </div>
  );
};

export default Popular;

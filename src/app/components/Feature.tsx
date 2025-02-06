import React from "react";
import Image from "next/image";

const Feature = () => {
  return (
    <div className="w-full bg-white opacity-1 relative sm:ml-3 lg:ml-[75px] mb-[50px]">
      {/* Top Line Text */}
      <div className="w-full h-[94px] mt-[65px] mx-auto text-center sm:text-left opacity-1">
        <h3 className="text-[#2A254B] text-[30px] font-normal leading-[33.6px] text-left sm:text-left lg:text-center lg:ml-0 sm:ml-[20px]">
          What makes our brand different
        </h3>
      </div>


      {/* Cards Row */}
      <div className="flex flex-col sm:flex-row gap-[24px] mt-[30px] mx-[20px] sm:mx-[70px] lg:gap-[120px] lg:mx-[70px]">
        {/* Feature Card 1 */}
        <div className="w-full sm:w-[270px] h-[124px] transform transition-transform hover:translate-y-[-10px] cursor-pointer">
          <div className="w-[24px] h-[24px] p-[4.5px 1.5px 3px 1.5px]">
            <Image
              src="/truck.jpg"
              alt="Truck Icon"
              width={21}
              height={16.5}
              className="opacity-1"
            />
          </div>
          <h4 className="text-[#2A254B] text-[20px] font-normal mt-[15px]">
            Next day as standard
          </h4>
          <p className="text-[#2A254B] text-[16px] font-normal mt-[12px]">
            Order before 3pm and get your order the next day as standard
          </p>
        </div>

        {/* Feature Card 2 */}
        <div className="w-full sm:w-[266px] h-[124px] transform transition-transform hover:translate-y-[-10px] cursor-pointer">
          <div className="w-[24px] h-[24px] p-[1.5px]">
            <Image
              src="/check.jpg"
              alt="Check Icon"
              width={21}
              height={21}
              className="opacity-1"
            />
          </div>
          <h4 className="text-[#2A254B] text-[20px] font-normal mt-[15px]">
            Made by true artisans
          </h4>
          <p className="text-[#2A254B] text-[16px] font-normal mt-[12px]">
            Handmade crafted goods made with real passion and craftsmanship
          </p>
        </div>

        {/* Feature Card 3 */}
        <div className="w-full sm:w-[235px] h-[124px] transform transition-transform hover:translate-y-[-10px] cursor-pointer">
          <div className="w-[24px] h-[24px] p-[4.5px 1.5px 4.5px 1.5px]">
            <Image
              src="/shop.jpg"
              alt="Purchase Icon"
              width={21}
              height={15}
              className="opacity-1"
            />
          </div>
          <h4 className="text-[#2A254B] text-[20px] font-normal mt-[15px]">
            Unbeatable prices
          </h4>
          <p className="text-[#2A254B] text-[16px] font-normal mt-[12px]">
            For our materials and quality, you wont find better prices anywhere
          </p>
        </div>

        {/* Feature Card 4 */}
        <div className="w-full sm:w-[265px] h-[124px] transform transition-transform hover:translate-y-[-10px] cursor-pointer">
          <div className="w-[24px] h-[24px] p-[1.5px 3px 1.08px 4.5px]">
            <Image
              src="/sprout.jpg"
              alt="Sprout Icon"
              width={16.5}
              height={21.42}
              className="opacity-1"
            />
          </div>
          <h4 className="text-[#2A254B] text-[20px] font-normal mt-[15px]">
            Recycled packaging
          </h4>
          <p className="text-[#2A254B] text-[16px] font-normal mt-[12px]">
            We use 100% recycled packaging to ensure our footprint is manageable
          </p>
        </div>
      </div>

    </div>
  );
};

export default Feature;
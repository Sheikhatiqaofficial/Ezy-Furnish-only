import React from "react";
import Link from "next/link";
import Image from "next/image";

const Intro = () => {
  return (
    <div>
      <section className="relative w-full h-auto px-4 sm:px-[32px] md:px-[64px] lg:px-[80px] py-[40px] sm:py-[50px] md:py-[60px] bg-white mb-[50px] mt-[30px]">
        {/* Container with Flex Layout */}
        <div className="flex flex-col md:flex-row items-center justify-between md:space-x-4">
          {/* Left Section (Text Box) */}
          <div className="relative sm:w-full md:w-[634px] h-auto md:h-[478px] p-[24px] sm:p-[32px] md:p-[64px] bg-[#2A254B] mb-4 md:mb-0">
            {/* Text Container */}
            <div className="w-full h-auto mb-[12px]">
              <h2 className="font-clash-display text-[24px] sm:text-[28px] md:text-[32px] font-normal leading-[32px] sm:leading-[36px] md:leading-[39.36px] text-[#FFFFFF] mb-[20px]">
                It started with a small idea
              </h2>
              <p className="font-satoshi text-[16px] sm:text-[18px] md:text-[18px] font-normal leading-[24px] sm:leading-[24.3px] md:leading-[24.3px] text-[#FFFFFF]">
                A global brand with local beginnings, our story began in a small studio in South London in early 2014.
              </p>
            </div>

            {/* Button */}
            <div className="flex justify-center md:justify-start mt-[30px] sm:mt-[40px] md:mt-[50px]">
              <Link href="/products">
                <button className="bg-[#F9F9F926] text-white text-[14px] sm:text-[16px] font-medium py-[16px] sm:py-[18px] px-[16px] sm:px-[20px] w-full md:w-[200px] h-[56px] md:h-[66px] hover:bg-[#F9F9F950]">
                  View collection
                </button>
              </Link>
            </div>
          </div>

          {/* Right Section (Image) */}
          <div className="relative w-full md:w-[630px] h-auto sm:h-[250px] md:h-[478px] mt-4 md:mt-0">
            <Image
              src="/sofa.jpg"
              alt="Sofa"
              width={630}
              height={478}
              className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Intro;

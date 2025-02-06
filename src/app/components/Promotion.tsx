import React from "react";
import Image from "next/image";
import Link from "next/link";

const Promotion = () => {
  return (
    <div className="relative flex flex-col lg:flex-row items-center justify-between w-full h-auto opacity-1 mt-[50px] lg:mt-[20px]">
      {/* Left Content Section */}
      <div className="relative w-full lg:w-[720px] h-auto p-[20px_30px_54px_30px] lg:p-[72px_100px_54px_84px] gap-0 opacity-1 text-white">

        {/* Top Content (Text Section) */}
        <div className="w-full lg:w-[536px] h-auto opacity-1 mb-[20px] lg:mb-0">
          {/* Upper Text (Heading) */}
          <p className="w-full text-[#2A254B] text-2xl font-normal leading-[33.6px] text-left">
            From a studio in London to a global brand with over 400 outlets
          </p>

          {/* Paragraph Text */}
          <p className="w-full text-[#505977] text-lg font-normal leading-[25px] text-left mt-[35px]">
            When we started Avion, the idea was simple. Make high quality furniture affordable and available for the mass market. <br />
            <span><br />
              Handmade, and lovingly crafted furniture and homeware is what we live, breathe and design so our Chelsea boutique
              became the hotbed for the London interior design community.
            </span>
          </p>
        </div>

        {/* Button Section */}
        <Link href={"/products"}><div className="w-full sm:w-[170px] h-[56px] mt-[52px] mx-auto bg-[#F9F9F9] text-center opacity-1 sm:w-[100%] sm:h-[56px] lg:w-[170px] lg:mt-[60px]">
          <button className="w-full sm:w-[100%] h-[56px] p-[16px 32px] text-[#2A254B] text-[16px] font-normal leading-[24px] bg-[#F9F9F9] hover:bg-[#2A254B] hover:text-white transition-colors duration-300">
            View Collection
          </button>
        </div></Link>

      </div>

      {/* Right Side Image (Visible on small and large screens, hidden on tablets) */}
      <div className="w-full lg:w-[700px] h-auto opacity-1 mb-[50px] lg:mb-0 mt-[20px] lg:mt-0">
        <Image
          src="/Image.jpg"
          alt="Promotion Image"
          className="w-full h-full object-cover"
          width={720} // Define width of the image
          height={603} // Define height of the image
        />
      </div>
    </div>
  );
};

export default Promotion;

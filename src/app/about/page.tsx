import React from 'react';
import Promotion from '../components/Promotion';
import Feature from '../components/Feature';
import Intro from '../components/Intro';
import Link from 'next/link';
import TopnavAbout from '../components/TopnavAbout';
import Signup from '../components/Signup';
import Banner from '../components/Banner';
const Header = () => {
  return (
    <>
      <Banner />
      <TopnavAbout />
      <section className="relative w-full h-auto px-4 sm:px-[32px] md:px-[64px] lg:px-[128px] py-[40px] sm:py-[60px] md:py-[88px] bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Section (Text) */}
          <div className="w-full md:w-[704px] mb-8 md:mb-0">
            <p className="font-clash-display text-[24px] sm:text-[28px] md:text-[36px] font-normal leading-[32px] sm:leading-[40px] md:leading-[50.4px] text-[#2A254B]">
              A brand built on the love of craftsmanship, quality, and outstanding customer service
            </p>
          </div>

          {/* Right Section (Button) */}
          <div className="w-full sm:w-auto md:w-[192px] flex justify-center items-center">
            <Link href="/products">
              <button className="w-full md:w-[192px] h-[56px] px-[32px] py-[16px] bg-[#F9F9F9] hover:bg-[#2A254B] hover:text-white transition-colors duration-300">
                <span className="font-satoshi text-[14px] sm:text-[16px] font-normal leading-[20px] sm:leading-[24px]">
                  View our products
                </span>
              </button>
            </Link>
          </div>
        </div>
      </section>


      <Intro />
      <Promotion />
      <Feature />
      <Signup />
    </>
  );
}
export default Header;

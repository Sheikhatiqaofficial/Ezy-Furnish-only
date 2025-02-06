import React from 'react';
import Image from 'next/image';

const Banner = () => {
    return (
        <section className="relative w-full h-[41px] px-4 py-2 bg-[#2A254B] opacity-1">
            {/* Left Side (Text Box with Truck Logo) */}
            <div className="absolute top-2 sm:top-2 md:top-3 left-0 right-0 flex justify-center items-center w-full h-[19px] opacity-1 px-4 sm:px-9">
                <div className="flex items-center justify-center">
                    {/* Truck Logo */}
                    <div className="w-[20px] h-[16px] p-[3px 1px 2px 1px] opacity-1">
                        <Image
                            src="/delivery.png"
                            alt="Truck"
                            width={14}
                            height={11}
                            className="top-[3px] left-[1px]"
                        />
                    </div>

                    {/* Text */}
                    <p className="text-[#FFFFFF] text-[11px] font-normal leading-[18.9px] sm:w-auto md:w-[310px] mx-2 text-center">
                        Free delivery on all orders over £50 with code easter checkout
                    </p>
                </div>
            </div>

            {/* Right Side (Cross Icon) */}
            <div className="absolute top-2 right-4 sm:right-8 md:right-8 w-[24px] h-[24px] opacity-1 flex items-center justify-center">
                <Image
                    src="/cross.png"
                    alt="Close"
                    width={12}
                    height={12}
                    className="top-[6px] left-[6px]"
                />
            </div>
        </section>
    );
};

export default Banner;

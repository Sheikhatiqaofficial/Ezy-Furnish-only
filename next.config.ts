import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
    images: {
      domains: ['cdn.sanity.io'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'example.com',  // Replace with your image URL domain
          pathname: '/images/**',  // Allow any image under the /images directory
        },
      ],
   
  }
};

export default nextConfig;

import { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.vivvix.com",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "vxcentral.vivvix.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dev-vxcentral.vivvix.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default config;

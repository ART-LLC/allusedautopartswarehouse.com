import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The image optimizer endpoint (/_next/image) is unavailable in this
    // environment and returns 404, which breaks every <Image>. Serving the
    // original files directly makes images render reliably on all devices.
    unoptimized: true,
  },
  async redirects() {
    // These pages showed sample products with made-up prices and were
    // removed; old links and search results go to the real catalog.
    return [
      { source: "/shop", destination: "/brands", permanent: true },
      { source: "/catalog", destination: "/brands", permanent: true },
      { source: "/comparison", destination: "/brands", permanent: true },
      { source: "/product/:id", destination: "/brands", permanent: true },
      { source: "/products/:id", destination: "/brands", permanent: true },
      // The old /customer portal used a stub login and sample orders.
      { source: "/customer/login", destination: "/sign-in", permanent: true },
      { source: "/customer/dashboard", destination: "/dashboard", permanent: true },
    ];
  },
};

export default nextConfig;

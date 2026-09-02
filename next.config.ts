import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: false,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
};

// next-pwa is a webpack plugin, so it is only applied to production builds
// (which run with `next build --webpack`). Dev keeps the default Turbopack.
export default process.env.NODE_ENV === "development"
  ? nextConfig
  : withPWA(nextConfig);

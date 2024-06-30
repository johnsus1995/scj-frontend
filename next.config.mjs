/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["src"],
  },
  env: {
    // BASE_URL: process.env.BASE_URL,
    // RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    // GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    // GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    // FACEBOOK_CLIENT_ID: process.env.FACEBOOK_CLIENT_ID,
    // FACEBOOK_CLIENT_SECRET: process.env.FACEBOOK_CLIENT_SECRET,
    // AUTH_SECRET: process.env.AUTH_SECRET,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const { images } = require("./images.config");
const nextConfig = {
  reactStrictMode: true,
  i18n,
  images,
};

module.exports = nextConfig;

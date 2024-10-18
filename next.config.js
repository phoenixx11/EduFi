/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true, // Enable strict mode
  i18n, // Add i18n configuration from next-i18next.config.js
};

module.exports = nextConfig;


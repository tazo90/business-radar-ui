/** @type {import('next').NextConfig} */
const withImages = require('next-images');

module.exports = withImages({
  fileExtensions: ["jpg", "jpeg", "png", "gif", "svg"],
  reactStrictMode: true,
  images: {
    disableStaticImages: true
  },
})

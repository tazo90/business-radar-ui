/** @type {import('next').NextConfig} */
const withImages = require('next-images');

module.exports = withImages({
  fileExtensions: ["jpg", "jpeg", "png", "gif", "svg"],
  reactStrictMode: true,
  images: {
    disableStaticImages: true
  },
  webpack: (config) => {
    return {
      ...config,
      entry: async () => {
        const entryConfig = await config.entry()
        return { 
          ...entryConfig, 
          'static/simple-map': './src/widgets/simple-map.tsx',
        }
      },
    }
  },
  async redirects() {
    return [
      {
        source: "/widgets/simple-map.js",
        destination: "/_next/static/chunks/static/simple-map.js",
        permanent: true,
      },
    ];
  },
})

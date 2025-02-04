/** @type {import('next').NextConfig} */
const withImages = require('next-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer(withImages({
  fileExtensions: ["jpg", "jpeg", "png", "gif", "svg"],
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    disableStaticImages: true
  },
  webpack: function (config) {
    config.module.rules.push(
      {
        test: /\.ya?ml$/,
        use: 'js-yaml-loader',
      },
    )
    return config
  },
  async headers() {
    return [
      {
        "source": "/api/(.*)",
        "headers": [
          { "key": "Access-Control-Allow-Credentials", "value": "true" },
          { "key": "Access-Control-Allow-Origin", "value": "*" }, // Change this to specific domain for better security
          {
            "key": "Access-Control-Allow-Methods",
            "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT"
          },
          {
            "key": "Access-Control-Allow-Headers",
            "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
          }
        ]
      }
    ];
  },
  async redirects() {
    return [
      {
        source: "/apps/:name",
        destination: "/apps/:name/overview",
        permanent: true
      },
      {
        source: "/apps/:name/consumers/:id",
        destination: "/apps/:name/consumers/:id/overview",
        permanent: true
      },
      {
        source: "/settings",
        destination: "/settings/profile",
        permanent: true
      }
    ]
  }
}));

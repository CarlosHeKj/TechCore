// next.config.js
module.exports = {
  images: {
    domains: ["files.stripe.com"],
  },
  experimental: {
    runtime: 'edge', // Especifica que o middleware será executado no Edge
},
};
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.slack-edge.com",
      process.env.VERCEL_BLOB_STORAGE_URL,
    ],
  },
}

module.exports = nextConfig

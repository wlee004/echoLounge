/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = ({
  env: { 
    REACT_APP_GOOGLE_AUTH_URL: process.env.REACT_APP_GOOGLE_AUTH_URL
  }
})

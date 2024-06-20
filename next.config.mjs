/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/src/app",
        destination: "/",
        permanent: true,
      },
      {
        source: "/src/app/auth/login",
        destination: "/auth/login",
        permanent: true,
      },
      {
        source: "/src/app/dashbroad",
        destination: "/dashbroad",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

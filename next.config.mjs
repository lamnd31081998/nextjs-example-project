/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/src/app",
        destination: "/auth/login",
        permanent: true,
      },
      {
        source: "/src/app/auth/login",
        destination: "/auth/login",
        permanent: true,
      },
      {
        source: "/src/app/user",
        destination: "/user",
        permanent: true,
      },
      {
        source: "/src/app/dashboard",
        destination: "/dashboard",
        permanent: true,
      },
      {
        source: "/src/app/staff",
        destination: "/staff",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

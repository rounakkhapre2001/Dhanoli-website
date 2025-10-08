/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yrzmbjpfufmtapxrgsji.supabase.co", // 👈 your Supabase project domain
        port: "",
        pathname: "/storage/v1/object/public/**", // 👈 allow all public storage paths
      },
    ],
  },
};

export default nextConfig;

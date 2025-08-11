
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_ONCHAINKIT_API_KEY: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY,
    NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME: "Subcast Sentinel",
    NEXT_PUBLIC_ICON_URL: "/icon.png",
    NEYNAR_API_KEY: process.env.NEYNAR_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  }
};

export default nextConfig;

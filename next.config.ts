import type { NextConfig } from "next";
import dotenv from "dotenv";
dotenv.config(); //stores env var to protect sensitive data

const nextConfig: NextConfig = {
	/* config options here */
	allowedDevOrigins: [process.env.ALLOWED_DEV_IP]
};

export default nextConfig;

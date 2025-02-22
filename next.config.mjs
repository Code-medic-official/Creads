/** @type {import('next').NextConfig} */
const nextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "img.clerk.com",
			},
			{
				protocol: "https",
				hostname: "images.clerk.dev",
			},
			{
				protocol: "https",
				hostname: "upload.wikimedia.org",
			},
			{
				protocol: "https",
				hostname: "icon.icepanel.io",
			},
			{
				protocol: "https",
				hostname: "ui.shadcn.com",
			},
			{
				protocol: "https",
				hostname: "ui.aceternity.com",
			},

			{
				protocol: "https",
				hostname: "lucide.dev",
			},
			{
				protocol: "https",
				hostname: "images.g2crowd.com",
			},
			{
				protocol: "https",
				hostname: "icon.icepanel.io",
			},
			{
				protocol: "https",
				hostname: "api.microlink.io",
			},
		],
	},
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'avatar.iran.liara.run',
                pathname: '/public/6',
            },
        ],
        domains: ['gravatar.com'], 
    },
};

export default nextConfig;

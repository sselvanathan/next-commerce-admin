/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverComponentsExternalPackages: ['@prisma/client', 'bcrypt']
    },
    images: {
        domains: [
            "res.cloudinary.com"
        ]
    }
}

module.exports = nextConfig

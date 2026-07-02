import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/favicon.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/:all*(svg|png|jpg|jpeg|gif|webp)',
        has: [
          {
            type: 'query',
            key: 'v',
          },
        ],
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/opengraph-image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, max-age=0, must-revalidate',
          },
        ],
      },
      {
        source: '/twitter-image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, max-age=0, must-revalidate',
          },
        ],
      },
    ]
  },
}

export default nextConfig

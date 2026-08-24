import type {MetadataRoute} from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BuildCodex',
    short_name: 'BuildCodex',
    description: 'Game builds, classes, weapons, and guides.',
    start_url: '/',
    display: 'standalone',
    background_color: '#05030c',
    theme_color: '#05030c',
    icons: [
      {
        src: '/icons/buildcodex-icon-192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: '/icons/buildcodex-icon-512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };
}

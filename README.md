This is a Next.js app that grabs the closest 5 food trucks to San Francisco.

Production site deployed on Vercel at [https://food-truck-kappa.vercel.app/](https://food-truck-kappa.vercel.app/)

## Getting Started

You'll need to get a Bing Maps dev key from [https://www.bingmapsportal.com/](https://www.bingmapsportal.com/).
Add it to your local env `.env.local` as `MAPS_KEY`

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## [API routes](https://nextjs.org/docs/api-routes/introduction)

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

- `/api/getMap` returns a Map with pins of closest 5 food trucks in San Francisco
- `/api/getTrucks` returns a JSON of closest 5 food trucks in San Francisco

## Learn More about Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployed on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

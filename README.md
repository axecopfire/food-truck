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

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages. These routes automatically get deployed to Vercel as serverless functions.

### Functionality

- `/api/getMap` returns a Map with pins of closest 5 food trucks in San Francisco
- `/api/getTrucks` returns a JSON of closest 5 food trucks in San Francisco

## Vercel Deployments

This app is deployed to [Vercel](https://vercel.com).

Every push to the `main` branch deploys a new version to production. For deploy previews you can submit Pull Request to `main` and Vercel will deploy a custom build for that branch.

You can check for green check marks to see that it successfully deployed.

![green check marks on github means successful deployment](./public/images/green-check.PNG)

Click on the details to find out more about that deployment.

## FAQ

For more detailed information be sure to check out this project's Wiki and please feel free to submit questions as `issues`.

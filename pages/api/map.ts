// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import process from "process";
import fetch from "node-fetch";

type Data = {
  name: string;
  env: any;
};

const bingMapsUrlBuilder = () => {
  let url =
    "https://dev.virtualearth.net/REST/v1/Imagery/Map/imagerySet/centerPoint/zoomLevel/";

  // put the in between stuff
  url += "key=" + process.env.MAPS_KEY;

  return url;
};

const createMap = () => {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const map = await createMap();

  http: res.status(200).json({ name: "John Doe", env: map });
}

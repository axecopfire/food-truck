// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { get5ClosestFoodTrucks } from "../../utils/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const queryLat = +req.query.lat;
  const queryLong = +req.query.long;

  if (typeof queryLat !== "number" || typeof queryLong !== "number") {
    return res
      .status(400)
      .json({ message: "query params must contain a valid lat long" });
  }
  const closestFoodTrucks = await get5ClosestFoodTrucks(queryLat, queryLong);

  res.status(200).send(closestFoodTrucks);
}

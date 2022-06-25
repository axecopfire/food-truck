// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import process from "process";
import fetch from "node-fetch";
import { parse as csvParse } from "csv-parse/sync";

type Data = {
  name?: string;
  env?: any;
  message?: string;
  closestFoodTrucks?: any;
};

const bingMapsUrlBuilder = () => {
  let url = "https://dev.virtualearth.net/REST/v1/Locations/";

  // put the in between stuff
  url += "key=" + process.env.MAPS_KEY;

  return url;
};

const getFoodTruckData = async () => {
  const data = await fetch(
    "https://data.sfgov.org/api/views/rqzj-sfat/rows.csv"
  );

  const csvText = await data.text();
  const parsedCsv = csvParse(csvText, { delimiter: ",", columns: true });
  return parsedCsv;
};

//stackoverflow.com/questions/51819224/how-to-find-nearest-location-using-latitude-and-longitude-from-a-json-data
function distance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  unit: "K" | "N" = "K"
) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;

  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  // console.log({ radlat1, lat2, dist });
  if (unit == "K") {
    dist = dist * 1.609344;
  }
  if (unit == "N") {
    dist = dist * 0.8684;
  }
  return dist;
}

const getDistanceByLatLong = (lat: number, long: number, data: any) =>
  data.map((truck: any) => {
    if (!truck.Latitude || !truck.Latitude) return false;
    return {
      ...truck,
      distance: distance(lat, long, truck.Latitude, truck.Longitude, "K"),
    };
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const queryLat = +req.query.lat;
  const queryLong = +req.query.long;

  if (typeof queryLat !== "number" || typeof queryLong !== "number") {
    return res
      .status(400)
      .json({ message: "query params must contain a valid lat long" });
  }
  const foodTruckData = await getFoodTruckData();
  const closestFoodTrucks = getDistanceByLatLong(
    queryLat,
    queryLong,
    foodTruckData
  ).sort();

  http: res
    .status(200)
    .json({ closestFoodTrucks: closestFoodTrucks.slice(0, 5) });
}

import process from "process";
import fetch from "node-fetch";
import { parse as csvParse } from "csv-parse/sync";
import { Buffer } from "buffer";

export type FoodTruck = { [key: string]: string };
export type FoodTrucks = FoodTruck[];

export const bingMapsUrlBuilder = (middle: string) =>
  `https://dev.virtualearth.net/REST/v1/${middle}&key=${process.env.MAPS_KEY}`;

/**
 * Fetches Food Truck data
 * For visual representation of CSV go to
 * https://data.sfgov.org/Economy-and-Community/Mobile-Food-Facility-Permit/rqzj-sfat/data
 */
export const getFoodTruckData = async (): Promise<FoodTrucks> => {
  const data = await fetch(
    "https://data.sfgov.org/api/views/rqzj-sfat/rows.csv"
  );

  const csvText = await data.text();
  const parsedCsv = csvParse(csvText, { delimiter: ",", columns: true });
  return parsedCsv;
};

/**
 * This solution gauges distance between Lat Long points via radius
 * https://stackoverflow.com/questions/51819224/how-to-find-nearest-location-using-latitude-and-longitude-from-a-json-data
 *
 */
export const distance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  unit: "K" | "N" = "K"
) => {
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
};

/**
 * The interface to get food truck distances by Lat long
 * TODO: Consider using the Bing Maps Routes API to calculate commute times
 * https://docs.microsoft.com/en-us/bingmaps/rest-services/routes/calculate-a-route
 */
export const getDistanceByLatLong = (
  lat: number,
  long: number,
  data: FoodTrucks
) =>
  data
    // Ensure all trucks have Lat long
    .filter((truck: FoodTruck) => truck.Latitude && truck.Longitude)
    .map((truck: FoodTruck) => {
      return {
        ...truck,
        distance: distance(
          lat,
          long,
          +truck.Latitude,
          +truck.Longitude,
          "K"
        ).toString(),
      };
    })
    .sort();

/**
 * Builds Push Pins query string for map
 * Restriction: Max 18 pushpins allowed per map according to doc
 * https://docs.microsoft.com/en-us/bingmaps/rest-services/common-parameters-and-types/pushpin-syntax-and-icon-styles
 */
export const buildPushPinsString = (trucks: FoodTrucks) =>
  trucks.reduce((acc: string, truck: any, position: number) => {
    if (position > 18) return "";
    return (acc += `&pushpin=${truck.Latitude},${truck.Longitude};129;${
      position + 1
    }`);
  }, "");

/**
 * Builds static map from bing maps v1 and adds push pins for food trucks
 * https://docs.microsoft.com/en-us/bingmaps/rest-services/imagery/get-a-static-map
 *
 */
export const buildMap = async (
  lat: number,
  long: number,
  closestFoodTrucks: FoodTrucks
) => {
  const pushPins = buildPushPinsString(closestFoodTrucks);

  const url = bingMapsUrlBuilder(
    `Imagery/Map/Road/${lat},${long}/11?mapLayer=Basemap,Buildings&mapSize=500,500${pushPins}`
  );

  const response = await fetch(url);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer);
};

export const get5ClosestFoodTrucks = async (
  queryLat: number,
  queryLong: number
) => {
  const foodTruckData = await getFoodTruckData();
  const closestFoodTrucks = await getDistanceByLatLong(
    queryLat,
    queryLong,
    foodTruckData
  ).slice(0, 5);

  return closestFoodTrucks;
};

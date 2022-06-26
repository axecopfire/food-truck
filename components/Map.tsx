import type { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import TruckCard from "./TruckCard";

/**
 * TODOs:
 * Give an option to use the Browser's geoLocation API:
 *  https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 *
 * Give an option to add an address for center point, which will return lat/long
 *  https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 */
const lat = "37.76201920035647";
const long = "-122.42730642251331";
const qs = `lat=${lat}&long=${long}`;
const getMapData = async () => {
  // TODO: Need better error handling for revoked token access
  // Map will just show as blank if token is revoked with no error
  const response = await fetch(`/api/getMap?${qs}`);
  const json = await response.blob();
  return URL.createObjectURL(json);
};

const getTruckData = async () => {
  const response = await fetch(`/api/getTrucks?${qs}`);
  return response.json();
};

const Map: NextPage = () => {
  const [data, setData] = useState({
    map: "",
    legend: [],
  });

  const getData = async () => {
    const map = await getMapData();
    const legend = await getTruckData();
    console.log({ legend });
    setData({ map, legend });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {data.map && <Image src={data.map} alt="" width="500px" height="500px" />}
      <div className={styles.grid}>
        {!data.legend.length
          ? ""
          : data.legend.map((truck, i) => (
              <TruckCard key={`truck-${i}`} truck={truck} i={i} />
            ))}
      </div>
    </>
  );
};

export default Map;

import type { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";
import TruckCard from "./TruckCard";
import LatLongTextBoxes from "./LatLongTextBoxes";
import styles from "../styles/Home.module.css";

/**
 * TODO:
 * Give an option to use the Browser's geoLocation API:
 *  https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 *
 * TODO:
 * Give an option to add an address for center point, which will return lat/long
 *  https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
 */
export interface LatLongData {
  lat: string;
  long: string;
}

// TODO: This component is too big. Should break up and test
const Map: NextPage = () => {
  // TODO: Consider condensing state into a useReducer
  // TODO: Add Loading/Error states
  const [data, setData] = useState({
    map: "",
    legend: [],
  });
  const [latLongData, setLatLongData] = useState<LatLongData>({
    lat: "37.76201920035647",
    long: "-122.42730642251331",
  });
  const [getNewPosition, setGetNewPosition] = useState(false);

  const getQs = () => `lat=${latLongData.lat}&long=${latLongData.long}`;

  const getMapData = async () => {
    const qs = getQs();
    // TODO: Need better error handling for revoked token access
    // Map will just show as blank if token is revoked with no error
    const response = await fetch(`/api/getMap?${qs}`);
    const json = await response.blob();
    return URL.createObjectURL(json);
  };

  const getTruckData = async () => {
    const qs = getQs();
    const response = await fetch(`/api/getTrucks?${qs}`);
    return response.json();
  };

  const getData = async () => {
    const map = await getMapData();
    const legend = await getTruckData();
    setData({ map, legend });
  };

  // Initial Page Load
  useEffect(() => {
    getData();
  }, []);

  // On new request
  useEffect(() => {
    if (getNewPosition) {
      setGetNewPosition(false);
      getData();
    }
  }, [getNewPosition]);

  return (
    <>
      <LatLongTextBoxes
        latLongData={latLongData}
        setLatLongData={setLatLongData}
      />
      <button className={styles.button} onClick={() => setGetNewPosition(true)}>
        Get new position
      </button>
      {data.map && <Image src={data.map} alt="" width="500px" height="500px" />}
      <ol>
        {!data.legend.length
          ? ""
          : data.legend.map((truck, i) => (
              <TruckCard key={`truck-${i}`} truck={truck} />
            ))}
      </ol>
    </>
  );
};

export default Map;

import type { NextPage } from "next";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

const lat = "37.76201920035647";
const long = "-122.42730642251331";
const qs = `lat=${lat}&long=${long}`;
const getMapData = async () => {
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
    legend: {},
  });

  const getData = async () => {
    const map = await getMapData();
    const legend = await getTruckData();
    setData({ map, legend });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={styles.code}>
      {data.map && <Image src={data.map} alt="" width="500px" height="500px" />}
      <pre>{JSON.stringify(data.legend, null, 4)}</pre>
    </div>
  );
};

export default Map;

import type { NextPage } from "next";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
const Map: NextPage = () => {
  const [mapData, setMapData] = useState({});

  const getMapData = async () => {
    const lat = "37.76201920035647";
    const long = "-122.42730642251331";
    const response = await fetch(`/api/hello?lat=${lat}&long=${long}`);
    const json = await response.json();
    setMapData(json);
  };

  useEffect(() => {
    getMapData();
  }, []);
  return (
    <div className={styles.code}>
      <pre>{JSON.stringify(mapData, null, 4)}</pre>
    </div>
  );
};

export default Map;

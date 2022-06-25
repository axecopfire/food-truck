import type { NextPage } from "next";
import { useState, useEffect } from "react";
const Map: NextPage = () => {
  const [mapData, setMapData] = useState({});

  const getMapData = async () => {
    const response = await fetch("/api/hello");
    const json = await response.json();
    setMapData(json);
  };

  useEffect(() => {
    getMapData();
  }, []);
  return (
    <>
      <pre>{JSON.stringify(mapData, null, 4)}</pre>
    </>
  );
};

export default Map;

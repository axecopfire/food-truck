import { LatLongData } from "./Map";
import React from "react";
import styles from "../styles/Home.module.css";
const LatLongTextBoxes = (props: {
  latLongData: LatLongData;
  setLatLongData: React.Dispatch<React.SetStateAction<LatLongData>>;
}) => {
  const { latLongData, setLatLongData } = props;

  /**
   * TODO: Provide helpful feedback to let users know
   *  only valid numbers less than 20 characters long allowed
   */
  const handleLatLongChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Sanitize data for sending to server
    if (!Number.isFinite(+value) || value.length > 19) return;
    return setLatLongData({ ...latLongData, [event.target.id]: value });
  };
  return (
    <>
      <label className={styles.labelInput}>
        Custom Latitude
        <input
          type="text"
          id="lat"
          value={latLongData.lat}
          onChange={handleLatLongChange}
        />
      </label>
      <label className={styles.labelInput}>
        Custom Longitude
        <input
          type="text"
          id="long"
          value={latLongData.long}
          onChange={handleLatLongChange}
        />
      </label>
    </>
  );
};

export default LatLongTextBoxes;

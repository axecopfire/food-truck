import { FoodTruck } from "../utils/api";
import styles from "../styles/Home.module.css";

const TruckCard = ({ truck, i }: { truck: FoodTruck; i: number }) => {
  console.log(truck);
  return (
    <>
      <div className={styles.card}>
        <p>{i}</p>
        <p className={styles.description}>{truck.Applicant}</p>
      </div>
    </>
  );
};

export default TruckCard;

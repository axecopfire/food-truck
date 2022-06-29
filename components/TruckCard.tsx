import { FoodTruck } from "../utils/api";

const TruckCard = ({ truck }: { truck: FoodTruck }) => {
  return <li>{truck.Applicant}</li>;
};

export default TruckCard;

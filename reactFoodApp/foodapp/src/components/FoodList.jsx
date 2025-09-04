import FoodItem from "./FoodItem";

export default function FoodList({ foodData, setFoodId }) {
  return (
    <div>
      {foodData.map((food) => (
       <FoodItem setFoodId={setFoodId} key={food} food={food} />
      ))}
    </div>
  );
}
 
// passed from foodata/ usestate to show/display the data reslut
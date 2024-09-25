import food from "../data/food-list.json";
import { Food } from "../../common/types/food";

export function getAllFood(): Food {
  return food;
}

import { FoodCategory, FoodItem, FoodNutrition } from "../../common/types/food";

export function getFoodCategoryById(
  categories: Array<FoodCategory>,
  categoryId: string
): FoodCategory | undefined {
  return categories.find((currentCategory: FoodCategory) => {
    return currentCategory.id === categoryId;
  });
}

export function getFoodItemById(
  foodItems: Array<FoodItem>,
  foodItemId: string
): FoodItem | undefined {
  return foodItems.find((currentItem: FoodItem) => {
    return currentItem.id === foodItemId;
  });
}

export function getNutrition(foodItem: FoodItem, grams: number): FoodNutrition {
  const calcPer: number = grams / 100;
  const calculatedNutrition: FoodNutrition = {
    measureBy: "g",
    calories: calcPer * foodItem.nutrition.calories,
    fat: calcPer * foodItem.nutrition.fat,
    carbs: calcPer * foodItem.nutrition.carbs,
    protein: calcPer * foodItem.nutrition.protein,
  };
  return calculatedNutrition;
}

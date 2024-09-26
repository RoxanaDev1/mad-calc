export type Food = {
  categories: Array<FoodCategory>;
};

export type FoodCategory = {
  name: string;
  category: string;
  id: string;
  items: Array<FoodItem>;
};

export type FoodItem = {
  name: string;
  id: string;
  danish: string;
  nutrition: FoodNutrition;
};

export type FoodNutrition = {
  measureBy: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
};

export type CalculatedFoodItemNutrition = {
  foodItem: FoodItem;
  amount: number;
  calculatedNutrition: FoodNutrition;
};

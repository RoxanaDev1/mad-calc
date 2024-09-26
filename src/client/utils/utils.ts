import {
  CalculatedFoodItemNutrition,
  FoodCategory,
  FoodItem,
  FoodNutrition,
} from "../../common/types/food";

export function geItemById(
  data: Array<FoodCategory | FoodItem>,
  itemId: string
): FoodCategory | FoodItem | undefined {
  return data.find((currentItem: FoodCategory | FoodItem) => {
    return currentItem.id === itemId;
  });
}

export function geItemByName(
  data: Array<FoodCategory | FoodItem>,
  itemName: string
): FoodCategory | FoodItem | undefined {
  return data.find((currentItem: FoodCategory | FoodItem) => {
    return currentItem.name === itemName;
  });
}

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
  console.log("calcper:", calcPer);
  console.log("item:", foodItem);
  const calculatedNutrition: FoodNutrition = {
    measureBy: "g",
    calories: Number((calcPer * foodItem.nutrition.calories).toFixed(2)),
    fat: Number((calcPer * foodItem.nutrition.fat).toFixed(2)),
    carbs: Number((calcPer * foodItem.nutrition.carbs).toFixed(2)),
    protein: Number((calcPer * foodItem.nutrition.protein).toFixed(2)),
  };
  console.log("calculation:", calculatedNutrition);
  return calculatedNutrition;
}

export function getCalculatedFoodItem(
  foodItem: FoodItem,
  grams: number
): CalculatedFoodItemNutrition {
  const item: CalculatedFoodItemNutrition = {
    amount: grams,
    foodItem: foodItem,
    calculatedNutrition: getNutrition(foodItem, grams),
  };
  return item;
}

export function generateEmptyCalcFoodItem(
  defaultSelection?: FoodItem
): CalculatedFoodItemNutrition {
  let item: CalculatedFoodItemNutrition = {
    foodItem: {
      name: "",
      id: "",
      danish: "",
      nutrition: {
        measureBy: "g",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    },
    amount: 0,
    calculatedNutrition: {
      measureBy: "g",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  };
  if (defaultSelection) {
    item.foodItem = defaultSelection;
  }
  return item;
}

export function generateNutritionSummary(
  items: Array<CalculatedFoodItemNutrition>
): FoodNutrition {
  let summaryNutrition: FoodNutrition = {
    measureBy: "g",
    calories: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
  };
  items.forEach((item: CalculatedFoodItemNutrition) => {
    summaryNutrition.calories = item.calculatedNutrition.calories;
    summaryNutrition.carbs = item.calculatedNutrition.carbs;
    summaryNutrition.fat = item.calculatedNutrition.fat;
    summaryNutrition.protein = item.calculatedNutrition.protein;
  });
  return summaryNutrition;
}

export type Food = {
    categories: Array<FoodCategory>;
}

export type FoodCategory = {
    name: string,
    category: string,
    id: string,
    items: Array<FoodItem>
}

export type FoodItem = {
    name: string;
    id: string;
    danish: string;
    nutrition: FoodNutrition;
}

export type FoodNutrition = {
    measureBy: string;
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
}

//Maybe
// export const enum Unit {
//     Gram = "g",
//     Mililiter  = "ml"
// }

// export const enum CategoryType {
//     VEG = "Vegetables",
//     FRUIT  = "Fruit",
//     MEAT = "Meat",
//     DAIRY = "Dairy",
//     GRAIN = "GrainProducts",
//     BREAD = "Bread",
//     CANNED = "Canned Food",
//     PREMADE = "Premade Ingredients",
//     DRINKS = "Drinks"
// }
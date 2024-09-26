import React from "react";
import { Component } from "react";
import {
  Food,
  FoodItem,
  CalculatedFoodItemNutrition,
} from "../common/types/food";
import styled from "styled-components";
import { FoodSelection } from "./components/FoodSelection";
import food from "../common/data/food-list.json";
import { Header } from "./components/Header";
import { FoodItemList } from "./components/FoodItemList";
import { FoodListSummary } from "./components/FoodSummary";

interface AppState {
  food: Food;
  selectedFood: Array<CalculatedFoodItemNutrition>;
}

export class App extends Component<{}, AppState> {
  constructor() {
    super({});
    this.state = { food: food, selectedFood: [] };
    this.onAddFoodItem = this.onAddFoodItem.bind(this);
  }

  onAddFoodItem(foodItem: CalculatedFoodItemNutrition): void {
    let foodArr = this.state.selectedFood;
    foodArr.push(foodItem);
    this.setState({
      selectedFood: foodArr,
    });
  }

  render() {
    return (
      <AppContainer>
        <Header />
        <ContentContainer>
          <FoodSelection
            categories={this.state.food.categories}
            onAddFoodItem={this.onAddFoodItem}
          />
          <FoodItemList selectedFoodItems={this.state.selectedFood} />
          <FoodListSummary selectedFoodItems={this.state.selectedFood} />
        </ContentContainer>
      </AppContainer>
    );
  }
}

const AppContainer = styled.div`
  width: 100vh;
  height: 100vh;
  min-width: 100%;
  min-height: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  height: inherit;
  max-width: 100%;
  background: #5d6d7e;
  font-family: cursive;
  flex-direction: column;
  justify-content: space-between;
`;

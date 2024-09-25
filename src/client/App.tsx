import React from "react";
import { Component } from "react";
import { Food, FoodItem } from "../common/types/food";
import styled from "styled-components";
import { FoodRow } from "./components/FoodRow";
import food from "../common/data/food-list.json";

interface AppState {
  food?: Food;
  selectedFood: Array<FoodItem>;
}

export class App extends Component<{}, AppState> {
  constructor() {
    super({});
    this.state = { food: food, selectedFood: [] };
  }

  renderFoodRowList() {
    if (!this.state.food) {
      return;
    }
    return <FoodRow categories={this.state.food.categories} />;
  }

  render() {
    return (
      <AppContainer>
        <h1>Hello!</h1>
        <ContentContainer>{this.renderFoodRowList()}</ContentContainer>
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
`;
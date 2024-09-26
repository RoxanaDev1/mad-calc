import { Component } from "react";
import {
  CalculatedFoodItemNutrition,
  FoodNutrition,
} from "../../common/types/food";
import styled from "styled-components";
import React from "react";
import { generateNutritionSummary } from "../utils/utils";
import { NutritionSummary } from "./common/NutritionSummary";

interface FoodListSummaryProps {
  selectedFoodItems: Array<CalculatedFoodItemNutrition>;
}

export class FoodListSummary extends Component<FoodListSummaryProps, {}> {
  constructor(props: FoodListSummaryProps) {
    super(props);
  }

  renderFoodListSummary() {
    const summaryNutrition: FoodNutrition = generateNutritionSummary(
      this.props.selectedFoodItems
    );
    return (
      <NutritionListContainer>
        <NutritionSummary nutrition={summaryNutrition} />
      </NutritionListContainer>
    );
  }

  render() {
    return (
      <FoodItemListContainer>
        {this.renderFoodListSummary()}
      </FoodItemListContainer>
    );
  }
}

const FoodItemListContainer = styled.div`
  display: flex;
  align-items: center;
  place-content: center;
  flex-direction: column;
  background-color: lightsteelblue;
`;

const NutritionListContainer = styled.div`
  display: flex;
  align-items: center;
  place-content: center;
  flex-direction: row;
`;

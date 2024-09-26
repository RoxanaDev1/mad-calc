import { Component } from "react";
import { CalculatedFoodItemNutrition } from "../../common/types/food";
import styled from "styled-components";
import React from "react";

interface FoodItemListProps {
  selectedFoodItems: Array<CalculatedFoodItemNutrition>;
}

export class FoodItemList extends Component<FoodItemListProps, {}> {
  constructor(props: FoodItemListProps) {
    super(props);
  }

  renderNutrition() {
    let elements: any = [];
    this.props.selectedFoodItems.forEach(
      (foodItem: CalculatedFoodItemNutrition, index: number) => {
        elements.push(
          <NutritionListContainer key={index}>
            <NutritionValue>{`Name: ${foodItem.foodItem.name}`}</NutritionValue>
            <NutritionValue>{`Amount: ${foodItem.amount}`}</NutritionValue>
            <NutritionValue>
              {`Calories: ${foodItem.calculatedNutrition.calories}`}
            </NutritionValue>
            <NutritionValue>{`Carbs: ${foodItem.calculatedNutrition.carbs}`}</NutritionValue>
            <NutritionValue>{`Fat: ${foodItem.calculatedNutrition.fat}`}</NutritionValue>
            <NutritionValue>
              {`Protein: ${foodItem.calculatedNutrition.protein}`}
            </NutritionValue>
          </NutritionListContainer>
        );
      }
    );
    return elements;
  }

  render() {
    return (
      <FoodItemListContainer>{this.renderNutrition()}</FoodItemListContainer>
    );
  }
}

const FoodItemListContainer = styled.div`
  display: flex;
  align-items: center;
  place-content: center;
  flex-direction: column;
`;

const NutritionListContainer = styled.div`
  display: flex;
  align-items: center;
  place-content: center;
  flex-direction: row;
`;

const NutritionValue = styled.div`
  display: flex;
  padding: 10px;
`;

import { Component } from "react";
import { CalculatedFoodItemNutrition, FoodItem } from "../../common/types/food";
import styled from "styled-components";
import React from "react";
import { InformationField } from "./common/InformationField";
import { NutritionSummary } from "./common/NutritionSummary";

interface FoodItemListProps {
  selectedFoodItems: Array<CalculatedFoodItemNutrition>;
  onDeleteFoodItem: (foodItem: CalculatedFoodItemNutrition) => void;
}

export class FoodItemList extends Component<FoodItemListProps, {}> {
  constructor(props: FoodItemListProps) {
    super(props);
    this.onDeleteFoodItem = this.onDeleteFoodItem.bind(this);
  }

  onDeleteFoodItem(event: any) {
    const foodItemToDelete = this.props.selectedFoodItems[event.target.id];
    this.props.onDeleteFoodItem(foodItemToDelete);
  }

  renderNutrition() {
    let elements: any = [];
    this.props.selectedFoodItems.forEach(
      (foodItem: CalculatedFoodItemNutrition, index: number) => {
        elements.push(
          <NutritionListContainer key={index}>
            <InformationField text={"Name"} value={foodItem.foodItem.name} />
            <InformationField text={"Amount"} value={foodItem.amount} />
            <NutritionSummary nutrition={foodItem.calculatedNutrition} />
            <DeleteFoodItem id={`${index}`} onClick={this.onDeleteFoodItem}>
              DELETE
            </DeleteFoodItem>
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

const DeleteFoodItem = styled.button``;

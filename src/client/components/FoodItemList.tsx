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
  flex-wrap: wrap;
  @media (max-width: 963px) {
    background-color: lightskyblue;
    font-size: 15px;
    width: fit-content;
  }
`;

const NutritionListContainer = styled.div`
  display: flex;
  align-items: center;
  place-content: center;
  flex-direction: row;
`;

const DeleteFoodItem = styled.button`
  color: #fff;
  padding: 5px 15px;
  border-radius: 100px;
  background-color: rgb(67, 166, 205);
  background-image: radial-gradient(
      93% 87% at 87% 89%,
      rgba(0, 0, 0, 0.23) 0%,
      transparent 86.18%
    ),
    radial-gradient(
      66% 87% at 26% 20%,
      rgba(255, 255, 255, 0.41) 0%,
      rgba(255, 255, 255, 0) 69.79%,
      rgba(255, 255, 255, 0) 100%
    );
  box-shadow: 2px 19px 31px rgba(0, 0, 0, 0.2);
  font-weight: bold;
  font-size: inherit;

  border: 0;

  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  cursor: pointer;
`;

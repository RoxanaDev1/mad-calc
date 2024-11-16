import React from "react";
import { Component } from "react";
import styled from "styled-components";
import {
  FoodCategory,
  FoodItem,
  CalculatedFoodItemNutrition,
  FoodUnit,
} from "../../common/types/food";
import {
  generateEmptyCalcFoodItem,
  getCalculatedFoodItem,
  getNutrition,
} from "../utils/utils";
import { ItemSelect } from "./common/ItemSelect";
import { NutritionSummary } from "./common/NutritionSummary";

interface FoodSelectionProps {
  categories: Array<FoodCategory>;
  onAddFoodItem: (foodItem: CalculatedFoodItemNutrition) => void;
}

interface FoodSelectionState {
  currentCategory: FoodCategory;
  currentFoodItem: CalculatedFoodItemNutrition;
}

export class FoodSelection extends Component<
  FoodSelectionProps,
  FoodSelectionState
> {
  constructor(props: FoodSelectionProps) {
    super(props);
    this.state = {
      currentCategory: this.props.categories[0],
      currentFoodItem: generateEmptyCalcFoodItem(
        this.props.categories[0].items[0]
      ),
    };
    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.onSelectFoodItem = this.onSelectFoodItem.bind(this);
    this.onSelectFoodUnit = this.onSelectFoodUnit.bind(this);
    this.onChangeGramInput = this.onChangeGramInput.bind(this);
    this.onAddFoodItem = this.onAddFoodItem.bind(this);
    this.setCurrentCalcFoodItem = this.setCurrentCalcFoodItem.bind(this);
  }

  setCurrentCalcFoodItem(changedFoodItem: CalculatedFoodItemNutrition) {
    const nutritionPerSelection = getNutrition(
      changedFoodItem.foodItem,
      changedFoodItem.amount
    );
    changedFoodItem.calculatedNutrition = nutritionPerSelection;

    this.setState({
      currentFoodItem: changedFoodItem,
    });
  }

  onSelectCategory(selectedCategory: FoodCategory) {
    let currentItem: CalculatedFoodItemNutrition = this.state.currentFoodItem;

    //Set default food item
    currentItem.foodItem = selectedCategory.items[0];

    //Set default food unit
    if (currentItem.foodItem.foodUnit) {
      currentItem.selectedFoodUnit = currentItem.foodItem.foodUnit[0];
      currentItem.amount = currentItem.foodItem.foodUnit[0].amount;
    } else {
      currentItem.amount = 0;
    }

    this.setState({
      currentCategory: selectedCategory,
    });

    this.setCurrentCalcFoodItem(currentItem);
  }

  onSelectFoodItem(selectedFoodItem: FoodItem) {
    let currentItem: CalculatedFoodItemNutrition = this.state.currentFoodItem;

    currentItem.foodItem = selectedFoodItem;

    //Set default food unit
    if (currentItem.foodItem.foodUnit) {
      currentItem.selectedFoodUnit = currentItem.foodItem.foodUnit[0];
      currentItem.amount = currentItem.foodItem.foodUnit[0].amount;
    } else {
      currentItem.amount = 0;
    }

    this.setCurrentCalcFoodItem(currentItem);
  }

  onSelectFoodUnit(selectedFoodUnit: FoodUnit) {
    let currentItem: CalculatedFoodItemNutrition = this.state.currentFoodItem;

    currentItem.amount = selectedFoodUnit.amount;
    currentItem.selectedFoodUnit = selectedFoodUnit;

    this.setCurrentCalcFoodItem(currentItem);
  }

  onChangeGramInput(event: any) {
    let currentItem: CalculatedFoodItemNutrition = this.state.currentFoodItem;
    currentItem.amount = Number(event.target.value);

    this.setCurrentCalcFoodItem(currentItem);
  }

  onAddFoodItem(event: any) {
    if (!this.state.currentFoodItem.amount) {
      return;
    }

    const calcItem: CalculatedFoodItemNutrition = getCalculatedFoodItem(
      this.state.currentFoodItem?.foodItem,
      Number(this.state.currentFoodItem?.amount)
    );

    this.props.onAddFoodItem(calcItem);
  }

  renderNutrition() {
    if (!this.state.currentFoodItem.amount) {
      return;
    }

    return (
      <NutritionContainer>
        <NutritionSummary
          nutrition={this.state.currentFoodItem.calculatedNutrition}
        />
      </NutritionContainer>
    );
  }

  renderCategorySelection() {
    return (
      <ItemSelect
        data={this.props.categories}
        onSelect={this.onSelectCategory}
        currentValue={this.state.currentCategory}
      />
    );
  }

  renderFoodItemSelection() {
    return (
      <ItemSelect
        data={this.state.currentCategory.items}
        onSelect={this.onSelectFoodItem}
        currentValue={this.state.currentFoodItem.foodItem}
      />
    );
  }

  renderUnitSelection() {
    if (!this.state.currentFoodItem.foodItem.foodUnit) {
      return;
    }
    return (
      <ItemSelect
        data={this.state.currentFoodItem.foodItem.foodUnit}
        onSelect={this.onSelectFoodUnit}
        currentValue={this.state.currentFoodItem.selectedFoodUnit}
      />
    );
  }

  renderAmountInputField() {
    return (
      <InputGramQuantityContainer>
        <InputGramQuantity
          onChange={this.onChangeGramInput}
          type="text"
          id="fname"
          placeholder="Enter amount in g"
          value={
            this.state.currentFoodItem.amount
              ? this.state.currentFoodItem.amount
              : ""
          }
        />
      </InputGramQuantityContainer>
    );
  }

  render() {
    return (
      <FoodSelectionContainer>
        {this.renderCategorySelection()}
        {this.renderFoodItemSelection()}
        {this.renderUnitSelection()}
        {this.renderAmountInputField()}
        {this.renderNutrition()}
        <AddFoodItemButtonContainer>
          <AddFoodItemButton onClick={this.onAddFoodItem}>
            Add
          </AddFoodItemButton>
        </AddFoodItemButtonContainer>
      </FoodSelectionContainer>
    );
  }
}

const FoodSelectionContainer = styled.div`
  display: flex;
  place-content: center;
  padding: 50px;
  flex-wrap: wrap;
  width: fit-content;
  @media (max-width: 963px) {
    flex-direction: column;
    padding-top: 15px;
    place-content: flex-start;
  }
`;

const InputGramQuantityContainer = styled.div`
  padding: 10px;
`;

const InputGramQuantity = styled.input`
  @media (max-width: 963px) {
    font-size: 15px;
    width: 230px;
  }
`;

const NutritionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  place-content: center;
  padding: 10px;
`;

const NutritionValue = styled.div`
  display: flex;
  padding: 10px;
`;

const AddFoodItemButtonContainer = styled.div`
  display: flex;
  padding: 10px;
`;

const AddFoodItemButton = styled.button`
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

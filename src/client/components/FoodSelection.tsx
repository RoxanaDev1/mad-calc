import React from "react";
import { Component } from "react";
import styled from "styled-components";
import {
  FoodCategory,
  FoodItem,
  CalculatedFoodItemNutrition,
} from "../../common/types/food";
import {
  generateEmptyCalcFoodItem,
  getCalculatedFoodItem,
  getNutrition,
} from "../utils/utils";
import { ItemSelect } from "./ItemSelect";

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

    currentItem.foodItem = selectedCategory.items[0];

    this.setState({
      currentCategory: selectedCategory,
    });

    this.setCurrentCalcFoodItem(currentItem);
  }

  onSelectFoodItem(selectedFoodItem: FoodItem) {
    let currentItem: CalculatedFoodItemNutrition = this.state.currentFoodItem;

    currentItem.foodItem = selectedFoodItem;

    this.setCurrentCalcFoodItem(currentItem);
  }

  onChangeGramInput(event: any) {
    let currentItem: CalculatedFoodItemNutrition = this.state.currentFoodItem;
    currentItem.amount = Number(event.target.value);

    // console.log("amount:", currentItem.amount);
    // const nutritionPerSelection = getNutrition(
    //   currentItem.foodItem,
    //   currentItem.amount
    // );

    // console.log("nutritionPerSelection:", nutritionPerSelection);

    // currentItem.calculatedNutrition = nutritionPerSelection;

    this.setCurrentCalcFoodItem(currentItem);
  }

  onAddFoodItem(event: any) {
    if (!this.state.currentFoodItem.amount) {
      console.log("Cannot calculate the item");
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
        <NutritionValue>
          {`Calories: ${this.state.currentFoodItem.calculatedNutrition.calories}`}
        </NutritionValue>
        <NutritionValue>{`Carbs: ${this.state.currentFoodItem.calculatedNutrition.carbs}`}</NutritionValue>
        <NutritionValue>{`Fat: ${this.state.currentFoodItem.calculatedNutrition.fat}`}</NutritionValue>
        <NutritionValue>
          {`Protein: ${this.state.currentFoodItem.calculatedNutrition.protein}`}
        </NutritionValue>
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

  renderAmountInputField() {
    return (
      <InputGramQuantityContainer>
        <InputGramQuantity
          onChange={this.onChangeGramInput}
          type="text"
          id="fname"
          value={this.state.currentFoodItem.amount}
        />
      </InputGramQuantityContainer>
    );
  }

  render() {
    return (
      <FoodSelectionContainer>
        {this.renderCategorySelection()}
        {this.renderFoodItemSelection()}
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
  align-items: center;
  place-content: center;
  padding: 50px;
`;

const InputGramQuantityContainer = styled.div`
  padding: 10px;
`;

const InputGramQuantity = styled.input``;

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

const AddFoodItemButton = styled.button``;

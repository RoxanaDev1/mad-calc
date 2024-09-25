import React from "react";
import { Component } from "react";
import styled from "styled-components";
import { FoodCategory, FoodItem } from "../../common/types/food";
import {
  getFoodCategoryById,
  getFoodItemById,
  getNutrition,
} from "../utils/utils";
import { ItemSelect } from "./ItemSelect";

interface FoodRowProps {
  categories: Array<FoodCategory>;
}

interface FoodRowState {
  currentCategory: FoodCategory;
  currentFoodItem: FoodItem;
  currentGramQuantity: string;
}

export class FoodRow extends Component<FoodRowProps, FoodRowState> {
  constructor(props: FoodRowProps) {
    super(props);
    this.state = {
      currentCategory: this.props.categories[0],
      currentFoodItem: this.props.categories[0].items[0],
      currentGramQuantity: "",
    };
    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.onSelectFoodItem = this.onSelectCategory.bind(this);
    this.onChangeGramInput = this.onChangeGramInput.bind(this);
  }

  onSelectCategory(selectedCategoryValue: string) {
    const category: FoodCategory | undefined = getFoodCategoryById(
      this.props.categories,
      selectedCategoryValue
    );

    if (!category) {
      return;
    }

    this.setState({
      currentCategory: category,
    });
  }

  onSelectFoodItem(selectedFoodItemValue: string) {
    const foodItem: FoodItem | undefined = getFoodItemById(
      this.state.currentCategory.items,
      selectedFoodItemValue
    );

    if (!foodItem) {
      return;
    }

    this.setState({
      currentFoodItem: foodItem,
    });
  }

  onChangeGramInput(event: any) {
    this.setState({
      currentGramQuantity: event.currentTarget.value,
    });
  }

  renderNutrition() {
    const nutritionPerSelection = getNutrition(
      this.state.currentFoodItem,
      Number(this.state.currentGramQuantity)
    );
    return (
      <NutritionContainer>
        <NutritionCalories>
          {`Calories: ${nutritionPerSelection.calories}`}
        </NutritionCalories>
        <NutritionCarbs>{`Carbs: ${nutritionPerSelection.carbs}`}</NutritionCarbs>
        <NutritionFat>{`Fat: ${nutritionPerSelection.fat}`}</NutritionFat>
        <NutritionProtein>
          {`Protein: ${nutritionPerSelection.protein}`}
        </NutritionProtein>
      </NutritionContainer>
    );
  }

  render() {
    return (
      <FoodRowContainer>
        <ItemSelect
          data={this.props.categories}
          onSelect={this.onSelectCategory}
        />
        <ItemSelect
          data={this.state.currentCategory.items}
          onSelect={this.onSelectFoodItem}
        />
        <InputGramQuantity
          onChange={this.onChangeGramInput}
          type="text"
          id="fname"
          value={this.state.currentGramQuantity}
        />
        {this.renderNutrition()}
      </FoodRowContainer>
    );
  }
}

const FoodRowContainer = styled.div``;

const InputGramQuantity = styled.input``;

const NutritionContainer = styled.div``;

const NutritionCalories = styled.div``;

const NutritionCarbs = styled.div``;

const NutritionFat = styled.div``;

const NutritionProtein = styled.div``;

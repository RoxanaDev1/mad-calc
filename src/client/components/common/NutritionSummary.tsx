import { Component } from "react";
import { FoodNutrition } from "../../../common/types/food";
import React from "react";
import { InformationField } from "./InformationField";
import styled from "styled-components";

interface NutritionSummaryProps {
  nutrition: FoodNutrition;
}

export class NutritionSummary extends Component<NutritionSummaryProps, {}> {
  constructor(props: NutritionSummaryProps) {
    super(props);
  }

  render() {
    return (
      <NutritionSummaryContainer>
        <InformationField
          text={"Calories"}
          value={this.props.nutrition.calories}
        />
        <InformationField text={"Carbs"} value={this.props.nutrition.carbs} />
        <InformationField text={"Fat"} value={this.props.nutrition.fat} />
        <InformationField
          text={"Protein"}
          value={this.props.nutrition.protein}
        />
      </NutritionSummaryContainer>
    );
  }
}

const NutritionSummaryContainer = styled.div`
  display: flex;
  align-items: center;
  place-content: center;
  flex-direction: row;
  @media (max-width: 963px) {
    font-size: 25px;
  }
`;

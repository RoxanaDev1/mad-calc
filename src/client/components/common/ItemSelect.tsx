import React from "react";
import { Component } from "react";
import styled from "styled-components";
import { FoodCategory, FoodItem, FoodUnit } from "../../../common/types/food";
import { geItemByName } from "../../utils/utils";

interface ItemSelectProps {
  data: Array<FoodCategory | FoodItem | FoodUnit>;
  currentValue?: FoodCategory | FoodItem | FoodUnit;
  onSelect: (option: any) => void;
}

interface ItemSelectState {
  selectedValue?: FoodCategory | FoodItem | FoodUnit;
}

export class ItemSelect extends Component<ItemSelectProps, ItemSelectState> {
  constructor(props: ItemSelectProps) {
    super(props);
    this.state = {
      selectedValue: this.props.currentValue,
    };
    this.onOptionChanged = this.onOptionChanged.bind(this);
  }

  onOptionChanged(event: any) {
    const currentSelection: FoodCategory | FoodItem | FoodUnit | undefined =
      geItemByName(this.props.data, event.target.value);

    if (!currentSelection) {
      return;
    }

    this.setState({
      selectedValue: currentSelection,
    });

    this.props.onSelect(currentSelection);
  }

  renderItemSelectItems() {
    return this.props.data.map((option: FoodCategory | FoodItem | FoodUnit) => {
      return (
        <ItemSelectOption key={option.id} value={option.name}>
          {option.name}
        </ItemSelectOption>
      );
    });
  }

  render() {
    return (
      <ItemSelectContainer>
        <ItemSelectBox
          onChange={this.onOptionChanged}
          value={this.props.currentValue?.name}
        >
          {this.renderItemSelectItems()}
        </ItemSelectBox>
      </ItemSelectContainer>
    );
  }
}

const ItemSelectContainer = styled.div`
  padding: 10px;
`;

const ItemSelectBox = styled.select`
  @media (max-width: 963px) {
    font-size: 15px;
  }
`;

const ItemSelectOption = styled.option``;

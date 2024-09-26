import React from "react";
import { Component } from "react";
import styled from "styled-components";
import { FoodCategory, FoodItem } from "../../common/types/food";
import { geItemByName } from "../utils/utils";

interface ItemSelectProps {
  data: Array<FoodCategory | FoodItem>;
  currentValue: FoodCategory | FoodItem;
  onSelect: (option: any) => void;
}

interface ItemSelectState {
  selectedValue: FoodCategory | FoodItem;
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
    const currentSelection: FoodCategory | FoodItem | undefined = geItemByName(
      this.props.data,
      event.target.value
    );

    if (!currentSelection) {
      return;
    }

    this.setState({
      selectedValue: currentSelection,
    });

    this.props.onSelect(currentSelection);
  }

  renderItemSelectItems() {
    return this.props.data.map((option: FoodCategory | FoodItem) => {
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
          defaultValue={this.state.selectedValue.id}
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

const ItemSelectBox = styled.select``;

const ItemSelectOption = styled.option``;

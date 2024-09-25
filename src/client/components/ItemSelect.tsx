import React from "react";
import { Component } from "react";
import styled from "styled-components";
import { FoodCategory, FoodItem } from "../../common/types/food";

interface ItemSelectProps {
  data: Array<FoodCategory | FoodItem>;
  onSelect: (option: string) => void;
}

export class ItemSelect extends Component<ItemSelectProps, {}> {
  constructor(props: ItemSelectProps) {
    super(props);
    this.onOptionChanged = this.onOptionChanged.bind(this);
  }

  onOptionChanged(event: any) {
    this.props.onSelect(event.currentTarget.value);
  }

  renderItemSelectItems() {
    return this.props.data.map((option: FoodCategory | FoodItem) => {
      return (
        <ItemSelectOption key={option.id} value={option.id}>
          {option.name}
        </ItemSelectOption>
      );
    });
  }

  render() {
    return (
      <ItemSelectContainer>
        <ItemSelectBox onChange={this.onOptionChanged}>
          {this.renderItemSelectItems()}
        </ItemSelectBox>
      </ItemSelectContainer>
    );
  }
}

const ItemSelectContainer = styled.div``;

const ItemSelectBox = styled.select``;

const ItemSelectOption = styled.option``;

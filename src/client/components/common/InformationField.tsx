import React from "react";
import { Component } from "react";
import styled from "styled-components";

interface InformationFieldProps {
  text: string;
  value: number | string;
}

export class InformationField extends Component<InformationFieldProps, {}> {
  constructor(props: InformationFieldProps) {
    super(props);
  }

  render() {
    if (typeof this.props.value === "number") {
      return (
        <InformationFieldContainer>
          {` ${this.props.text}: ${this.props.value.toFixed(2)}`}
        </InformationFieldContainer>
      );
    } else {
      return (
        <InformationFieldContainer>
          {` ${this.props.text}: ${this.props.value}`}
        </InformationFieldContainer>
      );
    }
  }
}

const InformationFieldContainer = styled.div`
  display: flex;
  padding: 10px;
`;

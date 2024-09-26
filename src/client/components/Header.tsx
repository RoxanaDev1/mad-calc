import React from "react";
import { Component } from "react";
import styled from "styled-components";

export class Header extends Component<{}, {}> {
  render() {
    return (
      <HeaderContainer>
        <HeaderTitle>My Favorite Food Calculator</HeaderTitle>
        <HeaderDescription>
          Counting calories made FUN (Maybe...)
        </HeaderDescription>
      </HeaderContainer>
    );
  }
}

const HeaderContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100px;
  font-family: monospace;
  background: #3d4f5d;
  color: white;
  text-align: center;
`;

const HeaderTitle = styled.div`
  font-size: xx-large;
  letter-spacing: 5px;
`;

const HeaderDescription = styled.div`
  font-size: x-large;
`;

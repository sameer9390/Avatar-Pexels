import React from "react";

import styled from "styled-components";

export default function Header() {
  return (
    <HeaderDetails>
      <Title>Avatar</Title>

      <RenderImage style={{ color: "red" }}>Pexels</RenderImage>
    </HeaderDetails>
  );
}

const HeaderDetails = styled.div`
  width: 100%;
  height: 7vh;
  background-color: lightgray;
  display: flex;
  align-items: center;
  border: 1px solid gray;
  justify-content: flex-start;
  padding-left: 10px;
`;
const RenderImage = styled.p`
  font-size: 22px;
  font-weight: 600;
  padding-left: 3px;
`;
const Title = styled.p`
  font-size: 22px;
  font-weight: 600;
`;

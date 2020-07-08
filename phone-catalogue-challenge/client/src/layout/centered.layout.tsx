import React from "react";
import styled from "styled-components";

const FullSizedDiv = styled.section`
    display:flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    height: 100%;
`;

export const CenteredLayout: React.FunctionComponent = props => (
  <FullSizedDiv>
    {props.children}
  </FullSizedDiv>
);
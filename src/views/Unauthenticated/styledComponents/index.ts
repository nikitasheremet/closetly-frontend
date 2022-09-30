import { Link } from "react-router-dom";
import styled from "styled-components";

export const ParentPageDiv = styled.div`
  background: #fff5f1;
  height: 100vh;
`;

export const DataIntakeInput = styled.input`
  border: none;
  border-bottom: 1px solid #a8a6a7;
  padding-bottom: 10px;
  margin-bottom: 10px;
  background: transparent;
  width: 100%;
  border-radius: 0;

  &::placeholder {
    font-family: "Source Sans Pro", sans-serif;
    color: #a8a6a7;
    font-weight: bold;
  }
`;

export const UnathenticatedContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const UnautheticatedFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  align-items: stretch;
  justify-content: center;
  margin: auto;
`;

export const SecondaryCTA = styled(Link)`
  color: rgba(0, 89, 38, 0.4);
  font-weight: bold;
`;

export const UnauthencticatedPrimaryButtonCTA = styled.button`
  border-radius: 20px;
  height: 44px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border: none;
  font-size: 22px;
  background: rgba(0, 89, 38, 0.4);
  font-family: "Source Sans Pro", sans-serif;
  font-weight: 400;
  color: #fff;
`;

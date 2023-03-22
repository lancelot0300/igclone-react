import styled from "styled-components";
import { StyledInput } from "../Input/Input.styles";

export const StyledChangeEmail = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  width: fit-content;
  max-width: 95%;
  height: 20%;
  margin: auto;
  p {
    width: fit-content;
    word-wrap: no-wrap;
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0;
    margin-right: 1rem;
    flex-shrink: 0;
  }
`;
export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  ${StyledInput} {
    flex: 1;
    opacity: 0;
    width: 100%;
    height: 100%;
  }
  span {
    flex: 1;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    border-radius: 5px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #1c1c1c;
  }
  label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    padding-bottom: 0.5rem;
  }
`;
export const StyledSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid #000;
  border-radius: 5px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #1c1c1c;

  ${(props) =>
    props.color &&
    `
        color: ${props.color};  
    `}
`;

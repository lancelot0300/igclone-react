import { Input } from "./Input";
import styled from "styled-components";

interface IInputErrorProps{
  $isError?: boolean;
}



export const StyledLabel = styled.label`
  font-size:0.8rem;
  line-height:0.5rem;
  color:red;
  z-index: 0;
`

export const FileDropArea = styled.div<IInputErrorProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 450px;
  max-width: 100%;
  padding: 25px;
  border: 1px dashed rgba(255, 255, 255, 0.4);
  border-radius: 3px;
  transition: 0.2s;
  &.is-active {
    background-color: rgba(255, 255, 255, 0.05);
  }
  ${(props) =>
    props.$isError &&
    `
   border-color: red;
  `}
`;


export const FileMessage = styled.span<IInputErrorProps>`
  font-size: small;
  font-weight: 300;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => (props.$isError ? "red" : "white")};
`;

export const FileInput = styled(Input)`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
  opacity: 0;
  &:focus {
    outline: none;
  }
`;


export const StyledInput = styled(Input)<IInputErrorProps>`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.4;
  color: #fff;
  background-color: transparent;
  transition: 0.2s;
  &:focus {
    outline: none;
    border-color: #fff;
  }
  ${(props) =>
    props.$isError &&
    `
    border-color: red;
  `}
`;
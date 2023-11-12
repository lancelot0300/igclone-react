import styled from "styled-components";

export const RemoveButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  right: 5px;
  color: black;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: rgb(0, 149, 246);
  }
`;

export const StyledTrash = styled.img`
  width: 15px;
  cursor: pointer;
  background-color: transparent;
`;
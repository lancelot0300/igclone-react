import styled from "styled-components";

 export const StyledComments = styled.div`
  width: 100%;
  background-color: #e8e8e8;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
`;

 export const StyledComment = styled.div`
  width: 100%;
  height: 30px;
  background-color: #e8e8e8;
  color: black;
  position: relative;
  display: flex;
  align-items: center;
`;

 export const Username = styled.span`
  font-weight: 600;
`;

 export const AddCommentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;

  input {
    width: 100%;
    height: 30px;
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 0 10px;
  }

  button {
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    position: absolute;
    right: 25px;
    color: black;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: rgb(0, 149, 246);
    }
  }
`;
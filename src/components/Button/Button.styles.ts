import styled from "styled-components";

export const StyledButton = styled.button`
  border: 1px solid #000;
  color: white;
  background-image: linear-gradient(92.88deg, #455EB5 9.16%, #5643CC 43.89%, #673FD7 64.72%);
  box-shadow: #5E5DF0 0 10px 20px -10px;
  font-family: Inter,Helvetica,"Apple Color Emoji","Segoe UI Emoji",NotoColorEmoji,"Noto Color Emoji","Segoe UI Symbol","Android Emoji",EmojiSymbols,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue","Noto Sans",sans-serif;
  font-size: 1.4rem;
  line-height: 24px;
  outline: 0 solid transparent;
  padding: 8px 18px;
  border-radius: 10px;
  transition: all 0.3s ease;
  cursor: pointer;
  width:10%;
  min-width:120px;

  &:hover {
    color: wheat;
    box-shadow: #5E5DF0 0 20px 10px -10px;
  }
  &:disabled{
    color: red;
  }
`;


import styled from "styled-components";

export const StyledPost = styled.div`
  min-height: 250px;
  background-color: red;
  width: 85%;
  aspect-ratio: auto 4 / 6;
  margin: 50px auto;
  border-radius: 10px;
  padding: 10px;
  background-color: #c0c0c0;
  color: #000;

  @media (min-width: 640px) {
    width: 540px;
  }
`;

export const StyledTitle = styled.p`
  text-transform: capitalize;
`;

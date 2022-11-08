import styled from "styled-components";

export const StyledPost = styled.div`
  background-color: red;
  width: 85%;
  margin: 50px auto;
  max-height: 800px;
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
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

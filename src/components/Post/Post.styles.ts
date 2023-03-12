import styled from "styled-components";

export const StyledPost = styled.div`
  background-color: red;
  margin: 50px auto;
  max-width: 600px;
  width: 50vw;
  border-radius: 10px;
  padding: 10px;
  background-color: #c0c0c0;
  color: #000;
  object-fit: cover;
  object-position: center;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

export const StyledTitle = styled.p`
  text-transform: capitalize;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 10px;
`;

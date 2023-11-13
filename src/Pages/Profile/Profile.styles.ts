import styled from "styled-components";

export const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }

  img {
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    aspect-ratio: 1/1;

    @media (max-width: 768px) {
      width: 120px;
      height: 120px;
    }
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    font-weight: 600;
  }
`;
export const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  margin: 20px 50px;
  width: 95%;
  max-width: 1000px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

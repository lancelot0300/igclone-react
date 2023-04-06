import styled from "styled-components";

export const StyledPost = styled.div`
  margin: 50px auto;
  width: 600px;
  border-radius: 5px;
  background-color: #3c3b3b;
  color: #000;
  object-fit: cover;
  object-position: center;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  img {
    max-height: 80svh;
    width: 100%;
    object-fit: cover;
    object-position: center;
    overflow: hidden;
    
  }


  @media (max-width: 768px) {
    width: 90vw;
  }
`;

export const StyledUser = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    overflow: hidden;
    flex-shrink: 0;
  }

  span {
    font-size: 1.2rem;
    font-weight: 700;
  }
`;

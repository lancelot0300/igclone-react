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
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    width: 90vw;
  }
`;

export const StyledUser = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;

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
export const StyledUserName = styled.span`
  font-size: 1rem;
  font-weight: 700;
`;
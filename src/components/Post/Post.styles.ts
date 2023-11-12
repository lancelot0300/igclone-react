import styled from "styled-components";
import PostImage from "../PostImage/PostImage";

export const StyledPost = styled.div`
  margin: 50px auto;
  max-width: 500px;
  border-radius: 5px;
  background-color: #e8e8e8;
  color: #000;
  object-fit: cover;
  object-position: center;
  overflow: hidden;
  display: flex;
  flex-direction: column;

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
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    overflow: hidden;
    flex-shrink: 0;
  }

  span {
    font-size: 1.1rem;
    font-weight: 700;
  }
`;

export const Options = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 10px;
`;

export const StyledPostImage = styled(PostImage)`
aspect-ratio: 9/10;
object-fit: cover;
object-position: center;
overflow: hidden;

`;

export const StyledTrash = styled.img`
  width: 35px;
  height: 35px;
  cursor: pointer;
  background-color: transparent;
  margin-right: 10px;
  margin-top: 5px;
  `;

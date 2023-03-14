import styled from "styled-components";

interface IDescription {
    isExtented: boolean;
}

export const StyledUserName = styled.span`
  font-size: 1rem;
  font-weight: 700;
`;

export const StyledDescription = styled.div<IDescription>`
  padding: 0 10px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  p {
    margin: 0;
  }

  ${(props) =>
    props.isExtented &&
    `
    p {
        -webkit-line-clamp: unset;
        line-clamp: unset;
    }
    `}
`;
export const LookMoreBtn = styled.button`
  margin: 0 auto;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: #c0c0c0;
  color: #000;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #fff;
  }
`;

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
  background-color: transparent;
  border: none;
  color: #000;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
  margin: 0;
  margin-top: 10px;
  margin-bottom: 10px;
  outline: none;
  &:hover {
    text-decoration: underline;
  }

`;

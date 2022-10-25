import {FC} from 'react'
import styled from 'styled-components';

interface TitleProps{
    title: string,
}

const StyledTitle = styled.p`
    font-size:2rem;
`

export const Title:FC<TitleProps> = ({title}) => {
   return <StyledTitle>Login</StyledTitle>;    
}

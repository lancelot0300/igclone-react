import React, { FC } from 'react'
import { LookMoreBtn, StyledDescription, StyledUserName, StyledProfileLogo } from './Description.styled';

interface IProps {
    userName?: string;
    desc: string;
    photoURL?: string;
}

const Description:FC<IProps> = ({userName, desc, photoURL}) => {

    const [isExtented, setIsExtented] = React.useState(false);
    const firstPart = desc.slice(0, 100);
    const secondPart = desc.slice(100, desc.length);


    const isSecondPart = () => {
        if(secondPart.length === 0) return;
        if(!isExtented) return (<>... <LookMoreBtn onClick={lookMoreHandler}>More</LookMoreBtn></>)
        return (<>{secondPart} <LookMoreBtn onClick={lookMoreHandler}>Less</LookMoreBtn></>)
    }


    const lookMoreHandler = () => {
        setIsExtented(!isExtented);
    }

  return (
    <StyledDescription isExtented={isExtented}>
            <StyledProfileLogo src={photoURL} alt="profile logo" />
            <StyledUserName>{userName || "Deleted"}:&nbsp;</StyledUserName>{firstPart}{isSecondPart()}
    </StyledDescription>
  )
}

export default Description
import React, { FC } from 'react'
import { LookMoreBtn, DescriptionWrapper, StyledUserName, StyledProfileLogo, DescriptionText } from './Description.styled';
import { Link } from 'react-router-dom';

interface IProps {
    userName?: string;
    desc: string;
    photoURL?: string;
    userId?: string;
}

const Description:FC<IProps> = ({userName, desc, photoURL, userId}) => {

    const [isExtented, setIsExtented] = React.useState(false);
    const firstPart = desc.slice(0, 51);
    const secondPart = desc.slice(51, desc.length);


    const isSecondPart = () => {
        if(secondPart.length === 0) return;
        if(!isExtented) return (<>... <LookMoreBtn onClick={lookMoreHandler}>More</LookMoreBtn></>)
        return (<>{secondPart}</>)
    }


    const lookMoreHandler = () => {
        setIsExtented(!isExtented);
    }

  return (
    <DescriptionWrapper isExtented={isExtented}>
            <Link to={`/profile/${userId}`}><StyledProfileLogo src={photoURL} alt="profile logo" /></Link>
            <DescriptionText><StyledUserName>{userName || "Deleted"}:&nbsp;</StyledUserName>{firstPart}{isSecondPart()}</DescriptionText>
    </DescriptionWrapper>
  )
}

export default Description
import { getAuth, updateProfile } from "firebase/auth";
import React, { FC, useRef } from "react";
import styled from "styled-components";
import { auth } from "../../config/config";
import { IUser } from "../../interfaces/interfaces";
import { Input } from "../Input/Input";


interface IProps {
    user: IUser;
}

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;

    button {
        padding: 10px;
        border: none;
        border-radius: 5px;
        background-color: #000;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    button:hover {
        background-color: #fff;
        color: #000;
    }
`;

const ChangeName:FC<IProps> = ({user}) => {

    const inputRef = useRef<HTMLInputElement>(null);

    const handleChangeClick = async () => {
        if(!auth.currentUser) return;
        if(!inputRef.current?.value) return;
        await updateProfile(auth.currentUser, {
          displayName: inputRef.current?.value,
        })
        console.log("Name changed");
    };

  return (

      <StyledWrapper>
      <h2>Change Name</h2>
      <Input
        type="text"
        name="name"
        placeholder={user.displayName || user.email || ""}
        ref={inputRef}
      />
      <button onClick={handleChangeClick}>Change</button>
      </StyledWrapper>
  );
};

export default ChangeName;

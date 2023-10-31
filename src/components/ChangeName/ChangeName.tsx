import { updateProfile } from "firebase/auth";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { FC, useRef, useState } from "react";
import styled from "styled-components";
import { IUser } from "../../interfaces/interfaces";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Input } from "../Input/Input";
import { StyledInput } from "../Input/Input.styles";

interface IProps {
  user: IUser;
}

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;

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

const ChangeName: FC<IProps> = ({ user }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | undefined>("");

  const handleChangeClick = async () => {
  }

  // const handleChangeClick = async () => {
  //   if (!auth.currentUser) return;
  //   if (!inputRef.current?.value) return;

  //   const postsColl = collection(db, "posts");
  //   const querySnapshot = await getDocs(postsColl).catch(() => {
  //     setError("Something went wrong with the database.");
  //   });
  //   if(!querySnapshot) return;

  //   await updateProfile(auth.currentUser, {
  //     displayName: inputRef.current?.value,
  //   }).catch(() => {
  //     setError("Something went wrong with updating the profile.");
  //   });

  //   querySnapshot.forEach(async (document) => {
  //     if (document.data().userId === user.uid) {
  //       const postId = document.id;
  //       const docRef = doc(db, "posts", postId);
  //       await updateDoc(docRef, { userName: inputRef.current?.value });
  //     }
  //   });
  // };

  return (
    <>
    <StyledWrapper>
      <h2>Change Name</h2>
      <StyledInput
        type="text"
        name="name"
        placeholder={user.displayName || user.email || ""}
        $isError={!!error}
        ref={inputRef}
      />
      <button onClick={handleChangeClick}>Change</button>
    </StyledWrapper>
    <ErrorMessage $isError={error ? true : false}>{error}</ErrorMessage>
    </>
  );
};

export default ChangeName;

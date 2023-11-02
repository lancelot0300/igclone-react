import { FC, useRef, useState } from "react";
import styled from "styled-components";
import { IUser } from "../../interfaces/interfaces";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { StyledInput } from "../Input/Input.styles";
import axios from "axios";
import { useMutation } from "react-query";
import { useAppDispatch } from "../../state/store";
import { userUpdated } from "../../state/features/auth/authSlice";

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

const updateUser = async (user: IUser) => {
  try {
    const response = await axios.put(
      "https://maszaweb.pl:1256/api/users/"+ user._id,
      user,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Login failed"); // Handle the error appropriately
  }
};


const ChangeName: FC<IProps> = ({ user }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | undefined>("");
  const [message, setMessage] = useState<string | undefined>("");
  const [wait, setWait] = useState(false);
  const mutation = useMutation(updateUser)
  const dispatch = useAppDispatch();

  const handleChangeClick = async () => {

    message && setMessage("");
    error && setError("");

    if(!inputRef.current?.value) return setError("Type name")
    setWait(true);

    const updatedUser: IUser = {
      ...user,
      displayName: inputRef.current.value
    };

    if(user.displayName === inputRef.current.value){
      setError("Type different name");
      return setWait(false);
    }

    const res = await mutation.mutateAsync(updatedUser);
    dispatch(userUpdated(res))
    setMessage("Name changed")
    setWait(false);
  };

  return (
    <>
    <StyledWrapper>
      <h2>Change Name</h2>
      <StyledInput
        type="text"
        name="name"
        placeholder={user.displayName || user.email || ""}
        onChange={() => setError("")}
        $isError={!!error}
        ref={inputRef}
      />
      <button disabled={wait} onClick={handleChangeClick}>Change</button>
    </StyledWrapper>
    {wait && <div>Wait...</div>}
    {message && <div>{message}</div>}
    <ErrorMessage $isError={error ? true : false}>{error}</ErrorMessage>
    </>
  );
};

export default ChangeName;

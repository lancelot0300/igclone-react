import { ChangeEvent, FC, useState } from "react";
import { Form } from "../Form/Form";
import useFirebase from "../../hooks/useFirebase";
import { IUser } from "../../interfaces/interfaces";
import { Input } from "../Input/Input";
import { InputWrapper, StyledChangeEmail } from "./ChangeAvatar.styles";

interface IProps {
  user: IUser;
}

const ChangeEmail: FC<IProps> = ({ user }) => {
  const { updateAvatar } = useFirebase();
  const [loading, setLoading] = useState(false);
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
   
    setLoading(false);
  };

  return (
    <StyledChangeEmail>
      <p>Change Avatar:</p>
        <InputWrapper> 
          <span>Click or Drop File</span>
          <Input
            onChange={handleChange}
            type="file"
            name="avatar"
            accept="image/*"
            disabled={loading}
          />
        </InputWrapper>
    </StyledChangeEmail>
  );
};

export default ChangeEmail;

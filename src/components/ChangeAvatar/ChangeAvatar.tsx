import { ChangeEvent, FC, useState } from 'react'
import useUploadFile from '../../hooks/useUploadFile';
import { IUser } from '../../interfaces/interfaces';
import { Input } from '../Input/Input'
import { InputWrapper, StyledChangeEmail} from './ChangeAvatar.styles'

interface IProps {
  user: IUser;
}

const ChangeEmail:FC<IProps> = ( {user}) => {

  const { updateAvatar } = useUploadFile();
  const [loading, setLoading] = useState(false);
    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        if (!e.target.files) return;
        await updateAvatar(e.target.files[0], user.uid);
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
  )
}

export default ChangeEmail
import { useSelector } from "react-redux";
import ChangeAvatar from "../../components/ChangeAvatar/ChangeAvatar";
import ChangeName from "../../components/ChangeName/ChangeName";
import { RootState } from "../../state/store";
import { StyledSettings} from "./Settings.styled";


const Settings = () => {

  const {user} = useSelector((state: RootState) => state.auth);


  return (
    <StyledSettings>
      <h1>Settings</h1>
      <ChangeAvatar user={user}/>
      <ChangeName user={user} />
    </StyledSettings>
  );
};

export default Settings;

import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { IComment} from "../../../interfaces/interfaces";
import { RemoveButton, StyledTrash } from "./RemoveComment.styles";

interface IProps {
  comment: IComment;
  removeComment: (id: string) => void;
  postUserId?: string;
}

const RemoveComment = ({ postUserId, comment, removeComment } : IProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return null;

  const isCurrentUserComment = comment.user?._id === user._id;
  const isCurrentUserPost = postUserId === user._id;

  const shouldDisplayRemoveButton = isCurrentUserComment || isCurrentUserPost;

  return shouldDisplayRemoveButton ? (
    <RemoveButton>
      <StyledTrash
        onClick={() => removeComment(comment._id)}
        src="https://maszaweb.pl:8880/uploads/defaults/recycle-bin-line-icon.png"
        alt=""
      />
    </RemoveButton>
  ) : null;
};

export default RemoveComment;
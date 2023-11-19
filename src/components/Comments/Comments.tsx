import React, { useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { IComment, IPostsResponse } from "../../interfaces/interfaces";
import RemoveComment from "./RemoveComment/RemoveComment";
import {
  AddCommentWrapper,
  StyledComment,
  StyledComments,
  Username,
} from "./Comments.styles";
import { addComment, removeComment } from "../../api/api";
import { StyledProfileLogo } from "../Description/Description.styled";
import { Link } from "react-router-dom";

interface IProps {
  commentsArr?: IComment[];
  post: IPostsResponse;
}

const Comments: React.FC<IProps> = ({ commentsArr = [], post }) => {
  const { _id: postId, user: postUser } = post;
  const [comments, setComments] = useState<IComment[]>(commentsArr);
  const commentRef = useRef<HTMLInputElement>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();

  const handleAddComment = async () => {
    if (!user || !commentRef.current?.value) return;

    const comment = commentRef.current.value;
    await addComment(comment, postId, queryClient, setComments);
    commentRef.current.value = "";
  };

  const handleRemoveComment = async (id: string) => {
    if (!user) return;

    await removeComment(id, postId, queryClient, setComments);
  };

  return (
    <StyledComments>
      {comments.map((comment) => (
        <StyledComment key={comment._id}>
          <Link to={`/profile/${comment.user?._id || "no-user"}`}>
            <StyledProfileLogo
              src={
                comment.user?.photoURL ||
                `${process.env.REACT_APP_FETCH_PHOTOS}/uploads/defaults/young-businessman-icon.png`
              }
              alt="profile logo"
            />
          </Link>
          <Username>
            {comment.user?.displayName || comment.user?.email || "Deleted User"}
            :&nbsp;
          </Username>
          {comment.comment}
          <RemoveComment
            postUserId={postUser?._id}
            removeComment={handleRemoveComment}
            comment={comment}
          />
        </StyledComment>
      ))}
      {user && (
        <AddCommentWrapper>
          <input ref={commentRef} type="text" placeholder="Add comment..." />
          <button onClick={handleAddComment}>Send</button>
        </AddCommentWrapper>
      )}
    </StyledComments>
  );
};

export default Comments;

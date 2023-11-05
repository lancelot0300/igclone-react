import React, { useEffect } from "react";
import styled from "styled-components";
import { useFetch } from "../../hooks/useFetch";
import { IComment } from "../../interfaces/interfaces";

const StyledComments = styled.div`
  width: 100%;
  background-color: rgb(60, 59, 59);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;

const StyledComment = styled.div`
  width: 100%;
  height: 30px;
  background-color: rgb(60, 59, 59);
  color: white;
`;

const Username = styled.span`
    font-weight: 600;
    `;


interface IProps {
  postID: string;
  comments?: IComment[];
  setComments: React.Dispatch<React.SetStateAction<IComment[]>>;
}

const Comments = ({ postID, comments, setComments }: IProps) => {
  const { data } = useFetch<IComment[]>(`/posts/getComments/${postID}`);

  useEffect(() => {
    if (data && data.length > 0) {
      setComments(data);
    }
  }, [data, setComments]);

  return (
    <StyledComments>
      {comments?.map((comment) => (
        <StyledComment key={comment._id}>
            <Username>{comment.user?.displayName || comment.user?.email || "Deleted User"} :</Username> {comment.comment}
        </StyledComment>
      ))}
    </StyledComments>
  );
};

export default Comments;

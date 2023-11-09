import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useFetch } from "../../hooks/useFetch";
import { IComment } from "../../interfaces/interfaces";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

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

    const AddComment = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  position: relative;

  input {
    width: 100%;
    height: 30px;
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 0 10px;
  }

  button {
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    position: absolute;
    right: 25px;
    color: black;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: rgb(0, 149, 246);
    }
  }
`;

interface IProps {
  commentsArr?: IComment[];
  postId: string;
}

const Comments = ({ commentsArr, postId}: IProps) => {

  const [comments, setComments] = useState<IComment[]>([]);
  const commentRef = useRef<HTMLInputElement>(null);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if(commentsArr) {
      setComments(commentsArr);
    }
  }, [commentsArr]);

  const handleAddComment = async () => {
    const comment = commentRef.current?.value;
    if (!comment) return;

    const newComment: IComment = {
      comment,
      user: {
        _id: user?._id || "",
        displayName: user?.displayName || "",
        email: user?.email || "",
        photoURL: user?.photoURL || "",
      },
      _id: Math.random().toString(),
    };

    setComments([...comments, newComment]);
    commentRef.current!.value = "";
    
    try {
      await axios.put(
        process.env.REACT_APP_FETCH_APP + `/posts/commentPost/${postId}`,
        { comment },
        {
          withCredentials: true,
        }
      );

    } catch (error) {
      setComments(comments);
    }

  };


  return (
    <StyledComments>
      {comments?.map((comment) => (
        <StyledComment key={comment._id}>
            <Username>{comment.user?.displayName || comment.user?.email || "Deleted User"} :</Username> {comment.comment}
        </StyledComment>
      ))}
          <AddComment>
            <input ref={commentRef} type="text" placeholder="Add comment..." />
            <button onClick={handleAddComment}>Send</button>
          </AddComment>
    </StyledComments>
  );
};

export default Comments;

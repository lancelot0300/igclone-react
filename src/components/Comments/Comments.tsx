import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useFetch } from "../../hooks/useFetch";
import { IComment, IPostResponse } from "../../interfaces/interfaces";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useQueryClient } from "react-query";
import { StyledProfileLogo } from "../Description/Description.styled";

const StyledComments = styled.div`
  width: 100%;
  background-color: #e8e8e8;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
`;

const StyledComment = styled.div`
  width: 100%;
  height: 30px;
  background-color: #e8e8e8;
  color: black;
  position: relative;
  display: flex;
  align-items: center;
`;

const Username = styled.span`
  font-weight: 600;
`;

const AddComment = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
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

const RemoveButton = styled.button`
  width: 30px;
  height: 30px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  right: 5px;
  color: black;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: rgb(0, 149, 246);
  }
`;

const StyledTrash = styled.img`
  width: 15px;
  cursor: pointer;
  background-color: transparent;
`;

interface IProps {
  commentsArr?: IComment[];
  post: IPostResponse;
}

const Comments = ({ commentsArr, post }: IProps) => {
  const {_id: postId, user: postUser} = post

  const [comments, setComments] = useState<IComment[]>(commentsArr || []);
  const commentRef = useRef<HTMLInputElement>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();

  const handleAddComment = async () => {
    const comment = commentRef.current?.value;
    if (!comment) return;

    try {
      const res = await axios.put(
        process.env.REACT_APP_FETCH_APP + `/posts/commentPost/${postId}`,
        { comment },
        {
          withCredentials: true,
        }
      );

      const newComment = res.data.comment;
      commentRef.current!.value = "";

      queryClient.setQueryData<IPostResponse[]>("posts", (oldData) => {
        if (!oldData) return [];
        return oldData.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              comments: [...post.comments, newComment],
            };
          }
          return post;
        });
      });
      setComments([...comments, newComment]);
    } catch (error) {
      return setComments(comments);
    }
  };

  const removeCom = async (id: string) => {
    try {
      await axios.delete(
        process.env.REACT_APP_FETCH_APP + `/posts/commentRemove/${id}`,
        {
          withCredentials: true,
        }
      );

      queryClient.setQueryData<IPostResponse[]>("posts", (oldData) => {
        if (!oldData) return [];
        return oldData.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              comments: post.comments.filter((com) => com._id !== id),
            };
          }
          return post;
        });
      });
      setComments(comments.filter((com) => com._id !== id));
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <>
      <StyledComments>
        {comments?.map((comment) => (
          <StyledComment key={comment._id}>
            <StyledProfileLogo src={comment.user?.photoURL} alt="profile logo" />
            <Username>
              {comment.user?.displayName ||
                comment.user?.email ||
                "Deleted User"}
              :&nbsp;
            </Username>
            {comment.comment}
            {(user && comment.user?._id === user?._id) || (user && postUser?._id === user?._id) ? (
              <RemoveButton>
                <StyledTrash
                  onClick={() => removeCom(comment._id)}
                  src="https://maszaweb.pl:8880/uploads/defaults/recycle-bin-line-icon.png"
                  alt=""
                />
              </RemoveButton>
            ) : (
              ""
            )}
          </StyledComment>
        ))}
        {user && (
          <AddComment>
            <input ref={commentRef} type="text" placeholder="Add comment..." />
            <button onClick={handleAddComment}>Send</button>
          </AddComment>
        )}
      </StyledComments>
    </>
  );
};

export default Comments;

import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { ILikes, IPostsResponse, IUser } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { updateLikes } from "../../api/api";

interface WithLikeProps {
  postData: IPostsResponse;
}

interface IProps {
  postData: IPostsResponse;
  handleLikeClick: () => void;
  user: IUser | null;
  setLiked: React.Dispatch<React.SetStateAction<boolean>>;
  liked: boolean;
  likes: string[];
}

const withLike = (WrappedComponent: React.FC<IProps>) => {
  const WithLike: React.FC<WithLikeProps> = ({ postData }) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [isLiked, setIsLiked] = useState<boolean>(
      postData.likes.some((like) => like === user?._id)
    );
    const [likes, setLikes] = useState<string[]>(postData.likes);
    const queryClient = useQueryClient();


    const handleLikeClick = async () => {
      if (!user) return;

      const newLikes = isLiked ? likes.filter((like) => like !== user._id) : [...likes, user._id];
      await updateLikes(postData._id, newLikes, likes ,isLiked, queryClient,  setLikes, setIsLiked);
    };

    return (
      <WrappedComponent
        postData={postData}
        handleLikeClick={handleLikeClick}
        user={user}
        setLiked={setIsLiked}
        liked={isLiked}
        likes={likes}
      />
    );
  };

  return WithLike;
};

export default withLike;

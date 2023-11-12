import React, { useState } from "react";
import { useQueryClient } from "react-query";
import axios from "axios";
import { ILikes, IPostResponse, IUser } from "../../interfaces/interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

interface WithLikeProps {
  postData: IPostResponse;
}

interface IProps {
  postData: IPostResponse;
  handleLikeClick: () => void;
  user: IUser | null;
  setLiked: React.Dispatch<React.SetStateAction<boolean>>;
  liked: boolean;
  likes: ILikes[];
}

const withLike = (WrappedComponent: React.FC<IProps>) => {
  const WithLike: React.FC<WithLikeProps> = ({ postData }) => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [isLiked, setIsLiked] = useState<boolean>(
      postData.likes.some((like) => like === user?._id)
    );
    const [likes, setLikes] = useState<ILikes[]>(postData.likes);
    const queryClient = useQueryClient();

    const updateLikes = async (newLikes: ILikes[]) => {
      setLikes(newLikes);
      setIsLiked(!isLiked);
      await axios.put(
        process.env.REACT_APP_FETCH_APP + `/posts/likePost/${postData._id}`,
        null,
        {
          withCredentials: true,
        }
      );
      queryClient.setQueriesData(
        "posts",
        (oldData: IPostResponse[] | undefined) => {
          if (!oldData) return [];
          return oldData.map((post) =>
            post._id === postData._id ? { ...post, likes: newLikes } : post
          );
        }
      );
    };

    const handleLikeClick = async () => {
      if (!user) return;

      const newLikes = isLiked
        ? likes.filter((like) => like !== user?._id)
        : [...likes, user._id as ILikes];

      await updateLikes(newLikes);
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

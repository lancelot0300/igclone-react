import { doc, updateDoc } from 'firebase/firestore';
import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { db } from '../../config/config';
import { ILike } from '../../interfaces/interfaces';
import { RootState } from '../../state/store';

interface IProps {
    likes: ILike[] | undefined;
    postId: string;
}

const Likes:FC<IProps> = ({likes, postId}) => {

  const {user} = useSelector((state: RootState) => state.auth);
  const [liked, setLiked] = React.useState(likes?.find((like) => like.userId === user.uid) ? true : false)
  const [likesCount, setLikesCount] = React.useState(likes?.length || 0);


    const handleClick = () => {
        let newLikes = likes ? [...likes] : [];
        if (liked) {
            setLiked(false);
            setLikesCount(likesCount - 1);
            newLikes = newLikes.filter((like) => like.userId !== user.uid);
        } else {
            setLiked(true);
            setLikesCount(likesCount + 1);
            newLikes.push({userId: user.uid})
        }
        updateDoc(doc(db, 'posts', postId), {
            likes: newLikes
        })
    }

 


  return (
   <>
    <button onClick={handleClick}>{liked ? 'Unlike' : 'Like'}</button>
    {likes && <p>{likesCount} likes</p>}
   </>
  )
}

export default Likes
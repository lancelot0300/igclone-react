import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Post } from '../../components/Post/Post';
import usePosts from '../../hooks/usePosts';
import { RootState } from '../../state/store';

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }

  h2{
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    font-weight: 600;
  }
  `
const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
`

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const {posts, getUserPosts } = usePosts();

  useEffect(() => {
    const fetchPosts = async () => {
      await getUserPosts(user.uid);
    };
    fetchPosts();
  }, [getUserPosts, user.uid]);

  return (
    <>
    <User>
      <img src={user.photoURL} alt="avatar"  width={150} height={150}/>
      <h2>{user.displayName}</h2>
      <p>Posty: {posts.length}</p>
    </User>
    <Posts>
      {posts.map((post) => (
        <Post key={post.id} data={post} />
      ))}
    </Posts>
    </>
    
  )
}

export default Profile
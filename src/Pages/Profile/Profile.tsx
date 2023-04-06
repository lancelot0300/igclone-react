import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ProfileImages } from "../../components/ProfileImages/ProfileImages";
import usePosts from "../../hooks/usePosts";
import { IData } from "../../interfaces/interfaces";

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }

  img {
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    aspect-ratio: 1/1;

    @media (max-width: 768px) {
      width: 120px;
      height: 120px;
    }
  }

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    font-weight: 600;
  }
`;
const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  margin: 20px 50px;
  width: 95%;
  max-width: 1000px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Profile = () => {
  const { postsState } = usePosts();
  let { id } = useParams();
  const [userPosts, setUserPosts] = useState<IData[]>([]);

  useEffect(() => {
    const userPosts = postsState.filter((post) => post.data.userId === id);
    setUserPosts(userPosts);
    return () => {
      setUserPosts([]);
    };
  }, [id, postsState]);

  if (!postsState) return <h1>Loadig...</h1>;
  if (!userPosts) return <h1>Fetching User Posts...</h1>;
  if (!userPosts[0]) return <h1>No Posts or User</h1>;

  return (
    <>
      <User>
        <img
          src={userPosts[0].data.userPhoto}
          alt="avatar"
          width={150}
          height={150}
        />
        <h2>{userPosts[0].data.userName}</h2>
        <p>Posty: {userPosts.length}</p>
      </User>
      <Posts>
        {userPosts.map((post, index) => (
          <ProfileImages key={index} data={post} />
        ))}
      </Posts>
    </>
  );
};

export default Profile;

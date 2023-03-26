import { useSelector } from "react-redux";
import styled from "styled-components";
import { ProfileImages } from "../../components/ProfileImages/ProfileImages";
import usePosts from "../../hooks/usePosts";
import { RootState } from "../../state/store";

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;


  img {
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
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
  margin: 20px auto;
  width: 100%;
  max-width: 1000px;
`;


const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const {getUserPosts} = usePosts();
  const userPosts = getUserPosts(user.uid);

  return (
    <>
      <User>
        <img src={user.photoURL} alt="avatar" width={150} height={150} />
        <h2>{user.displayName || user.email}</h2>
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

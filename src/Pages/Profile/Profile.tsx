import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ProfileImages } from "../../components/ProfileImages/ProfileImages";
import { IPostResponse, IProfile } from "../../interfaces/interfaces";
import { useFetch } from "../../hooks/useFetch";

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
  const { id } = useParams();
  const {data, isError, isFetching} = useFetch<IProfile>("/profile/" + id);

  if(id === 'no-user') return (<div>No User</div>)

  if (isFetching) {
    return <div>Loading...</div>;
  }
  if(isError) return (<div>Something went wrong...</div>)

  const {user, posts} = data || {};

  return (
    <>
      <User>
        <img
          src={user?.photoURL || "https://maszaweb.pl:8880/uploads/defaults/young-businessman-icon.png"}
          alt="avatar"
          width={150}
          height={150}
        />
        <h2>{user?.displayName || user?.email}</h2>
        <p>Posty: {posts?.length || 0}</p>
      </User>
      <Posts>
        {posts?.map((post : IPostResponse) => (
          <ProfileImages key={post._id} post={post} />
        ))}
      </Posts>
    </>
  );
};

export default Profile;

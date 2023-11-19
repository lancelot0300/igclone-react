import { useParams } from "react-router-dom";
import { ProfileImages } from "../../components/ProfileImages/ProfileImages";
import { IPostsResponse, IProfile } from "../../interfaces/interfaces";
import { useFetch } from "../../hooks/useFetch";
import { Posts, User } from "./Profile.styles";


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
        {posts?.map((post : IPostsResponse) => (
          <ProfileImages key={post._id} post={post} />
        ))}
      </Posts>
    </>
  );
};

export default Profile;

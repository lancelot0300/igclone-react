import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div>
      <h1>Profile</h1>
      <p>{user.email}</p>
    </div>
  )
}

export default Profile
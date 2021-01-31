import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ImgStyle, ProfileImageStyle } from '../Styles/style';
import ShowProfile from './ShowProfile';

const UserProfile = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [showUserProfile, setshowUserProfile] = useState(false);
  const onClickShowUserProfile = () => {
    setshowUserProfile((pre) => !pre);
  };
  return (
    <div style={{ float: 'right' }} onClick={onClickShowUserProfile}>
      <ProfileImageStyle>
        <ImgStyle src={userInfo?.img} />
      </ProfileImageStyle>

      {showUserProfile ? <ShowProfile /> : <></>}
    </div>
  );
};

export default UserProfile;

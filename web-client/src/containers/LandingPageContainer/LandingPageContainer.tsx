import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppState } from 'src/store';

import { LandingPageProps } from './constants';

const LoginContainer: React.FC<LandingPageProps> = () => {
  const dispatch = useDispatch();
  const coords = useSelector((state: AppState) => state.user.geolocation);
  const history = useHistory();

  const handleLoginFacebook = () => {
    dispatch(getUserGeolocationAction());
  };

  return (
    <>
      <LandingPage />
    </>
  );
};

LoginContainer.propTypes = {};

export default LoginContainer;

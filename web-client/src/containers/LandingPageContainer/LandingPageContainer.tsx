import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserGeolocationAction } from 'src/ducks/user/actions';
import { AppState } from 'src/store';

import LandingPage from '../../components/LandingPage/LandingPage';
import { LandingPageProps } from './constants';

const LandingPageContainer: React.FC<LandingPageProps> = () => {
  const dispatch = useDispatch();
  const coords = useSelector((state: AppState) => state.user.coords);

  const handleGetCoords = () => {
    alert('getting coordinates');
    dispatch(getUserGeolocationAction());
  };

  return (
    <>
      <LandingPage onGetCoords={handleGetCoords} />
    </>
  );
};

LandingPageContainer.propTypes = {};

export default LandingPageContainer;

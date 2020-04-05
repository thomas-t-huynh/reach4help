import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserGeolocationAction } from 'src/ducks/user/actions';
import { AppState } from 'src/store';

import LandingPage from '../../components/LandingPage/LandingPage';
import LandingPageNoGeo from '../../components/LandingPage/LandingPageNoGeo';
import { LandingPageProps } from './constants';

const LandingPageContainer: React.FC<LandingPageProps> = () => {
  const dispatch = useDispatch();
  let coords = useSelector((state: AppState) => state.user.coords);

  const [geolocationAvailabe, setGeoAvailable] = useState(false);
  const [coordsExist, setCoordsExist] = useState(false);

  const handleGetCoords = () => {
    if ('geolocation' in navigator) {
      setGeoAvailable(true);

      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(position => {
        coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoordsExist(true);
        dispatch(setUserGeolocationAction(coords));
      });
    } else {
      /* geolocation IS NOT available */
      // navigate user to other page
    }
  };

  return (
    <>
      <LandingPage
        coordsExist={coordsExist}
        coords={coords}
        onGetCoords={handleGetCoords}
      />
    </>
  );
};

LandingPageContainer.propTypes = {};

export default LandingPageContainer;

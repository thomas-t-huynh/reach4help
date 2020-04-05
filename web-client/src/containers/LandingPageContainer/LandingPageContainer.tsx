import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserGeolocationAction } from 'src/ducks/user/actions';
import { AppState } from 'src/store';
import styled from 'styled-components';

import LandingPage from '../../components/LandingPage/LandingPage';
import LandingPageNoGeo from '../../components/LandingPage/LandingPageNoGeo';
import { LandingPageProps } from './constants';

const Overlay = styled.div`
  z-index: 10000;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const LandingPageContainer: React.FC<LandingPageProps> = () => {
  const dispatch = useDispatch();
  let coords = useSelector((state: AppState) => state.user.coords);

  const [isLoading, setIsLoading] = useState(false);
  const [geolocationAvailabe, setGeoAvailable] = useState<boolean | undefined>(
    undefined,
  );
  const [geolocationAuthorized, setGeoAuthorized] = useState(false);
  const [coordsExist, setCoordsExist] = useState(false);

  // Test if browser has support for geolocation
  useEffect(() => {
    const geoTest = 'geolocation' in navigator;
    setGeoAvailable(geoTest);
  }, []);

  const handleGetCoords = () => {
    setIsLoading(true);

    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(
      position => {
        setIsLoading(false);
        setGeoAuthorized(true);
        coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoordsExist(true);
        dispatch(setUserGeolocationAction(coords));
      },
      GeolocationPositionError => {
        setIsLoading(false);
        if (GeolocationPositionError.code === 1) {
          setGeoAuthorized(false);
        }
      },
    );

    // /* geolocation IS NOT available */
    // let countries = '';
    // setIsLoading(true);
    // fetch(`/assets/countries.min.json`)
    //   .then(response => response.json())
    //   .then(json => {
    //     setIsLoading(false);
    //     countries = json;
    //   })
    //   .catch(e => {
    //     console.error('Error:', e);
    //     setIsLoading(false);
    //   });
  };

  return (
    <>
      {isLoading && <Overlay id="overlay" />}
      {(geolocationAvailabe === undefined || geolocationAvailabe === true) && (
        <LandingPage
          coordsExist={coordsExist}
          coords={coords}
          onGetCoords={handleGetCoords}
        />
      )}
      {geolocationAvailabe === false && <LandingPageNoGeo />}
    </>
  );
};

LandingPageContainer.propTypes = {};

export default LandingPageContainer;

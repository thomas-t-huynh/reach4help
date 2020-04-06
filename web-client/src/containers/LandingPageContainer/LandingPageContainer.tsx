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
  const [isLoading, setIsLoading] = useState(false);
  const [coordsExist, setCoordsExist] = useState(false);

  const [geolocationAvailabe, setGeoAvailable] = useState<boolean | undefined>(
    undefined,
  );
  const [geolocationAuthorized, setGeoAuthorized] = useState<
    undefined | boolean
  >(undefined);

  let coords = useSelector((state: AppState) => state.user.coords);

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
        const newCoords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        dispatch(setUserGeolocationAction(newCoords));
        setCoordsExist(true);
      },
      GeolocationPositionError => {
        setGeoAuthorized(false);
        setIsLoading(false);
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

      {(geolocationAvailabe === undefined || geolocationAvailabe === true) &&
        geolocationAuthorized !== false && (
          <LandingPage
            coordsExist={coordsExist}
            onGetCoords={handleGetCoords}
          />
        )}
      {geolocationAuthorized === false && <p>Geolocation not authorized.</p>}
      {geolocationAvailabe === false && <LandingPageNoGeo />}
    </>
  );
};

LandingPageContainer.propTypes = {};

export default LandingPageContainer;

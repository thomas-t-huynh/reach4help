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

const IF = styled.iframe`
  width: 10px;
  height: 10px;

  pointer-events: none;
  boder: 1px solid red;
`;

const LandingPageContainer: React.FC<LandingPageProps> = () => {
  const dispatch = useDispatch();

  const iframegeo = React.createRef();

  let coords = useSelector((state: AppState) => state.user.coords);

  const [isLoading, setIsLoading] = useState(false);
  const [showIFrame, setShowIFrame] = useState(false);
  const [geolocationAvailabe, setGeoAvailable] = useState<boolean | undefined>(
    undefined,
  );
  const [geolocationAuthorized, setGeoAuthorized] = useState<
    undefined | boolean
  >(undefined);
  const [coordsExist, setCoordsExist] = useState(false);

  // Test if browser has support for geolocation
  useEffect(() => {
    const geoTest = 'geolocation' in navigator;
    setGeoAvailable(geoTest);
  }, []);

  const addEVT = (ref: any) => {
    if (ref !== null) {
      ref.contentWindow.addEventListener('message', (message: any) => {
        // eslint-disable-next-line no-param-reassign
        // message = JSON.parse(message.data);
        console.log(message);
        // if (message.type === 'success') {

        // } else {
        // }
        // const message = JSON.parse(msg.data);
        if (
          typeof message.data !== 'undefined' &&
          typeof message.data.geoMessage !== 'undefined' &&
          message.data.geoMessage === true
        ) {
          setTimeout(() => {
            try {
              ref.contentWindow.removeEventListner('message');
              setShowIFrame(false);
              setIsLoading(false);
            } catch (e) {
              // do nothing
              setShowIFrame(false);
              setIsLoading(false);
            }
          }, 500);
        }
      });
    }
  };

  const handleGetCoords = () => {
    setIsLoading(true);
    setShowIFrame(true);

    // let ifr = document.createElement('iframe');
    // ifr.style.opacity = '0';
    // ifr.style.pointerEvents = 'none';
    // ifr.src = `${window.location.origin}/dummygeo.html`;

    /* geolocation is available */
    // navigator.geolocation.getCurrentPosition(
    //   position => {
    //     setIsLoading(false);
    //     setGeoAuthorized(true);
    //     coords = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude,
    //     };
    //     setCoordsExist(true);
    //     dispatch(setUserGeolocationAction(coords));
    //   },
    //   GeolocationPositionError => {
    //     setIsLoading(false);
    //     if (GeolocationPositionError.code === 1) {
    //       setGeoAuthorized(false);
    //     }
    //   },
    // );

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
      {showIFrame && (
        <IF
          ref={ref => addEVT(ref)}
          title="Geolocation"
          src={`/dummygeo.html?w=${Math.random() * 10000}`}
        />
      )}
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

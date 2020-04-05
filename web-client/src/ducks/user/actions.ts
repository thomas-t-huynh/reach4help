import { CoordsAction, SETGEOLOCATION } from './types';

export const setUserGeolocationAction = (payload: CoordsAction) => (
  dispatch: Function,
) => {
  dispatch({
    type: SETGEOLOCATION,
    payload,
  });
};

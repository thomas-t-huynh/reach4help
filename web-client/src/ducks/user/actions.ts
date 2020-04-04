import { GETGEOLOCATION } from './types';

export const getUserGeolocationAction = () => (dispatch: Function) => {
  dispatch({
    type: GETGEOLOCATION,
  });
};

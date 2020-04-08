import createReducer from 'src/store/utils/createReducer';

import { SETGEOLOCATION } from './types';

interface Coords {
  lat: number;
  lng: number;
}

interface UserState {
  coords?: Coords;
}

const initialState: UserState = {
  coords: undefined,
};

export default createReducer<UserState>(
  {
    [SETGEOLOCATION]: (state: UserState, { payload }: { payload: Coords }) => {
      state.coords = payload;
    },
  },
  initialState,
);

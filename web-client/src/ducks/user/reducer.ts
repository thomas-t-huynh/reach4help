import createReducer from 'src/store/utils/createReducer';

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
    USER_SET_GEO: (
      state: UserState,
      { payload }: { payload: { coords: Coords } },
    ) => {
      state.coords = payload.coords;
    },
  },
  initialState,
);

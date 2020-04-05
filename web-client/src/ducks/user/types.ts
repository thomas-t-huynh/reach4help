import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

export const { syncType } = createActionTypeFactory('USER');
export const SETGEOLOCATION = syncType('SET_GEO');

export interface CoordsAction {
  lat: number;
  lng: number;
}

import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

export const { syncType } = createActionTypeFactory('USER');
export const GETGEOLOCATION = syncType('SET_GEO');

// export const ADD_TODO = 'ADD_TODO'

// export function addTodo(text) {
//     return { type: ADD_TODO, text }
//   }

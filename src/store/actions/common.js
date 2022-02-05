const createAction = (type, payload) => ({ type, payload });

/* type */
export const CREATE_TEST = 'CREATE_TEST';

export const createTest = (payload) => createAction(CREATE_TEST, payload)
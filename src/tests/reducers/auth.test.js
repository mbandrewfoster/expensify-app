import authReducer from '../../reducers/auth';

test('should set uid on login', () => {
  const uid = '213asfk13';
  const action = { 
    type: 'LOGIN',
    uid
  };
  const state = authReducer(undefined, action);
  expect(state.uid).toBe(uid);
});

test('should clear uid on logout', () => {
  const state = authReducer({ uid: '123asdsdfsdf1' }, { type: 'LOGOUT' });
  expect(state.uid).toEqual({});
});
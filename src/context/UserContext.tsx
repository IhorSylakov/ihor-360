'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

interface UserState {
  uid: string | null;
  username: string | null;
  email: string | null;
}

interface UserAction {
  type: 'SET_USER' | 'CLEAR_USER';
  payload?: Partial<UserState>;
}

const initialState: UserState = {
  uid: null,
  username: null,
  email: null,
};

function userReducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, ...action.payload };
    case 'CLEAR_USER':
      return { ...initialState };
    default:
      return state;
  }
}

const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    try {
      const savedUser = sessionStorage.getItem('user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        dispatch({
          type: 'SET_USER',
          payload: parsedUser,
        });
      }
    } catch (error) {
      console.error('Ошибка чтения из sessionStorage:', error);
    }
  }, []);
  
  useEffect(() => {
    try {
      if (state.uid) {
        sessionStorage.setItem('user', JSON.stringify(state));
      }
    } catch (error) {
      console.error('Ошибка записи в sessionStorage:', error);
    }
  }, [state]);
  

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

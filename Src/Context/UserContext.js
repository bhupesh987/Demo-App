import React, {useContext, useState} from 'react';

export const UserContext = React.createContext({
  isAuth: false,
  updateIsAuth: () => {},
  currentLocation: {},
  updateCurrentLocation: () => {},
});
export const UserProvider = ({children}) => {
  const [isAuth, setIsAuth] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({});

  return (
    <UserContext.Provider
      value={{
        isAuth,
        updateIsAuth: setIsAuth,
        currentLocation,
        updateCurrentLocation: setCurrentLocation,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const {isAuth, updateIsAuth} = useContext(UserContext);
  return {isAuth, updateIsAuth};
};

export const useLocation = () => {
  const {currentLocation, updateCurrentLocation} = useContext(UserContext);
  return {currentLocation, updateCurrentLocation};
};

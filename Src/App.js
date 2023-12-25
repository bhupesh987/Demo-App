import React from 'react';
import {UserProvider} from './Context/UserContext';
import MainNavigation from './Navigation/MainNavigation';

const App = () => {
  return (
    <UserProvider>
      <MainNavigation />
    </UserProvider>
  );
};

export default App;

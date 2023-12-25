import React, {useEffect, useState} from 'react';
import {useAuth} from '../Context/UserContext';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import RootStack from './RootStack';
import SplashScreen from 'react-native-splash-screen';
import {IS_AUTH} from '../Constants';
import {GET_ASYNC_DATA} from '../Async';
import Loader from '../Components/Loader';
import {StatusBar} from 'react-native';
import {COLORS} from '../Assets';

const MainNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const {isAuth, updateIsAuth} = useAuth();

  useEffect(() => {
    checkLoginUser();
  }, [isAuth]);

  const checkLoginUser = async () => {
    const auth = await GET_ASYNC_DATA(IS_AUTH);
    console.log(auth);
    setIsLoggedIn(auth == 'true');
    updateIsAuth(auth == 'true');
    setLoading(false);
    if (auth == 'true') {
      StatusBar.setBackgroundColor(COLORS.primary);
    }
  };

  return (
    <NavigationContainer onReady={() => SplashScreen.hide()}>
      {loading ? <Loader /> : isLoggedIn ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigation;

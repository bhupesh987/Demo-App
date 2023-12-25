import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputBox from '../Components/InputBox';
import {COLORS, FONTS} from '../Assets';
import Button from '../Components/Button';
import {IS_AUTH, emailRegex, isValidForm} from '../Constants';
import {useAuth} from '../Context/UserContext';
import {SET_ASYNC_DATA} from '../Async';

const Login = () => {
  const {updateIsAuth} = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handlePress = async () => {
    let error = {
      email: !emailRegex.test(email) ? 'Email is invalid' : '',
      password: !password ? 'Password is required' : '',
    };
    setErrors(error);

    if (isValidForm(error)) {
      if (email?.toLowerCase() === 'demouser@gmail.com' && password === 'Demo@123') {
        ToastAndroid.show('Logged in successfully', ToastAndroid.SHORT);
        updateIsAuth(true);
        await SET_ASYNC_DATA(IS_AUTH, 'true');
        StatusBar.setBackgroundColor(COLORS.primary);
      } else
        ToastAndroid.show(
          'Invalid credentials. Please try again.',
          ToastAndroid.SHORT,
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Text style={styles.welcomeText}>Welcome to Demo App</Text>

        <View style={styles.section}>
          <InputBox
            title={'Email'}
            value={email}
            onChangeText={e => {
              setEmail(e);
              setErrors({...errors, email: ''});
            }}
            placeholder={'Enter Email'}
            keyboardType={'email-address'}
            error={errors?.email}
          />

          <InputBox
            title={'Password'}
            value={password}
            onChangeText={e => {
              setPassword(e);
              setErrors({...errors, password: ''});
            }}
            placeholder={'Enter Password'}
            error={errors?.password}
            secure
          />

          <Button title={'Login'} onPress={handlePress} style={styles.button} />
        </View>
        <View>
          <View style={styles.accountSection}>
            <Text style={styles.notHaveAccount}>Not have an account?</Text>
            <Text style={styles.createAccount}>Sign Up</Text>
          </View>
          <Text style={styles.forgotText}>Forgot Password</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  welcomeText: {
    color: COLORS.black,
    fontFamily: FONTS.medium,
    fontSize: 18,
  },
  section: {
    marginTop: '20%',
  },
  button: {
    marginTop: 20,
  },
  accountSection: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '10%',
  },
  notHaveAccount: {
    color: COLORS.black,
    fontFamily: FONTS.regular,
    fontSize: 14,
  },
  createAccount: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: 14,
    marginLeft: 5,
  },
  forgotText: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: 14,
    marginTop: 5,
    alignSelf: 'center',
  },
});

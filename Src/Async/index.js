import AsyncStorage from '@react-native-async-storage/async-storage';

export const GET_ASYNC_DATA = async key => {
  const data = await AsyncStorage.getItem(key);
  if (!!data) return JSON.parse(data);
  else return null;
};

export const SET_ASYNC_DATA = async (key, val) => {
  if (!!(key && val)) {
    await AsyncStorage.setItem(key, JSON.stringify(val));
    return true;
  } else return false;
};

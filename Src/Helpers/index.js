import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

export const checkUserLocation = async () => {
  try {
    const result = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    switch (result) {
      case RESULTS.UNAVAILABLE:
        throw new Error(RESULTS.BLOCKED);

      case RESULTS.DENIED:
        return await requestPermission();

      case RESULTS.LIMITED:
        throw new Error(RESULTS.BLOCKED);

      case RESULTS.GRANTED:
        return RESULTS.GRANTED;

      case RESULTS.BLOCKED:
        throw new Error(RESULTS.BLOCKED);
    }
  } catch (error) {
    console.error('Error in checkUserLocation:', error);
    throw error;
  }
};

const requestPermission = async () => {
  try {
    const result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    result !== 'blocked' && checkUserLocation();
    return result;
  } catch (error) {
    console.error('Error in requestPermission:', error);
  }
};

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve(position);
      },
      error => {
        console.error('Error getting location:', error.code, error.message);
        reject(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  });
};

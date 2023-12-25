export const NEARBY_API = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=';
export const GOOGLE_IMAGE = img => `https://maps.googleapis.com/maps/api/place/photo?photoreference=${img}&maxwidth=600&key=${API_KEY}`;
export const API_KEY = '';
export const DUMMY_IMAGE = 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png';

export const IS_AUTH = 'IS_AUTH';
export const USER_LOCATION = 'USER_LOCATION';

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isValidForm = (form = {}) => {
  let valid = true;
  for (const field in form) {
    if (Object.hasOwnProperty.call(form, field)) {
      const error = form[field];
      valid = valid && !error;
    }
  }
  return valid;
};

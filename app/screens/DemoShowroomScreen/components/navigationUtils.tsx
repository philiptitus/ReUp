// navigationUtils.js
import * as Location from 'expo-location';
import axios from 'axios';
import { Vibration } from 'react-native';

export const getRouteDetails = async (start, end, apiKey) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}&key=${apiKey}`
    );
    return response.data.routes[0];
  } catch (error) {
    console.error('Error fetching route details:', error);
    throw error;
  }
};

export const decodePolyline = (t) => {
  let points = [];
  for (let step = 0, x = 0, y = 0, i = 0; i < t.length;) {
    let b, shift = 0, result = 0;
    do {
      b = t.charCodeAt(i++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dx = (result & 1) ? ~(result >> 1) : (result >> 1);
    x += dx;
    shift = result = 0;
    do {
      b = t.charCodeAt(i++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    let dy = (result & 1) ? ~(result >> 1) : (result >> 1);
    y += dy;
    points.push({ latitude: x * 1e-5, longitude: y * 1e-5 });
  }
  return points;
};

export const getDistance = (start, end) => {
  const radlat1 = Math.PI * start.latitude / 180;
  const radlat2 = Math.PI * end.latitude / 180;
  const theta = start.longitude - end.longitude;
  const radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515 * 1.609344; // in km
  return dist;
};

export const getCurrentLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission to access location was denied');
  }
  let location = await Location.getCurrentPositionAsync({});
  return location.coords;
};

export const vibrate = () => {
  Vibration.vibrate();
};



export const stripHTML = (html) => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};


// utils.js
import { PermissionsAndroid, Alert } from 'react-native';

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'This app needs access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('Permission Denied', 'Location permission is required to use this feature.');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const handleDrawRoute = (setRouteCoordinates) => (startCoordinate, endCoordinate, decodedPolyline) => {
  setRouteCoordinates(decodedPolyline);
};

export const handleLongPress = (region, setNewCoordinates, setIsAreaModalVisible, setIsPointModalVisible) => (event) => {
  const coordinates = event.nativeEvent.coordinate;
  if (region.latitudeDelta < 0.01 && region.longitudeDelta < 0.01) {
    setNewCoordinates(coordinates);
    Alert.alert(
      'Choose Action',
      'Do you want to create an area or a point?',
      [
        { text: 'Create Area', onPress: () => setIsAreaModalVisible(true) },
        { text: 'Create Point', onPress: () => setIsPointModalVisible(true) },
        { text: 'Cancel', onPress: () => {} },
      ]
    );
  } else {
    Alert.alert('Zoom In', 'Please zoom in closer to add a point or area.');
  }
};

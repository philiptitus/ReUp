// styles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  callout: {
    width: 150,
  },
  calloutTitle: {
    fontWeight: 'bold',
  },
  walkButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  walkButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  areaMarker: {
    transform: [{ scale: 2 }],
  },
  pointMarker: {
    transform: [{ scale: 1 }],
  },
  container2: {

  },
  iconButton2: {
    backgroundColor: '#d9534f',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  cameraComponent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
});

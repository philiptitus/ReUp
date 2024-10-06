


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import { getCurrentLocation, decodePolyline, getDistance, vibrate, stripHTML } from './navigationUtils';
// import VoiceDirections from './VoiceDirections';
// import { useDispatch, useSelector } from 'react-redux';
// import { verifyTrash, resetVerifyTrash } from '../../../../server/actions/trashActions';

// const TurnByTurn = ({ route, onEndNavigation, point }) => {
//   const [currentLocation, setCurrentLocation] = useState(null);
//   const [remainingDistance, setRemainingDistance] = useState(null);
//   const [instructions, setInstructions] = useState([]);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [voiceActive, setVoiceActive] = useState(false);
//   const [currentStepIndex, setCurrentStepIndex] = useState(0);
//   const [arrived, setArrived] = useState(false); // New state to track arrival
//   const [totalDistanceCovered, setTotalDistanceCovered] = useState(0);
//   const dispatch = useDispatch();
//   const { loading, error, success } = useSelector(state => state.verifyTrash);

//   useEffect(() => {
//     let intervalId;
    
//     const watchPosition = async () => {
//       try {
//         const location = await getCurrentLocation();
//         setCurrentLocation(location);
//       } catch (error) {
//         console.error(error);
//       }
//     };
    
//     if (!arrived) {
//       watchPosition();
//       intervalId = setInterval(watchPosition, 5000); // Update location every 5 seconds
//     }
    
//     return () => clearInterval(intervalId);
//   }, [arrived]);

//   useEffect(() => {
//     if (currentLocation && route && route.legs && route.legs[0]) {
//       const { legs } = route;
//       const steps = legs[0].steps || [];
//       const cleanedSteps = steps.map(step => ({
//         ...step,
//         html_instructions: stripHTML(step.html_instructions),
//       }));
//       setInstructions(cleanedSteps);
//       const end = legs[0].end_location
//         ? {
//             latitude: legs[0].end_location.lat,
//             longitude: legs[0].end_location.lng,
//           }
//         : null;
//       if (end) {
//         setRemainingDistance(getDistance(currentLocation, end));
//       }
//     }
//   }, [currentLocation, route]);

//   useEffect(() => {
//     if (currentLocation && instructions.length > 0) {
//       const nextStep = instructions[currentStepIndex];
//       const nextStepLocation = nextStep.end_location
//         ? {
//             latitude: nextStep.end_location.lat,
//             longitude: nextStep.end_location.lng,
//           }
//         : null;
//       if (nextStepLocation) {
//         const distanceToNextStep = getDistance(currentLocation, nextStepLocation);

//         if (distanceToNextStep < 0.05) { // If within 50 meters of the next step
//           vibrate();
//           if (currentStepIndex < instructions.length - 1) {
//             setCurrentStepIndex(currentStepIndex + 1);
//           } else {
//             setArrived(true); // Set arrived to true if this is the last step
//           }
//         }

//         const lastLocation = instructions[currentStepIndex - 1]?.end_location || currentLocation;
//         const distanceCovered = getDistance(lastLocation, currentLocation);
//         setTotalDistanceCovered(prevDistance => prevDistance + distanceCovered);
//       }
//     }
//   }, [currentLocation, instructions, currentStepIndex]);

//   useEffect(() => {
//     if (arrived) {
//       setRemainingDistance(0);
//       setInstructions([{ html_instructions: "You Have Arrived. Please Dispose Your Waste at the designated area." }]);

//       let status = 'no';
//       if (totalDistanceCovered > 0 && totalDistanceCovered < 0.05) {
//         status = 'no';
//       } else if (totalDistanceCovered >= 0.05) {
//         status = 'yes';
//       }

//       dispatch(verifyTrash( status));
//     }
//   }, [arrived]);

//   useEffect(() => {
//     if (success) {
//       Alert.alert('Success', 'Thank you for your contribution in making the earth cleaner.');
//       onEndNavigation();
//       dispatch(resetVerifyTrash())
//     }
//   }, [success]);

//   const handleEndNavigation = () => {
//     onEndNavigation();
//   };

//   const toggleFullscreen = () => {
//     setIsFullscreen(!isFullscreen);
//   };

//   return (
//     <View style={styles.container}>
//       {currentLocation && (
//         <MapView
//           style={isFullscreen ? styles.fullscreenMap : styles.map}
//           region={{
//             latitude: currentLocation.latitude,
//             longitude: currentLocation.longitude,
//             latitudeDelta: 0.01,
//             longitudeDelta: 0.01,
//           }}
//         >
//           <Marker
//             coordinate={currentLocation}
//             title="Your Position"
//             pinColor="aqua"
//           />
//           {route && route.legs && route.legs[0] && (
//             <>
//               <Polyline coordinates={decodePolyline(route.overview_polyline.points)} strokeColor="#000" strokeWidth={6} />
//               <Marker
//                 coordinate={{
//                   latitude: route.legs[0].end_location.lat,
//                   longitude: route.legs[0].end_location.lng,
//                 }}
//                 title="Destination"
//               />
//             </>
//           )}
//         </MapView>
//       )}
//       {isFullscreen && (
//         <TouchableOpacity onPress={toggleFullscreen} style={styles.exitFullscreenButton}>
//           <Text style={styles.buttonText}>X</Text>
//         </TouchableOpacity>
//       )}
//       {!isFullscreen && instructions.length > 0 && (
//         <View style={styles.instructions}>
//           <Text>Next Turn: {instructions[currentStepIndex].html_instructions}</Text>
//           <VoiceDirections instructions={instructions} voiceActive={voiceActive} setVoiceActive={setVoiceActive} />
//         </View>
//       )}
//       {!isFullscreen && remainingDistance !== null && (
//         <View style={styles.distance}>
//           <Text>Remaining Distance: {remainingDistance.toFixed(3)} km</Text>
//         </View>
//       )}
//       {!isFullscreen && loading && (
//         <ActivityIndicator size="large" color="#0000ff" />
//       )}
//       {!isFullscreen && error && (
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>Error: {error}</Text>
//         </View>
//       )}
//       {!isFullscreen && (
//         <TouchableOpacity onPress={handleEndNavigation} style={styles.endButton}>
//           <Text style={styles.buttonText}>End Navigation</Text>
//         </TouchableOpacity>
//       )}
//       {!isFullscreen && (
//         <TouchableOpacity onPress={toggleFullscreen} style={styles.fullscreenButton}>
//           <Text style={styles.buttonText}>Fullscreen</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   map: {
//     flex: 1,
//   },
//   fullscreenMap: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     zIndex: 1,
//   },
//   instructions: {
//     padding: 20,
//     backgroundColor: 'white',
//   },
//   buttonText: {
//     color: 'white',
//   },
//   distance: {
//     padding: 20,
//     backgroundColor: 'white',
//   },
//   endButton: {
//     backgroundColor: 'red',
//     padding: 10,
//     alignItems: 'center',
//     margin: 20,
//   },
//   fullscreenButton: {
//     position: 'absolute',
//     bottom: 10,
//     right: 10,
//     backgroundColor: 'green',
//     padding: 10,
//     alignItems: 'center',
//     zIndex: 2,
//   },
//   exitFullscreenButton: {
//     position: 'absolute',
//     top: 40,
//     right: 10,
//     backgroundColor: 'red',
//     padding: 10,
//     alignItems: 'center',
//     zIndex: 2,
//   },
//   errorContainer: {
//     padding: 20,
//     backgroundColor: 'white',
//   },
//   errorText: {
//     color: 'red',
//   },
// });

// export default TurnByTurn;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { getCurrentLocation, decodePolyline, getDistance, vibrate, stripHTML } from './navigationUtils';
import VoiceDirections from './VoiceDirections';
import { useDispatch, useSelector } from 'react-redux';
import { verifyTrash, resetVerifyTrash } from '../../../../server/actions/trashActions';
import { fetchRandomInsight } from '../../../../server/actions/trashActions'; // Import the action

const TurnByTurn = ({ route, onEndNavigation, point }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [remainingDistance, setRemainingDistance] = useState(null);
  const [instructions, setInstructions] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [arrived, setArrived] = useState(false); // New state to track arrival
  const [totalDistanceCovered, setTotalDistanceCovered] = useState(0);
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.verifyTrash);
  const { loading: insightLoading, error: insightError, insight } = useSelector(state => state.randomInsight);

  useEffect(() => {
    let intervalId;
    
    const watchPosition = async () => {
      try {
        const location = await getCurrentLocation();
        setCurrentLocation(location);
      } catch (error) {
        console.error(error);
      }
    };
    
    if (!arrived) {
      watchPosition();
      intervalId = setInterval(watchPosition, 5000); // Update location every 5 seconds
    }
    
    return () => clearInterval(intervalId);
  }, [arrived]);

  useEffect(() => {
    if (currentLocation && route && route.legs && route.legs[0]) {
      const { legs } = route;
      const steps = legs[0].steps || [];
      const cleanedSteps = steps.map(step => ({
        ...step,
        html_instructions: stripHTML(step.html_instructions),
      }));
      setInstructions(cleanedSteps);
      const end = legs[0].end_location
        ? {
            latitude: legs[0].end_location.lat,
            longitude: legs[0].end_location.lng,
          }
        : null;
      if (end) {
        setRemainingDistance(getDistance(currentLocation, end));
      }
    }
  }, [currentLocation, route]);

  useEffect(() => {
    if (currentLocation && instructions.length > 0) {
      const nextStep = instructions[currentStepIndex];
      const nextStepLocation = nextStep.end_location
        ? {
            latitude: nextStep.end_location.lat,
            longitude: nextStep.end_location.lng,
          }
        : null;
      if (nextStepLocation) {
        const distanceToNextStep = getDistance(currentLocation, nextStepLocation);

        if (distanceToNextStep < 0.05) { // If within 50 meters of the next step
          vibrate();
          if (currentStepIndex < instructions.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
          } else {
            setArrived(true); // Set arrived to true if this is the last step
          }
        }

        const lastLocation = instructions[currentStepIndex - 1]?.end_location || currentLocation;
        const distanceCovered = getDistance(lastLocation, currentLocation);
        setTotalDistanceCovered(prevDistance => prevDistance + distanceCovered);
      }
    }
  }, [currentLocation, instructions, currentStepIndex]);

  useEffect(() => {
    if (arrived) {
      setRemainingDistance(0);
      setInstructions([{ html_instructions: "You Have Arrived. Please Dispose Your Waste at the designated area." }]);

      let status = 'no';
      if (totalDistanceCovered > 0 && totalDistanceCovered < 0.05) {
        status = 'no';
      } else if (totalDistanceCovered >= 0.05) {
        status = 'yes';
      }

      dispatch(verifyTrash(status));
    }
  }, [arrived]);

  useEffect(() => {
    if (success) {
      dispatch(fetchRandomInsight()); // Dispatch fetchRandomInsight action on success
    }
  }, [success]);

  useEffect(() => {
    if (insight) {
      Alert.alert('Success', `Thank you for your contribution in making the earth cleaner.\nInsight: ${insight.description}`);
      onEndNavigation();
      dispatch(resetVerifyTrash());
    }
  }, [insight]);

  const handleEndNavigation = () => {
    onEndNavigation();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <View style={styles.container}>
      {currentLocation && (
        <MapView
          style={isFullscreen ? styles.fullscreenMap : styles.map}
          region={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={currentLocation}
            title="Your Position"
            pinColor="aqua"
          />
          {route && route.legs && route.legs[0] && (
            <>
              <Polyline coordinates={decodePolyline(route.overview_polyline.points)} strokeColor="#000" strokeWidth={6} />
              <Marker
                coordinate={{
                  latitude: route.legs[0].end_location.lat,
                  longitude: route.legs[0].end_location.lng,
                }}
                title="Destination"
              />
            </>
          )}
        </MapView>
      )}
      {isFullscreen && (
        <TouchableOpacity onPress={toggleFullscreen} style={styles.exitFullscreenButton}>
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
      )}
      {!isFullscreen && instructions.length > 0 && (
        <View style={styles.instructions}>
          <Text>Next Turn: {instructions[currentStepIndex].html_instructions}</Text>
          <VoiceDirections instructions={instructions} voiceActive={voiceActive} setVoiceActive={setVoiceActive} />
        </View>
      )}
      {!isFullscreen && remainingDistance !== null && (
        <View style={styles.distance}>
          <Text>Remaining Distance: {remainingDistance.toFixed(3)} km</Text>
        </View>
      )}
      {!isFullscreen && (loading || insightLoading) && (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
      {!isFullscreen && (error || insightError) && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error || insightError}</Text>
        </View>
      )}
      {!isFullscreen && (
        <TouchableOpacity onPress={handleEndNavigation} style={styles.endButton}>
          <Text style={styles.buttonText}>End Navigation</Text>
        </TouchableOpacity>
      )}
      {!isFullscreen && (
        <TouchableOpacity onPress={toggleFullscreen} style={styles.fullscreenButton}>
          <Text style={styles.buttonText}>Fullscreen</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  map: {
    flex: 1,
  },
  fullscreenMap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  instructions: {
    padding: 20,
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'white',
  },
  distance: {
    padding: 20,
    backgroundColor: 'white',
  },
  endButton: {
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    margin: 20,
  },
  fullscreenButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
    zIndex: 2,
  },
  exitFullscreenButton: {
    position: 'absolute',
    top: 40,
    right: 10,
    backgroundColor: 'red',
    padding: 10,
    alignItems: 'center',
    zIndex: 2,
  },
  errorContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
  },
});

export default TurnByTurn;

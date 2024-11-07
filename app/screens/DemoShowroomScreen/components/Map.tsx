import React, { useState, useEffect } from 'react';
import { View, Alert, Modal, Platform, TouchableOpacity, Text, ActivityIndicator , PermissionsAndroid, Button} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Polyline , Polygon} from 'react-native-maps';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import SearchComponent from './Search';
import NewAreaForm from './NewAreaForm';
import NewPointForm from './NewPointForm';
import Walk from './Walk';
import Notification from './Notifications';
import MarkerActionsModal from './MarkerActionsModal';
import UpdateNameForm from './UpdateNameForm';
import styles from './styles';
import { requestLocationPermission, handleDrawRoute, handleLongPress } from './utils';
import { Ionicons } from '@expo/vector-icons';
import CameraComponent from './CameraComponent';
import * as Location from 'expo-location';
import { deleteAdminArea, deletePoint, joinArea } from '../../../../server/actions/trashActions';
import TrashModal from './TrashModal';
import MarkerInfo from './MarkerInfo';
import Tip from './Tip';

const MapViewComponent = () => {
  const [region, setRegion] = useState({
    latitude: -1.287778,
    longitude: 36.790861,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const newYorkCoordinates = [
    { latitude: -1.2854040864611815, longitude: 36.77425396155437 },
    { latitude: -1.2687570693471029, longitude: 36.802663917654954 },
    { latitude: -1.293555936787721, longitude: 36.82034503837013 },
    { latitude: -1.3007638668444637, longitude: 36.77536976043445 }
];





  const [selectedPlace, setSelectedPlace] = useState(null);
  const [collectionPoints, setCollectionPoints] = useState([]);
  const [isAreaModalVisible, setIsAreaModalVisible] = useState(false);
  const [isPointModalVisible, setIsPointModalVisible] = useState(false);
  const [newCoordinates, setNewCoordinates] = useState(null);
  const [highlightedMarker, setHighlightedMarker] = useState(null);
  const [isWalkModalVisible, setIsWalkModalVisible] = useState(false);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isMarkerActionsModalVisible, setIsMarkerActionsModalVisible] = useState(false);
  const [isUpdateNameFormVisible, setIsUpdateNameFormVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);
  const [loadingAdminAreas, setLoadingAdminAreas] = useState(false);
  const [errorAdminAreas, setErrorAdminAreas] = useState(null);
  const [selectedStart, setSelectedStart] = useState(null);
  const dispatch = useDispatch()
  const [closestPoint, setClosestPoint] = useState(null);
  const [trashModalVisible, setTrashModalVisible] = useState(false);
  const [loadingPoints, setLoadingPoints] = useState(false);
  const [errorPoints, setErrorPoints] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [trashmodalVisible, settrashModalVisible] = useState(false);

  const handleOpenModal = () => {
      settrashModalVisible(true);
  };

  const handleCloseModal = () => {
      settrashModalVisible(false);
  };
  const getClosestPoint = (currentLocation, points) => {
    console.log("Function called with currentLocation:", currentLocation);
    console.log("Points:", points);
  
    if (!currentLocation || points.length === 0) {
      console.log("Invalid input: currentLocation or points are missing.");
      return null;
    }
  
    let closestPoint = null;
    let minDistance = Infinity;
  
    points.forEach(point => {
      const distance = Math.sqrt(
        Math.pow(currentLocation.latitude - point.coordinates.latitude, 2) +
        Math.pow(currentLocation.longitude - point.coordinates.longitude, 2)
      );
      if (distance < minDistance) {
        closestPoint = point;
        minDistance = distance;
      }
    });
  
    console.log("Closest point found:", closestPoint);
    if (closestPoint) {
      console.log("Closest point name (ID):", closestPoint.name);
    }
    setClosestPoint(closestPoint);  // Update the state
    return closestPoint;
  };
  


  

  useEffect(() => {
    const getCurrentLocation = async (retry = 3) => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        // console.log("hi");

        let location = await Location.getCurrentPositionAsync({});
        // console.log("this is the location", location);

        const { latitude, longitude } = location.coords;
        setSelectedStart({
          name: 'Current Location',
          coordinate: { latitude, longitude },
        });
      } catch (error) {
        console.error('Error getting location:', error);
        if (retry > 0) {
          console.log('Retrying to get location...');
          setTimeout(() => getCurrentLocation(retry - 1), 1000);
        }
      }
    };

    getCurrentLocation();
  }, []);


  
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    }
  }, []);


  useEffect(() => {
    if (selectedStart && collectionPoints.length > 0) {
      const currentLocation = {
        latitude: selectedStart.coordinate.latitude,
        longitude: selectedStart.coordinate.longitude
      };
  
      console.log("Calling getClosestPoint with currentLocation:", currentLocation);
  
      getClosestPoint(currentLocation, collectionPoints);
    }
  }, [selectedStart, collectionPoints]);
  

  useEffect(() => {
    const fetchAdminAreas = async () => {
      if (!userInfo) {
        setErrorAdminAreas('User not authenticated');
        setLoadingAdminAreas(false);
        return;
      }

      setLoadingAdminAreas(true);
      try {
        const response = await axios.get('https://squareapi.pythonanywhere.com/api/v1/admin-areas/', {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const adminAreas = response.data;
        const formattedAreas = adminAreas.map((area) => {
          const [latitude, longitude] = area.main_coordinate.split(',').map(coord => parseFloat(coord.trim()));
          return {
            id: area.id,

            name: area.name,
            coordinates: { latitude, longitude },
            type: 'admin_area',
          };
        });
        setCollectionPoints((prevPoints) => [...prevPoints, ...formattedAreas]);
      } catch (error) {
        setErrorAdminAreas(error.message || 'Error fetching admin areas');
      } finally {
        setLoadingAdminAreas(false);
      }
    };

    const fetchPoints = async () => {
      if (!userInfo) {
        setErrorPoints('User not authenticated');
        setLoadingPoints(false);
        return;
      }

      setLoadingPoints(true);

      if (!selectedStart) {

        // console.log("There is a selected start")
        try {
          // const formattedCoordinates = `${selectedStart.coordinate.latitude},${selectedStart.coordinate.longitude}`;
          const formattedCoordinates2 = `${-1.2875063251042207},${36.79738496874182}`;


          const formData = new FormData();

          

          if (!userInfo?.is_demo) {
        const formattedCoordinates = `${selectedStart.coordinate.latitude},${selectedStart.coordinate.longitude}`;

          formData.append('coordinates', formattedCoordinates);

          } else {
          formData.append('coordinates', formattedCoordinates2);

          }


          dispatch(joinArea(formData))
          
          const response = await axios.post('https://squareapi.pythonanywhere.com/api/v1/points/', formData, {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
              'Content-Type': 'multipart/form-data',
            },
          });

          

          const Points = response.data.results;
          // console.log(Points)
          const formattedPoints = Points.map((point) => {
            const [latitude, longitude] = point.location.split(',').map(coord => parseFloat(coord.trim()));
            return {
              name: point.id,
              estate: point.estate,

              coordinates: { latitude, longitude },
              type: 'point',
              types: point.types,
            };
          });

          setCollectionPoints((prevPoints) => [...prevPoints, ...formattedPoints]);
          // const currentLocation = selectedStart ? 
          //  "HI"  : location;      
          // console.log("Calling getClosestPoint with currentLocation:", currentLocation);

          //  getClosestPoint(currentLocation, collectionPoints);







        } catch (error) {
          setErrorPoints(error.message || 'Error fetching points');
          Alert.alert('Error!', `Details: ${error.message}`);
        } finally {
          setLoadingPoints(false);
        }
      }
    };

    fetchAdminAreas();
    fetchPoints();
  }, [userInfo, selectedStart]);

  const handleSaveArea = (area) => {
    const areaWithCoordinates = {
      ...area,
      coordinates: newCoordinates,
      type: 'area',
    };
    setCollectionPoints([...collectionPoints, areaWithCoordinates]);
    setIsAreaModalVisible(false);
  };

  const handleSavePoint = (point) => {
    const pointWithCoordinates = {
      ...point,
      coordinates: newCoordinates,
      type: 'point',
    };
    setCollectionPoints([...collectionPoints, pointWithCoordinates]);
    setIsPointModalVisible(false);
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setIsMarkerActionsModalVisible(true);
  };

  const handleUpdateName = (newName) => {
    const updatedPoints = collectionPoints.map((marker) =>
      marker === selectedMarker ? { ...marker, name: newName } : marker
    );
    setCollectionPoints(updatedPoints);
    setIsMarkerActionsModalVisible(false);
    setIsUpdateNameFormVisible(false);
  };

  const handleDeleteMarker = () => {
    if (selectedMarker.type === 'admin_area') {
      dispatch(deleteAdminArea(selectedMarker.name));
    } else {
      dispatch(deletePoint(selectedMarker.name));
    }
    setCollectionPoints(collectionPoints.filter((marker) => marker !== selectedMarker));
    setIsMarkerActionsModalVisible(false);
  };

  const handleSavePhoto = (uri) => {
    setPhotoUri(uri);
    console.log('Saved photo URI:', uri);
  };

  const getMarkerColor = (types) => {
    // Green for environmentally friendly or organic materials
    if (types === 'Food' || types === 'Organic') return 'green';

    // Blue for recyclable materials
    if (types === 'Plastic' || types === 'Glass' || types === 'Metal' || types === 'Paper' || types === 'Electronic') return 'teal';

    // Gray for non-recyclable, hazardous, or general waste
    if (types === 'Hazardous' || types === 'General') return 'orange';

    // Default to gray if type not found
    return 'gray';
};






  return (
    <View style={styles.container}>
      {loadingAdminAreas && <ActivityIndicator size="large" color="#0000ff" />}
      {errorAdminAreas && <Text style={{ color: 'red' }}>{errorAdminAreas}</Text>}

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)}
        onLongPress={handleLongPress(region, setNewCoordinates, setIsAreaModalVisible, setIsPointModalVisible)}
      >

{/* {userInfo?.is_demo && (
  <Polygon
    coordinates={newYorkCoordinates}
    strokeColor="green"
    fillColor="rgba(0, 255, 0, 0.3)" // Green shade with transparency
    strokeWidth={5}
  />
)} */}

        {selectedPlace && (
          <Marker
            coordinate={selectedPlace.coordinate}
            pinColor="blue"
          >
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{selectedPlace.name}</Text>
                <Text>{selectedPlace.address}</Text>
              </View>
            </Callout>
          </Marker>
        )}
        {collectionPoints.map((point, index) => (
          <Marker
            key={index}
            coordinate={point.coordinates}
            onPress={() => handleMarkerPress(point)}
            pinColor={point.type === 'admin_area' ? 'yellow' : getMarkerColor(point.types)}
            style={point.type === 'admin_area' ? styles.areaMarker : styles.pointMarker}
          >
<Callout>
  {point.type === 'admin_area' ? 
    (
      <View>
      <Text>{point.name}</Text>
      <Text>AREA ID : {point.id} </Text>
      </View>


    ) : 
    (
      <>
    <View style={{ width: 200, padding: 10,borderWidth: 1, borderColor: '#000' }}>
      {/* <Text>Point ID: {point.name}</Text> */}
      <Text>Estate: {point?.estate}</Text>
      {/* <Text>Type of Waste {point.types} </Text> */}
      <Text>Type of Waste: Plastic, Composite, Paper, Organic</Text>
      <Text>Color Of Bin: Blue, Yellow, Green</Text>
    </View>


      </>
    )
  }
</Callout>

          </Marker>
        ))}
        {routeCoordinates.length > 0 && (
          <Polyline coordinates={routeCoordinates} strokeColor="#000" strokeWidth={6} />
        )}
      </MapView>
      {/* <TouchableOpacity style={styles.walkButton} onPress={() => setIsWalkModalVisible(true)}>
        <Text style={styles.walkButtonText}>Draw Walk Route</Text>
      </TouchableOpacity> */}
      <Notification />
      <MarkerInfo/>
      <Tip/>
      <CameraComponent style={styles.cameraComponent} />
      <TouchableOpacity style={{    position: 'absolute',
    bottom: 10,
    right: 20,
    maxWidth: 320}} onPress={handleOpenModal}>
      <Ionicons name="trash" size={50} color="orange" />
    </TouchableOpacity>
    <TrashModal isVisible={trashmodalVisible} onClose={handleCloseModal} closestPoint={closestPoint} />

      <NewAreaForm
        visible={isAreaModalVisible}
        onClose={() => setIsAreaModalVisible(false)}
        onSave={handleSaveArea}
        coordinates={newCoordinates}
      />
      <NewPointForm
        visible={isPointModalVisible}
        onClose={() => setIsPointModalVisible(false)}
        onSave={handleSavePoint}
        coordinates={newCoordinates}
      />
      {selectedMarker?.types  ? 
        <MarkerActionsModal
  visible={isMarkerActionsModalVisible}
  onClose={() => setIsMarkerActionsModalVisible(false)}
  onDelete={handleDeleteMarker}
  markerName={
    selectedMarker 
      ? (selectedMarker.types + " collection point")
      : ''
  }
/>

      
      :
      <MarkerActionsModal
        visible={isMarkerActionsModalVisible}
        onClose={() => setIsMarkerActionsModalVisible(false)}
        onDelete={handleDeleteMarker}
        markerName={selectedMarker ? selectedMarker.name  : ''}
      /> 

}

      <Walk
        visible={isWalkModalVisible}
        onClose={() => setIsWalkModalVisible(false)}
        onDrawRoute={handleDrawRoute(setRouteCoordinates)}
      />
    </View>
  );
};

export default MapViewComponent;



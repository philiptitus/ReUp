

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import TurnByTurn from './TurnByTurn';
import { getRouteDetails } from './navigationUtils';
import * as Location from 'expo-location';

const Walk = ({ visible, onClose, endLocation, point }) => {
  const [end, setEnd] = useState('');
  const [endSuggestions, setEndSuggestions] = useState([]);
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(endLocation);
  const [route, setRoute] = useState(null);
  const [navigationVisible, setNavigationVisible] = useState(false);
  const [loadingRoute, setLoadingRoute] = useState(false);

  useEffect(() => {
    const getCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setSelectedStart({
        name: 'Current Location',
        coordinate: { latitude, longitude },
      });
      // console.log(selectedStart)
    };

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (endLocation) {
      setSelectedEnd({
        name: 'Selected End Location',
        coordinate: endLocation
      });
    }
  }, [endLocation]);

  const fetchSuggestions = async (input, setter) => {
    if (input.length > 2) {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=`
        );
        setter(response.data.predictions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setter([]);
    }
  };

  const handleEndChange = (text) => {
    setEnd(text);
    fetchSuggestions(text, setEndSuggestions);
  };

  const handleSuggestionPress = async (item, setter, setSuggestions) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&key=`
      );
      const place = response.data.result;
      setter({
        name: place.name,
        coordinate: {
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
        },
      });
      setSuggestions([]);
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  const handleDrawRoute = async () => {
    if (selectedStart && selectedEnd) {
      setLoadingRoute(true);
      try {
        const routeDetails = await getRouteDetails(selectedStart.coordinate, selectedEnd.coordinate, '#key');
        setRoute(routeDetails);
        setNavigationVisible(true);
      } catch (error) {
        console.log("Selected Start Location:", selectedStart);
        console.log("End Location:", selectedEnd);

        console.error('Error fetching route:', error);
      } finally {
        setLoadingRoute(false);
      }
    }
  };

  useEffect(() => {
    if (endLocation) {
      handleDrawRoute();
    }
  }, [endLocation]);

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        {/* <TextInput
          style={styles.input}
          placeholder="Enter end location"
          value={end}
          onChangeText={handleEndChange}
        /> */}
        {endSuggestions.length > 0 && (
          <FlatList
            data={endSuggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSuggestionPress(item, setSelectedEnd, setEndSuggestions)}>
                <Text style={styles.suggestion}>{item.description}</Text>
              </TouchableOpacity>
            )}
            style={styles.suggestionsList}
          />
        )}
        {loadingRoute ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleDrawRoute}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
      {navigationVisible && route && (
        <View style={styles.fullscreenContainer}>
          <TurnByTurn route={route} onEndNavigation={() => setNavigationVisible(false)} point={point} />
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  suggestionsList: {
    maxHeight: 100,
    marginBottom: 10,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
  },
  fullscreenContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
});

export default Walk;


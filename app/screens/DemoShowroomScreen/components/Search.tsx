import React, { useState } from 'react';
import { StyleSheet, TextInput, FlatList, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import CameraComponent from './CameraComponent';

const SearchComponent = ({ region, collectionPoints, setSelectedPlace, setRegion, setHighlightedMarker }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSearchChange = async (text) => {
    setSearchQuery(text);
    if (text.length > 2) {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&location=${region.latitude},${region.longitude}&radius=500&key=`
        );
        const googleSuggestions = response.data.predictions.map((prediction) => ({
          ...prediction,
          isCollectionPoint: false,
        }));

        const filteredCollectionPoints = collectionPoints.filter((point) =>
          point.name.toLowerCase().includes(text.toLowerCase())
        ).map((point) => ({
          description: point.name,
          place_id: `cp_${point.name}`,
          isCollectionPoint: true,
        }));

        setSuggestions([...filteredCollectionPoints, ...googleSuggestions]);
      } catch (error) {
        console.error('Error fetching place suggestions:', error);
        setErrorMessage('Failed to fetch place suggestions.');
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionPress = async (item) => {
    if (item.isCollectionPoint) {
      const collectionPoint = collectionPoints.find(
        (point) => `cp_${point.name}` === item.place_id
      );
      setSelectedPlace({
        coordinate: collectionPoint.coordinates,
        name: collectionPoint.name,
        address: collectionPoint.address,
      });
      setRegion({
        latitude: collectionPoint.coordinates.latitude,
        longitude: collectionPoint.coordinates.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setSearchQuery('');
      setSuggestions([]);
      setErrorMessage(null);
      setHighlightedMarker(collectionPoint.name);
    } else {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${item.place_id}&key=`
        );
        const place = response.data.result;
        setSelectedPlace({
          coordinate: {
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
          },
          name: place.name,
          address: place.formatted_address,
        });
        setRegion({
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setSearchQuery('');
        setSuggestions([]);
        setErrorMessage(null);
        setHighlightedMarker(null);
      } catch (error) {
        console.error('Error fetching place details:', error);
        setErrorMessage('Failed to fetch place details.');
      }
    }
  };

  return (
    <>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for nearby collection points"
        value={searchQuery}
        onChangeText={handleSearchChange}
      />
      
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSuggestionPress(item)}>
              <Text style={[styles.suggestion, item.isCollectionPoint && styles.collectionPointSuggestion]}>
                {item.description}
              </Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionsList}
        />
      )}
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  suggestionsList: {
    position: 'absolute',
    top: 60,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    zIndex: 1,
  },
  suggestion: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  collectionPointSuggestion: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  error: {
    position: 'absolute',
    top: 90,
    left: 10,
    right: 10,
    backgroundColor: 'red',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
});

export default SearchComponent;

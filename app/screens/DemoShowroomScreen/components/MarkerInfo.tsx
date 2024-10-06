import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MarkerInfo = () => {
  const [expanded, setExpanded] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.timing(heightAnim, {
      toValue: expanded ? 0 : 300,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const markerTypes = [
    { type: 'BYG Station', color: 'orange' },
    { type: 'BRB Station', color: 'teal' },
    // { type: 'Glass', color: 'blue' },
    // { type: 'Metal', color: 'blue' },
    // { type: 'Paper', color: 'blue' },
    // { type: 'Organic', color: 'green' },
    // { type: 'Electronic', color: 'blue' },
    // { type: 'Hazardous', color: 'red' },
    // { type: 'General', color: 'red' },
    { type: 'Area Info', color: 'yellow' },

  ];

  const renderItem = ({ type, color }) => (
    <View key={type} style={styles.markerInfoContainer}>
      <View style={[styles.markerIcon, { backgroundColor: color }]} />
      <Text style={styles.markerText}>{type}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={toggleExpand}>
        <Ionicons name="information-circle-outline" size={24} color="brown" />
      </TouchableOpacity>
      
      <Animated.View style={[styles.infoContainer, { height: heightAnim }]}>
        {expanded && (
          <View style={styles.infoContent}>
            {markerTypes.map(renderItem)}
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 110,
    right: 20,
    maxWidth: 320
  },
  iconContainer: {
    backgroundColor: 'orange',
    borderRadius: 30,
    padding: 10,
    elevation: 5,
  },
  infoContainer: {
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoContent: {
    padding: 10,
  },
  markerInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  markerIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
  },
  markerText: {
    fontSize: 14,
    color: '#333',
  },
});

export default MarkerInfo;

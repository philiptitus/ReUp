import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Tip = () => {
  const [expanded, setExpanded] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.timing(heightAnim, {
      toValue: expanded ? 0 : 150,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={toggleExpand}>
        <Ionicons name="help-circle-outline" size={24} color="brown" />
      </TouchableOpacity>
      
      <Animated.View style={[styles.tipContainer, { height: heightAnim }]}>
        {expanded && (
          <View style={styles.tipContent}>
            <Text style={styles.tipText}>
              Please try turning your location services on or off if you are experiencing issues with location tracking.
            </Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 170,
    right: 20,
    maxWidth: 320
  },
  iconContainer: {
    backgroundColor: 'orange', // Customize color as needed
    borderRadius: 30,
    padding: 10,
    elevation: 5,
  },
  tipContainer: {
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tipContent: {
    padding: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#333',
  },
});

export default Tip;

import React, { useEffect, useRef } from 'react';
import { View, ImageBackground, StyleSheet, Text, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const SplashScreen = () => {
  const scaleValue = useRef(new Animated.Value(1.5)).current; // Start with a zoomed-in scale
  const navigation = useNavigation(); // Get navigation object

  useEffect(() => {
    // Start the scale animation
    Animated.timing(scaleValue, {
      toValue: 1, // End at the original scale
      duration: 2000, // Duration of the animation
      useNativeDriver: true,
    }).start(() => {
      // After the animation ends, wait for 3 seconds and then navigate
      setTimeout(() => {
        goToHome();
      }, 3000);
    });
  }, [scaleValue]);

  const goToHome = () => {
    navigation.navigate("Demo", { screen: "DemoNavigator", params: {} });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: scaleValue }], flex: 1 }}>
        <ImageBackground
          source={require('../../assets/images/main.jpg')}
          style={styles.image}
          resizeMode="contain"
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>Making The World A Cleaner Place😊🌍</Text>
          </View>
        </ImageBackground>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // This will fill the remaining areas with a dark shade
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width, // Ensure the image takes the full width of the screen
    height: Dimensions.get('window').height, // Ensure the image takes the full height of the screen
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay on the image
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    color: 'white',
  },
});

export default SplashScreen;

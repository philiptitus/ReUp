import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Image, TextInput, ActivityIndicator, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createTrash, retrievePoint } from '../../../../server/actions/trashActions';  // Adjust the import path as needed
import Walk from './Walk';  // Adjust the import path as needed

const CameraComponent = () => {
  const [imageUri, setImageUri] = useState(null);
  const [point, setPoint] = useState('');
  const [endLocation, setEndLocation] = useState(null);
  const [isWalkModalVisible, setIsWalkModalVisible] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, success, trash } = useSelector((state) => state.createTrash);
  const { point: retrievedPoint, loading: loadingPoint, success: successPoint, error: errorPoint } = useSelector((state) => state.retrievePoint);

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!imageUri || !point) {
      alert('Please fill all the fields.');
      return;
    }

    const trashData = new FormData();
    trashData.append('photo', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    trashData.append('point', parseInt(point)); // Ensure 'point' is sent as a number

    dispatch(createTrash(trashData));
    console.log(trash);
  };

  useEffect(() => {
    if (success && point) {
      dispatch(retrievePoint(point));
    }
  }, [success]);

  useEffect(() => {
    if (retrievedPoint) {
      const [latitude, longitude] = retrievedPoint.location.split(',').map(Number);
      setEndLocation({ latitude, longitude });
      setIsWalkModalVisible(true);
    }
  }, [retrievedPoint]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openCamera} style={styles.iconContainer}>
        <Ionicons name="camera" size={40} color="black" />
      </TouchableOpacity>
      {imageUri && (
        <View style={styles.imageFormContainer}>
          <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
          <TouchableOpacity onPress={() => setImageUri(null)} style={styles.closeButton}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter point ID"
              value={point}
              onChangeText={setPoint}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {loading && <ActivityIndicator size="large" color="blue" />}
      {success && <View style={styles.successIndicator}><Text>Success</Text></View>}
      {error && <View style={styles.errorIndicator}><Text>{error.detail || 'An error occurred'}</Text></View>}
      {loadingPoint && <ActivityIndicator size="large" color="blue" />}
      <Walk visible={isWalkModalVisible} onClose={() => setIsWalkModalVisible(false)} endLocation={endLocation} point={trash?.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 230,
    right: 15,
  },
  iconContainer: {
    backgroundColor: 'orange',
    borderRadius: 30,
    padding: 6,
    elevation: 5,
    marginBottom: 20,
  },
  imageFormContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'orange',
    borderRadius: 15,
    padding: 5,
    elevation: 5,
    zIndex: 1,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
    marginTop: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  saveButton: {
    backgroundColor: 'orange',
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    width: '100%',
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  successIndicator: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  errorIndicator: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
});

export default CameraComponent;


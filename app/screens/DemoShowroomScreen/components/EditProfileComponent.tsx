import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Image, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../../../server/actions/userAction';
import axios from 'axios';
import { Snackbar } from 'react-native-paper';
import {API_URL} from '../../../../server/constants/URL';

const EditProfileComponent = ({ isVisible, onClose, userData, onSave }) => {
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const [name, setName] = useState(userInfo?.name);
  const [email, setEmail] = useState(userInfo?.email);
  const [contact_number, setContactNumber] = useState(userData.contactNumber);
  const [avi, setAvi] = useState(userData.avi);

  const dispatch = useDispatch();
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { loading, error, success } = userUpdateProfile;

  const [uploading, setUploading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const handleImagePicker = async () => {
    const options = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);
    console.log('Image Picker Result:', result);

    if (!result.canceled) {
      const { uri } = result.assets[0]; // Access the URI from the assets array
      console.log('Image URI:', uri);
      setAvi(uri);
      uploadFileHandler(uri); // Upload the selected image
    } else {
      console.log('User cancelled image picker');
    }
  };

  const uploadFileHandler = async (uri) => {
    const formData = new FormData();
    formData.append('avi', {
      uri: uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
    formData.append('user_id', userInfo?.id);

    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.post(`https://squareapi.pythonanywhere.com/api/users/upload/`, formData, config);
      showSnackbar("Profile Photo Updated", 'success');
      setUploading(false);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
      showSnackbar(errorMessage, 'error');
      console.log(errorMessage);
      setUploading(false);
    }
  };

  const handleSave = () => {
    const updatedUserData = { name, email, contact_number, avi };
    dispatch(updateUserProfile(updatedUserData));
  };

  const handleDeleteProfilePicture = () => {
    setAvi(null); // Reset the avi to null or any default value
  };

  const showSnackbar = (message, variant) => {
    setSnackbarMessage(message);
    setVisible(true);
  };

  const onDismissSnackBar = () => setVisible(false);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Edit Profile</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#4F8EF7" />
            </TouchableOpacity>
          </View>
          {loading && <ActivityIndicator size="large" color="#0000ff" />}
          {error && <Text style={styles.errorText}>{error}</Text>}
          {success && <Text style={styles.successText}>Profile updated successfully!</Text>}
          <TouchableOpacity style={styles.imageContainer} onPress={handleImagePicker}>
            <Image source={{ uri: avi }} style={styles.avatar} />
            <Ionicons name="camera" size={24} color="#4F8EF7" style={styles.cameraIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteProfilePicture} style={styles.deleteIconContainer}>
            <Ionicons name="trash" size={24} color="#d9534f" />
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contact Number *should be your M-PESA number for easier payments</Text>
            <TextInput
              style={styles.input}
              value={contact_number}
              onChangeText={setContactNumber}
              keyboardType="phone-pad"
            />
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
  },
  deleteIconContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#777',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#4F8EF7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#d9534f',
    marginBottom: 10,
  },
  successText: {
    color: '#5cb85c',
    marginBottom: 10,
  },
});

export default EditProfileComponent;




import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native';
import { createCommunity } from '../../../../server/actions/trashActions'; // Adjust the import path as necessary

const CreateCommunityModal = ({ isVisible, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  const dispatch = useDispatch();
  const communityCreate = useSelector((state) => state.communityCreate);
  const { loading, error, success } = communityCreate;

  useEffect(() => {
    if (success) {
      Alert.alert('Community created successfully!');
      onClose();
    }
  }, [success, onClose]);

  const handleCreate = () => {
    if (!name || !email) {
      Alert.alert('Please fill in all required fields');
      return;
    }
    dispatch(createCommunity({ name, email, bio }));
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Create Community</Text>
          {loading ? (
            <ActivityIndicator size="large" color="green" />
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Community Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <TextInput
                style={styles.textArea}
                placeholder="Bio"
                value={bio}
                onChangeText={setBio}
                multiline
              />
              {error && <Text style={styles.errorText}>{error}</Text>}
              <TouchableOpacity style={styles.button} onPress={handleCreate}>
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
  },
  textArea: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4F8EF7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelText: {
    color: '#4F8EF7',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default CreateCommunityModal;

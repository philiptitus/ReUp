import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateCommunity } from '../../../../server/actions/trashActions';

const EditCommunityModal = ({ isVisible, onClose, community, onSave, onDelete }) => {
  const dispatch = useDispatch();
  const communityUpdate = useSelector(state => state.communityUpdate);
  const { loading, error, success } = communityUpdate;

  const [name, setName] = useState(community.name);
  const [email, setEmail] = useState(community.email);
  const [bio, setBio] = useState(community.bio);
  const [aiServices, setAiServices] = useState(community.ai_services);

  useEffect(() => {
    setName(community.name);
    setEmail(community.email);
    setBio(community.bio);
    setAiServices(community.ai_services);
  }, [community]);

  const handleSave = () => {
    if (!name || !email) {
      Alert.alert('Please fill in all required fields');
      return;
    }
    dispatch(updateCommunity(community.id, { name, email, bio, ai_services: aiServices }));
    onSave({ name, email, bio, ai_services: aiServices });
    onClose();
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Community',
      'Are you sure you want to delete this community?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => onDelete(community.id) },
      ]
    );
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
          <Text style={styles.title}>Edit Community</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#4F8EF7" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
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
              <TouchableOpacity
                style={[styles.button, { backgroundColor: aiServices ? '#4F8EF7' : '#ddd' }]}
                onPress={() => setAiServices(!aiServices)}
              >
                <Text style={styles.buttonText}>
                  {aiServices ? 'AI Services Enabled' : 'Enable AI Services'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>Delete Community</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </>
          )}
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
  deleteButton: {
    backgroundColor: '#FF4F4F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  deleteButtonText: {
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
    textAlign: 'center',
  },
});

export default EditCommunityModal;

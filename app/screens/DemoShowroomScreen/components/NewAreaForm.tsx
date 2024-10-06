import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createAdminArea } from '../../../../server/actions/trashActions'

const NewAreaForm = ({ visible, onClose, coordinates, onSave }) => {
  const [name, setName] = useState('');

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const adminAreaCreate = useSelector((state) => state.createAdminArea);
  const { loading, success, error } = adminAreaCreate;

  const handleSave = () => {
    const formattedCoordinates = `${coordinates.latitude},${coordinates.longitude}`;
    dispatch(createAdminArea({ name, coordinates: formattedCoordinates }));
    setName('');

  };

  useEffect(() => {
    if (success) {
      const savedCoordinates = `${coordinates.latitude},${coordinates.longitude}`;

      onSave({ name, coordinates: savedCoordinates});

      onClose(); // Close the modal on successful area creation
    }
  }, [success]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>

        {userInfo?.user_type === "admin" ? 
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add a New Area</Text>
          <TextInput
            style={styles.input}
            placeholder="Area Name"
            value={name}
            onChangeText={setName}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#4F8EF7" />
          ) : (
            <>
              <Button title="Submit" onPress={handleSave} />
              <Button title="Cancel" onPress={onClose} color="red" />
            </>
          )}
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>

:

<Text>You dont Have Permission To Do This</Text>

        }
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default NewAreaForm;

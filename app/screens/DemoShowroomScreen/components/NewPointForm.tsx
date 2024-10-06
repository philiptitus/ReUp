import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { createPoint } from "../../../../server/actions/trashActions"

const NewPointForm = ({ visible, onClose, coordinates, onSave }) => {
  const [name, setName] = useState('');
  const [admin_area, setAdmin_area] = useState('');
  const [selectedType, setSelectedType] = useState('General');

  const dispatch = useDispatch();

  const pointCreate = useSelector((state) => state.createPoint);
  const { loading, success, error } = pointCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  useEffect(() => {
    if (success) {
      const savedCoordinates = `${coordinates.latitude},${coordinates.longitude}`;

      onSave({ name, coordinates: savedCoordinates, admin_area, types: selectedType });
      onClose(); // Close the modal on successful area creation
    }
  }, [success]);

  const handleSave = () => {
    const formattedCoordinates = `${coordinates.latitude},${coordinates.longitude}`;
    dispatch(createPoint({  location: formattedCoordinates, admin_area, types: selectedType }));
    setName('');
    setAdmin_area('');
    setSelectedType('General');
    console.log('Formatted coordinates:', formattedCoordinates);
  };

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
          <Text style={styles.modalTitle}>Add a New Point</Text>

          <TextInput
            style={styles.input}
            placeholder="Admin Area ID"
            value={admin_area}
            onChangeText={setAdmin_area}
          />
          <Picker
            selectedValue={selectedType}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedType(itemValue)}
          >
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Plastic" value="Plastic" />
            <Picker.Item label="Glass" value="Glass" />
            <Picker.Item label="Metal" value="Metal" />
            <Picker.Item label="Paper" value="Paper" />
            <Picker.Item label="Organic" value="Organic" />
            <Picker.Item label="Electronic" value="Electronic" />
            <Picker.Item label="Hazardous" value="Hazardous" />
            <Picker.Item label="General" value="General" />
          </Picker>
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
  picker: {
    height: 50,
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default NewPointForm;

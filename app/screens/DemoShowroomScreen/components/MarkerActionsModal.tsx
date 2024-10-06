import React from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const MarkerActionsModal = ({ visible, onClose, onDelete, markerName }) => {
  
  

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Area/Point Details</Text>
          <Text style={styles.markerName}>{markerName}</Text>
          {markerName.toLowerCase().includes('zone') && userInfo?.user_type === "admin" && (
            <Button title="Delete This" onPress={onDelete} color="red" />
          )}



          <Button title="Cancel" onPress={onClose} />
        </View>
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
  markerName: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default MarkerActionsModal;

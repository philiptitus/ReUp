import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserDetailsModal = ({ isVisible, onClose, user, onBlacklist, onDismiss, blacklistLoading, blacklistError, blacklistSuccess }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.userType}>{user?.user_type} user</Text>
          <Text style={styles.userName}>Name: {user?.name}</Text>
          <Text style={styles.userEmail}>Email: {user?.email}</Text>
          <TouchableOpacity style={styles.button} onPress={onBlacklist}>
            <Text style={styles.buttonText}>Blacklist</Text>
          </TouchableOpacity>
          {user?.user_type === "staff" && 
            <TouchableOpacity style={styles.button2} onPress={onDismiss}>
              <Text style={styles.buttonText}>Dismiss</Text>
            </TouchableOpacity>
          }
          {blacklistLoading && <ActivityIndicator size="large" color="#4F8EF7" />}
          {blacklistError && <Text style={styles.errorText}>{blacklistError}</Text>}
          {blacklistSuccess && <Text style={styles.successText}>User successfully blacklisted!</Text>}
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
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  userType: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  userEmail: {
    fontSize: 18,
    color: '#777',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4F8EF7',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  button2: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  successText: {
    color: 'green',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default UserDetailsModal;

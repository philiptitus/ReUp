import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CreateCommunityModal from './NewCommunity';
import EditCommunityModal from './UpdateCommunity';
import { getUserDetails } from '../../../../server/actions/userAction';
import { retrieveAdminArea, retrieveCommunity, deleteAdminArea } from '../../../../server/actions/trashActions';

const CommunityDetail = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isCreateVisible, setCreateVisible] = useState(false);
  const [isEditVisible, setEditVisible] = useState(false);
  const [isDeleteVisible, setDeleteVisible] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: userLoading, error: userError, user } = userDetails;

  const communityCreate = useSelector((state) => state.communityCreate);
  const { success: successCommunity } = communityCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const communityUpdate = useSelector((state) => state.communityUpdate);
  const { success: successUpdate } = communityUpdate;

  const AdminAreaDetails = useSelector((state) => state.AdminAreaDetails);
  const { loading: areaLoading, error: areaError, adminArea } = AdminAreaDetails;

  const CommunityDetails = useSelector((state) => state.CommunityDetails);
  const { loading: communityLoading, error: communityError, community } = CommunityDetails;

  const deleteAdminAreaState = useSelector((state) => state.deleteAdminArea);
  const { loading: deleteLoading, error: deleteError, success: deleteSuccess } = deleteAdminAreaState;

  useEffect(() => {
    dispatch(getUserDetails(userInfo.id));
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (user?.area) {
      dispatch(retrieveAdminArea(user.area));
    }
    if (user?.community) {
      dispatch(retrieveCommunity(user.community));
    }
  }, [dispatch, user, successCommunity, successUpdate]);

  useEffect(() => {
    if (deleteSuccess) {
      Alert.alert('Success', 'Area deleted successfully', [
        { text: 'OK', onPress: () => navigation.navigate('Profile') },
      ]);
    }
  }, [deleteSuccess, navigation]);

  const handleCreate = (communityData) => {
    console.log('Create Community Data:', communityData);
  };

  const handleEdit = (updatedCommunity) => {
    console.log('Updated Community Data:', updatedCommunity);
  };

  const handleDelete = (areaId) => {
    dispatch(deleteAdminArea(areaId));
    setDeleteVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Area Information</Text>
        {areaLoading ? (
          <ActivityIndicator size="large" color="#4F8EF7" />
        ) : areaError ? (
          <Text style={styles.errorText}>Area Unavailable</Text>
        ) : (
          adminArea && (
            <>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{adminArea.name}</Text>
              <Text style={styles.label}>Admin:</Text>
              <Text style={styles.value}>{adminArea.aname}</Text>
              <Text style={styles.label}>Main Coordinate:</Text>
              <Text style={styles.value}>{adminArea.main_coordinate}</Text>
            </>
          )
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Community Information</Text>
        {communityLoading ? (
          <ActivityIndicator size="large" color="#4F8EF7" />
        ) : communityError ? (
          <Text style={styles.errorText}>{communityError}</Text>
        ) : (
          community && (
            <>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{community.name}</Text>
              <Text style={styles.label}>Admin:</Text>
              <Text style={styles.value}>{community.aname}</Text>
              <Text style={styles.label}>Official Communication Email:</Text>
              <Text style={styles.value}>{community.email}</Text>
              <Text style={styles.label}>Bio:</Text>
              <Text style={styles.value}>{community.bio}</Text>
            </>
          )
        )}
      </View>

      {!user?.community && userInfo?.user_type === 'admin' && (
        <TouchableOpacity style={styles.button} onPress={() => setCreateVisible(true)}>
          <Text style={styles.buttonText}>Create Community</Text>
        </TouchableOpacity>
      )}

      {user?.community && userInfo?.user_type === 'admin' && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setSelectedCommunity(community);
            setEditVisible(true);
          }}
        >
          <Text style={styles.buttonText}>Edit Community</Text>
        </TouchableOpacity>
      )}

      {user?.area && userInfo?.user_type ==="admin" && (
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => setDeleteVisible(true)}>
          <Text style={styles.buttonText}>Delete Area</Text>
        </TouchableOpacity>
      )}

      <CreateCommunityModal isVisible={isCreateVisible} onClose={() => setCreateVisible(false)} onCreate={handleCreate} />
      {selectedCommunity && (
        <EditCommunityModal
          isVisible={isEditVisible}
          onClose={() => setEditVisible(false)}
          community={selectedCommunity}
          onSave={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal visible={isDeleteVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Deletion</Text>
            <Text style={styles.modalMessage}>Are you sure you want to delete this Area?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.button, styles.modalButton]} onPress={() => setDeleteVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.modalButton, styles.deleteButton]}
                onPress={() => handleDelete(user?.area)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
            {deleteLoading && <ActivityIndicator size="large" color="#E74C3C" />}
            {deleteError && <Text style={styles.errorText}>{deleteError}</Text>}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4F8EF7',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  value: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    backgroundColor: '#4F8EF7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15,
    alignSelf: 'center',
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
  },

  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
});

export default CommunityDetail;

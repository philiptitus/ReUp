import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { removeFromBlacklist } from '../../../../server/actions/trashActions'; // Adjust the import path as necessary

const BlacklistComponent = () => {
  const [blacklistedUsers, setBlacklistedUsers] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [removeFromBlacklistChecked, setRemoveFromBlacklistChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blacklistRemove = useSelector((state) => state.blacklistRemove);
  const { loading: removeLoading, success: removeSuccess, error: removeError } = blacklistRemove;

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlacklistedUsers = async () => {
      if (!userInfo) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      try {
        const response = await axios.get(`https://squareapi.pythonanywhere.com/api/v1/blacklist/list/?page=${page}`, config);
        if (response.data.results && response.data.results.length > 0) {
          setBlacklistedUsers((prevData) => [...prevData, ...response.data.results]);
          setVisibleData((prevData) => [...prevData, ...response.data.results.slice(0, 10)]);
          setShowLoadMore(response.data.results.length === 10);
          setLoading(false);
        } else {
          setShowLoadMore(false);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };

    fetchBlacklistedUsers();
  }, [page, userInfo]);

  useEffect(() => {
    if (removeSuccess) {
      setModalVisible(false);
      setRemoveFromBlacklistChecked(false);
      setBlacklistedUsers((prevData) => prevData.filter(user => user.id !== selectedUser.id));
      setVisibleData((prevData) => prevData.filter(user => user.id !== selectedUser.id));
    }
  }, [removeSuccess]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filteredData = blacklistedUsers.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase()) ||
        user.email.toLowerCase().includes(text.toLowerCase())
      );
      setVisibleData(filteredData);
      setShowLoadMore(false);
    } else {
      setVisibleData(blacklistedUsers.slice(0, 10));
      setShowLoadMore(blacklistedUsers.length > 10);
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleRemoveFromBlacklist = () => {
    if (selectedUser) {
      console.log(selectedUser?.user)
      dispatch(removeFromBlacklist({ user_id: selectedUser.user }));
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => openModal(item)}>
<Ionicons name="warning" size={40} color="#000" style={styles.icon} />
<View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Blacklist</Text>
      <Text>Blacklisted Users In Your Community</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search by name or email"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#4F8EF7" />
      ) : (
        <FlatList
          data={visibleData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
      {showLoadMore && !loading && (
        <TouchableOpacity style={styles.loadMoreButton} onPress={loadMore}>
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      )}
      {selectedUser && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
              <Ionicons name="warning" size={80} color="#000" style={styles.modalIcon} />
              <Text style={styles.modalText}>Name: {selectedUser.name}</Text>
              <Text style={styles.modalText}>Email: {selectedUser.email}</Text>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setRemoveFromBlacklistChecked(!removeFromBlacklistChecked)}
              >
                <View style={styles.checkbox}>
                  {removeFromBlacklistChecked && <View style={styles.checkboxTick} />}
                </View>
                <Text style={styles.checkboxLabel}>Remove from Blacklist</Text>
              </TouchableOpacity>
              {removeLoading && <ActivityIndicator size="large" color="#4F8EF7" />}
              {removeError && <Text style={styles.errorText}>{removeError}</Text>}
              {removeSuccess && <Text style={styles.successText}>User successfully removed from blacklist!</Text>}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleRemoveFromBlacklist}
                disabled={!removeFromBlacklistChecked || removeLoading}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  searchBar: {
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#777',
  },
  loadMoreButton: {
    padding: 15,
    backgroundColor: '#4F8EF7',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loadMoreText: {
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
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalIcon: {
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxTick: {
    width: 14,
    height: 14,
    backgroundColor: '#333',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  successText: {
    color: 'green',
    marginBottom: 10,
  },
  submitButton: {
    padding: 10,
    backgroundColor: '#4F8EF7',
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BlacklistComponent;

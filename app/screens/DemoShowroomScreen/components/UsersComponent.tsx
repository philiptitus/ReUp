import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import UserDetailsModal from './UserDetails';
import { addToBlacklist } from '../../../../server/actions/trashActions'; // Adjust the import path as necessary

const UsersComponent = () => {
  const [usersData, setUsersData] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blacklistAdd = useSelector((state) => state.blacklistAdd);
  const { loading: blacklistLoading, success: blacklistSuccess, error: blacklistError } = blacklistAdd;

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsersData = async () => {
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
        const response = await axios.get(`https://squareapi.pythonanywhere.com/api/users/?page=${page}`, config);
        if (response.data.results && response.data.results.length > 0) {
          setUsersData((prevData) => [...prevData, ...response.data.results]);
          setVisibleData((prevData) => [...prevData, ...response.data.results.slice(0, 10)]);
          setShowLoadMore(response.data.next !== null);
        } else {
          console.log('No users found');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersData();
  }, [page, userInfo]);

  const loadMore = () => {
    setLoadingMore(true);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (loadingMore && page > 1) {
      setLoadingMore(false);
    }
  }, [usersData]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filteredData = usersData.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase()) ||
        user.email.toLowerCase().includes(text.toLowerCase())
      );
      setVisibleData(filteredData);
      setShowLoadMore(false);
    } else {
      setVisibleData(usersData.slice(0, 10));
      setShowLoadMore(usersData.length > 10);
    }
  };

  const handleFilter = (type) => {
    setFilterType(type);
    if (type === 'all') {
      setVisibleData(usersData.slice(0, 10));
      setShowLoadMore(usersData.length > 10);
    } else {
      const filteredData = usersData.filter((user) => user.user_type === type);
      setVisibleData(filteredData);
      setShowLoadMore(false);
    }
  };

  const handleUserPress = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const handleBlacklist = () => {
    dispatch(addToBlacklist({ user_id: selectedUser.id }));
  };

  const handleDismiss = () => {
    // Dispatch action to dismiss the user
  };

  useEffect(() => {
    if (blacklistSuccess) {
      handleCloseModal();
      // Optionally, refresh the users list or show a success message
    }
  }, [blacklistSuccess]);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleUserPress(item)}>
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: 'https://squareapi.pythonanywhere.com/' + item.avi }}
          style={styles.userImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Users List</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by name or email"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'all' && styles.activeFilter]}
          onPress={() => handleFilter('all')}
        >
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'staff' && styles.activeFilter]}
          onPress={() => handleFilter('staff')}
        >
          <Text style={styles.filterText}>Staff</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'normal' && styles.activeFilter]}
          onPress={() => handleFilter('normal')}
        >
          <Text style={styles.filterText}>Normal</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#4F8EF7" />
      ) : (
        <FlatList
          data={visibleData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
      {showLoadMore && !loading && !loadingMore && (
        <TouchableOpacity style={styles.loadMoreButton} onPress={loadMore}>
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      )}
      {loadingMore && <ActivityIndicator size="large" color="#4F8EF7" />}

      {selectedUser && (
        <UserDetailsModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          user={selectedUser}
          onBlacklist={handleBlacklist}
          onDismiss={handleDismiss}
          blacklistLoading={blacklistLoading}
          blacklistError={blacklistError}
          blacklistSuccess={blacklistSuccess}
        />
      )}

      {blacklistLoading && <ActivityIndicator size="large" color="#4F8EF7" />}
      {blacklistError && <Text style={styles.errorText}>{blacklistError}</Text>}
      {blacklistSuccess && <Text style={styles.successText}>User successfully blacklisted!</Text>}
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
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  activeFilter: {
    backgroundColor: '#4F8EF7',
  },
  filterText: {
    color: '#333',
    fontWeight: 'bold',
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
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
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

export default UsersComponent;

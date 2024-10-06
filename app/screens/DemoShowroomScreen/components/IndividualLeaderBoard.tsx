import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

const icons = [
  'person-circle-outline',
  'person-outline',
  'people-outline',
  'star-outline',
  'trophy-outline',
  'medal-outline',
  'ribbon-outline',
  'heart-outline',
  'thumbs-up-outline',
  'shield-outline',
];

const IndividualLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    const fetchLeaderboardData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      try {
        setLoading(true);
        const response = await axios.get(`https://squareapi.pythonanywhere.com/api/v1/leaderboards/individual/?page=${page}`, config);
        if (response.data.results && response.data.results.length > 0) {
          setLeaderboardData((prevData) => [...prevData, ...response.data.results]);
          setTotalPages(response.data.total_pages);
        } else {
          console.log('No leaderboard items found');
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, [page, userInfo]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    setLeaderboardData([]);


    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.get(`https://squareapi.pythonanywhere.com/api/v1/leaderboards/individual/?page=1`, config);
      if (response.data.results && response.data.results.length > 0) {
        setLeaderboardData(response.data.results);
        setTotalPages(response.data.total_pages);
        setShowLoadMore(true);
      } else {
        console.log('No leaderboard items found');
      }
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setRefreshing(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Ionicons
        name={icons[index % icons.length]}
        size={40}
        color="#4F8EF7"
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.points}>{item.points} points</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Individual Leaderboard</Text>
      <Text style={{color:"purple"}}>We want to thank you all for making the communities cleaner esapecially these ones.</Text>

      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#4F8EF7" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={leaderboardData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#4F8EF7" /> : null
          }
        />
      )}
      { leaderboardData.length > 9 &&  !loading &&(
        <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
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
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  points: {
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
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default IndividualLeaderboard;

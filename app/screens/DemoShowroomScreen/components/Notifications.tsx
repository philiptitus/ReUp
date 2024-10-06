import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, ActivityIndicator, RefreshControl, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    if (!userInfo) return;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    try {
      setLoading(true);
      const response = await axios.get('https://squareapi.pythonanywhere.com/api/users/notices/', config);
      setNotifications(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.timing(heightAnim, {
      toValue: expanded ? 0 : 300,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNotifications();
    setRefreshing(false);
  };

  const renderItem = ({ item, index }) => (
    <Text key={item.id} style={styles.notificationText}>
      {index + 1}. {item.message}
    </Text>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={toggleExpand}>
        <Ionicons name="notifications-outline" size={24} color="brown" />
      </TouchableOpacity>
      
      <Animated.View style={[styles.notificationContainer, { height: heightAnim }]}>
        {expanded && (
          <View style={styles.notifications}>
            {loading ? (
              <ActivityIndicator size="large" color="orange" />
            ) : notifications.length === 0 ? (
              <Text style={styles.noNotificationsText}>Nothing New Yet</Text>
            ) : (
              <FlatList
                data={notifications}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
              />
            )}
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    maxWidth: 320
  },
  iconContainer: {
    backgroundColor: 'orange', // Customize color as needed
    borderRadius: 30,
    padding: 10,
    elevation: 5,
  },
  notificationContainer: {
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  notifications: {
    padding: 10,
  },
  notificationText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  noNotificationsText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    padding: 10,
  },
});

export default Notification;

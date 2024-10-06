import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ActivityIndicator, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

const reportIcons = {
  General: 'document-outline',
  Important: 'alert-circle-outline',
  Urgent: 'warning-outline',
};

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    const fetchReports = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      try {
        setLoading(true);
        const response = await axios.get(`https://squareapi.pythonanywhere.com/api/v1/reports/community/?page=${page}`, config);
        if (response.data.results && response.data.results.length > 0) {
          setReports((prevReports) => [...prevReports, ...response.data.results]);
          setTotalPages(response.data.total_pages);
        } else {
          console.log('No reports found');
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [page, userInfo]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    setReports([]);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.get(`https://squareapi.pythonanywhere.com/api/v1/reports/community/${userInfo.community}/?page=1`, config);
      if (response.data.results && response.data.results.length > 0) {
        setReports(response.data.results);
        setTotalPages(response.data.total_pages);
      } else {
        console.log('No reports found');
      }
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setRefreshing(false);
    }
  };

  const openModal = (report) => {
    setSelectedReport(report);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => openModal(item)}>
      <Ionicons
        name={reportIcons.General}
        size={40}
        color="#4F8EF7"
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.points}>Points: {item.points}</Text>
        <Text style={styles.timestamp}>
          
        {new Date(item.timestamp).toLocaleString()}  {/* Convert datetime to a readable format */}          
          </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reports</Text>
      <Text>Reports are an easy way for your staff to keep you in know of your area's environmental state.</Text>

      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#4F8EF7" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={reports}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          ListFooterComponent={
            loading && page > 1 ? <ActivityIndicator size="large" color="#4F8EF7" /> : null
          }
        />
      )}
      
      {reports.length > 9 && page < totalPages && !loading && (
        <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      )}
      {selectedReport && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Ionicons
                name={reportIcons.General}
                size={40}
                color="#4F8EF7"
                style={styles.modalIcon}
              />
              <Text style={styles.modalText}>Time: {new Date(selectedReport.timestamp).toLocaleString()}</Text>
              <Text style={styles.modalText}>Points: {selectedReport.points}</Text>
              <Text style={styles.modalText}>Report: {selectedReport.report}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
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
  points: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  timestamp: {
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
  modalIcon: {
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4F8EF7',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Reports;

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet, Modal, TextInput, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { appealBlacklist } from '../../../../server/actions/trashActions'; // Update the path to your actions

const MyList = () => {
  const [communities, setCommunities] = useState([]);
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCommunityId, setSelectedCommunityId] = useState(null);
  const [description, setDescription] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const appealBlacklistState = useSelector((state) => state.appealBlacklist);
  const { loading: appealLoading, success: appealSuccess, error: appealError } = appealBlacklistState;

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBlacklistedCommunities = async () => {
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
        const response = await axios.get(`https://squareapi.pythonanywhere.com/api/v1/blacklisted-communities/?page=${page}`, config);
        if (response.data.results && response.data.results.length > 0) {
          setCommunities((prevData) => [...prevData, ...response.data.results]);
          setIsAllLoaded(response.data.results.length < 10);
        } else {
          setIsAllLoaded(true);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };

    fetchBlacklistedCommunities();
  }, [page, userInfo]);

  useEffect(() => {
    if (appealSuccess) {
      setCommunities((prevCommunities) =>
        prevCommunities.filter((community) => community.id !== selectedCommunityId)
      );
      setDescription('');
      setModalVisible(false);
    }
  }, [appealSuccess, selectedCommunityId]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleAppeal = (id) => {
    setSelectedCommunityId(id);
    setModalVisible(true);
  };

  const handleSubmit = () => {
    if (selectedCommunityId && description) {
      dispatch(appealBlacklist({  description }));

    }
  };

  const handleCancel = () => {
    setDescription('');
    setModalVisible(false);
  };

  const renderCommunity = ({ item }) => (
    <View style={styles.communityItem}>
      <Ionicons name="people" size={30} color="#000" style={styles.icon} />
      <Text style={styles.communityName}>{item?.name}</Text>
      
      <TouchableOpacity style={styles.appealButton} onPress={() => handleAppeal(item?.id)}>
        <Text style={styles.appealButtonText}>Appeal</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      
      {communities.length === 0 && !loading ? (
        <Text style={{ color: 'green' }}>
          *No Community Has BlackListed You Yet, When you are BlackListed You will see which community blacklisted you in Here.
          We Use Community BlackLists To Prevent Indecent exposure on social platforms.
        </Text>
      ):
      
      
      <Text style={{ color: 'red' }}>
      *These Are Communities Where You Have Been Blacklisted, you can appeal to be removed from a blacklist, when you are in a black list you may not be able to access community features such as Community Social Feed.
      We Use Community BlackLists To Prevent Indecent exposure on social platforms.
    </Text>
      }
      {loading ? (
        <ActivityIndicator size="large" color="#4F8EF7" />
      ) : (
        <View>

          <FlatList
            data={communities}
            renderItem={renderCommunity}
            keyExtractor={(item) => item?.community?.id.toString()}
          />
        </View>
      )}
      {!isAllLoaded && !loading && (
        <Button title="Load More" onPress={loadMore} />
      )}

      {/* Modal for Appeal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Appeal Description</Text>
            {appealError && <Text style={styles.errorText}>{appealError}</Text>}
            {appealLoading && <ActivityIndicator size="small" color="#4F8EF7" />}
            {appealSuccess && <Text style={styles.successText}>Appeal submitted successfully!</Text>}
            <TextInput
              style={styles.textInput}
              placeholder="Enter your appeal here this will be sent to the community administrator for consideration..."
              value={description}
              onChangeText={setDescription}
              multiline
            />
            <View style={styles.buttonContainer}>
              <TouchableHighlight style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  communityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  icon: {
    marginRight: 10,
  },
  communityName: {
    flex: 1,
    fontSize: 18,
  },
  appealButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  appealButtonText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  textInput: {
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  successText: {
    color: 'green',
    marginBottom: 10,
  },
});

export default MyList;

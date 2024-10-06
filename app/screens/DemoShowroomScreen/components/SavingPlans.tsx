import React, { FC, useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, FlatList, Text, ActivityIndicator, Modal, Button, Alert } from "react-native";
import { Card } from "../../../components";
import { DemoDivider } from "../DemoDivider";
import { DemoUseCase } from "../DemoUseCase";
import { AppStackScreenProps, navigate } from "app/navigators";
import { observer } from "mobx-react-lite";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { deleteSavings } from '../../../../server/actions/postActions';
import { formatDate } from "app/utils/formatDate";

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

const SavingPlans: FC<LoginScreenProps> = observer(function SavingPlans(_props: any) {
  const { navigation } = _props;

  const [searchQuery, setSearchQuery] = useState("");
  const [savings, setSavings] = useState([]);
  const [filteredSavings, setFilteredSavings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
  const [selectedSavings, setSelectedSavings] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [visibleSavings, setVisibleSavings] = useState([]);
  const [visiblePage, setVisiblePage] = useState(1);
  const itemsPerPage = 7;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const savingsDelete = useSelector(state => state.savingsDelete);
  const { loading: deleteLoading, error: deleteError, success: deleteSuccess } = savingsDelete;

  const savingsUpdate = useSelector((state: RootState) => state.savingsUpdate);
  const {  success } = savingsUpdate;

  const incomeDelete = useSelector(state => state.incomeDelete);
  const {  success: deleteIncomeSuccess } = incomeDelete;


  const categoryCreate = useSelector((state: RootState) => state.categoryCreate);
  const { success:succcessCategory } = categoryCreate;

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.get(`https://bridgerbyphil.pythonanywhere.com/api/v1/savings/?page=${page}`, config);
      setSavings((prevSavings) => [...prevSavings, ...response.data]);
      setTotalPages(response.data.total_pages || 1); // Adjust based on actual response structure
    } catch (error) {
      setError('Error fetching savings');
      console.error('Error fetching savings:', error);
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = (id: number) => {
    navigate('Saving', { id }); // Pass the id as a parameter
  };

  const handleDelete = () => {
    selectedSavings.forEach(id => {
      dispatch(deleteSavings(id));
    });
    setConfirmDeleteModalVisible(false);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = savings.filter(saving =>
      saving.goal_name.toLowerCase().includes(text.toLowerCase()) ||
      saving.description.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredSavings(filtered);
  };

  const handleSelectSaving = (id: number) => {
    setSelectedSavings(prevState =>
      prevState.includes(id) ? prevState.filter(savingId => savingId !== id) : [...prevState, id]
    );
  };

  const toggleSelectionMode = () => {
    setIsSelecting(!isSelecting);
    if (isSelecting) {
      setSelectedSavings([]);
    }
  };

  useEffect(() => {
    if (userInfo) {
      fetchData();
    }
  }, [userInfo, page]);

  useEffect(() => {
    if (deleteSuccess) {
      setSavings([]);
      setPage(1);
      fetchData();
      setSelectedSavings([]);
    }
  }, [deleteSuccess]);


  useEffect(() => {
    if (success) {
      setSavings([]);
      setPage(1);
      fetchData();
      setSelectedSavings([]);
    }
  }, [success]);

  useEffect(() => {
    if (succcessCategory) {
      setSavings([]);
      setPage(1);
      fetchData();
      setSelectedSavings([]);
    }
  }, [succcessCategory]);

  useEffect(() => {
    if (deleteIncomeSuccess) {
      setSavings([]);
      setPage(1);
      fetchData();
      setSelectedSavings([]);
    }
  }, [deleteIncomeSuccess]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [savings]);

  useEffect(() => {
    setVisibleSavings(filteredSavings.slice(0, visiblePage * itemsPerPage));
  }, [filteredSavings, visiblePage]);

  const renderSaving = ({ item }) => (
    <TouchableOpacity
      onPress={() => isSelecting ? handleSelectSaving(item.id) : goToRegister(item.id)}
      style={styles.cardContainer}
    >
      {isSelecting && (
        <View style={styles.selectionIndicator}>
          {selectedSavings.includes(item.id) && <Icon name="check" size={20} color="green" />}
        </View>
      )}
      <Card
        heading={`Goal: ${item.goal_name}`}
        content={`Target Amount: ${item.target_amount}\nAmount Saved: ${item.amount_saved}\nDescription: ${item.description}`}
        footer={`Created At: ${formatDate(item.created_at)}`}
      />
    </TouchableOpacity>
  );

  return (
    <DemoUseCase name="Saving Plans" description="Click On A Savings Plan To Customize">
      {showHint && (
        <View style={styles.hintContainer}>
          <Text style={styles.hintText}>Tap "Edit" to select and delete multiple savings plans.</Text>
        </View>
      )}
      <TextInput
        style={styles.searchInput}
        placeholder="Search Savings Plans"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <View style={styles.header}>
        <Button title={isSelecting ? "Cancel" : "Edit"} onPress={toggleSelectionMode} />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={visibleSavings}
          renderItem={renderSaving}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <DemoDivider />}
          refreshing={refreshing}
          onRefresh={() => {
            setSavings([]);
            setPage(1);
            fetchData();
          }}
        />
      )}
      {visibleSavings.length < filteredSavings.length && (
        <Button
          title="Load More"
          onPress={() => setVisiblePage(visiblePage + 1)}
        />
      )}
      {deleteLoading && <ActivityIndicator size="large" color="red" />}
      {deleteError && <Text style={styles.errorText}>{deleteError}</Text>}
      {isSelecting && (
        <TouchableOpacity style={styles.deleteButton} onPress={() => setConfirmDeleteModalVisible(true)}>
          <Text style={styles.deleteButtonText}>Delete Selected</Text>
        </TouchableOpacity>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmDeleteModalVisible}
        onRequestClose={() => setConfirmDeleteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to delete the selected savings?</Text>
            <Button title="Yes" onPress={handleDelete} />
            <Button title="No" onPress={() => setConfirmDeleteModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </DemoUseCase>
  );
});

const styles = StyleSheet.create({
  searchInput: {
    margin: 10,
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  selectionIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    margin: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  hintContainer: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  hintText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10,
  },
});

export default SavingPlans;

import React, { FC, useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { createBudget } from '../../../../server/actions/postActions';
import { RootState } from '../../store';
import { BUDGET_CREATE_RESET } from '../../../../server/constants/postConstants';


import { colors, spacing } from 'app/theme';

interface CreateBudgetModalProps {
  visible: boolean;
  onClose: () => void;
  income : number
}

const CreateBudgetModal: FC<CreateBudgetModalProps> = ({ visible, onClose, income }) => {
  const [name, setName] = useState('');
  const [incomeId, setIncomeId] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const budgetCreate = useSelector((state: RootState) => state.budgetCreate);
  const { loading, error, success } = budgetCreate;

  useEffect(() => {
    if (success) {
      // onClose();
    }
  }, [success, onClose]);

  const handleSave = () => {
    const budgetData = { name, income,  description };
    dispatch(createBudget(budgetData));
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={modalStyles.modalContainer}>
        <View style={modalStyles.modalContent}>
          <Text style={modalStyles.modalHeading}>Create Budget</Text>
          {loading && <ActivityIndicator size="large" color={colors.primary} />}
          {error && <Text style={modalStyles.errorText}>{error}</Text>}
          <TextInput
            style={modalStyles.input}
            value={name}
            onChangeText={setName}
            placeholder="Budget Name"
          />


          <TextInput
            style={modalStyles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
            multiline
          />
          <TouchableOpacity style={modalStyles.button} onPress={handleSave} disabled={loading}>
            <Text style={modalStyles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={modalStyles.button} onPress={onClose}>
            <Text style={modalStyles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
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
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default CreateBudgetModal;

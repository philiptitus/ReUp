import React, { FC, useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateIncome } from '../../../../server/actions/postActions';
import { RootState } from '../../store';
import { colors, spacing } from 'app/theme';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface EditIncomeModalProps {
  visible: boolean;
  onClose: () => void;
  incomeId: string;
  initialData: IncomeData;
}

interface IncomeData {
  amount: string;
  source: string;
  dateReceived: string;
  description: string;
}

const EditIncomeModal: FC<EditIncomeModalProps> = ({ visible, onClose, incomeId, initialData }) => {
  const [editedData, setEditedData] = useState(initialData);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const dispatch = useDispatch();

  const incomeUpdate = useSelector((state: RootState) => state.incomeUpdate);
  const { loading, error, success } = incomeUpdate;

  useEffect(() => {
    if (success) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  }, [success]);

  const handleSave = () => {
    dispatch(updateIncome(incomeId, editedData));
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setEditedData({ ...editedData, dateReceived: date.toISOString().split('T')[0] });
    hideDatePicker();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>Edit Income</Text>
            {loading ? (
              <ActivityIndicator size="large" color={colors.palette.primary} />
            ) : (
              <>
                {error && <Text style={styles.errorText}>{error}</Text>}
                {showSuccessMessage && <Text style={styles.successText}>Income updated successfully!</Text>}
                <TextInput
                  style={styles.input}
                  value={editedData.source}
                  onChangeText={(text) => setEditedData({ ...editedData, source: text })}
                  placeholder="Source"
                />
                <TextInput
                  style={styles.input}
                  value={editedData.amount}
                  onChangeText={(text) => setEditedData({ ...editedData, amount: text })}
                  placeholder="Amount"
                  keyboardType="numeric"
                />

  
                <TextInput
                  style={styles.input}
                  value={editedData.description}
                  onChangeText={(text) => setEditedData({ ...editedData, description: text })}
                  placeholder="Description"
                />
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={onClose}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)", // Adjust opacity here
  },
  modalBackground: {
    backgroundColor: colors.palette.white,
    borderRadius: spacing.sm,
    padding: spacing.md,
    width: "80%",
    maxWidth: 400,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: spacing.sm,
    padding: spacing.md,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: spacing.md,
    color: colors.palette.primary,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.palette.lightGrey,
    borderRadius: spacing.sm,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  button: {
    backgroundColor: colors.palette.primary,
    borderRadius: spacing.sm,
    paddingVertical: spacing.sm,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  buttonText: {
    color: colors.palette.white,
    fontWeight: "bold",
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  successText: {
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default EditIncomeModal;

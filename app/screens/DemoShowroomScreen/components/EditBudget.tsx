import React, { FC, useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { colors, spacing } from "app/theme";
import { updateBudget } from '../../../../server/actions/postActions';
import { RootState } from '../../store';

interface EditBudgetModalProps {
  visible: boolean;
  onClose: () => void;
  initialData: BudgetData;
  budgetId: string;
}

interface BudgetData {
  totalExpenses: string;
  startDate: string;
  endDate: string;
  description: string;
}

const EditBudgetModal: FC<EditBudgetModalProps> = ({ visible, onClose, initialData, budgetId }) => {
  const [editedData, setEditedData] = useState(initialData);
  const dispatch = useDispatch();

  const budgetUpdate = useSelector((state: RootState) => state.budgetUpdate);
  const { loading, error, success } = budgetUpdate;

  useEffect(() => {
    if (success) {
      Alert.alert("Success", "Budget updated successfully");
      onClose();
    }
    if (error) {
      Alert.alert("Error", error);
    }
  }, [success, error]);

  const handleSave = () => {
    dispatch(updateBudget(budgetId, editedData));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeading}>Edit Budget</Text>


          <TextInput
            style={styles.input}
            value={editedData.description}
            onChangeText={(text) => setEditedData({ ...editedData, description: text })}
            placeholder="Description"
          />
          <TouchableOpacity style={styles.button} onPress={handleSave} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color={colors.palette.white} />
            ) : (
              <Text style={styles.buttonText}>Save</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: spacing.sm,
    padding: spacing.md,
    width: "80%",
    maxWidth: 400,
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
});

export default EditBudgetModal;

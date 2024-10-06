import React, { FC, useState, useEffect } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from '../../../../server/actions/postActions';
import { RootState } from '../../store';
import { spacing, colors } from "app/theme";

interface EditCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  initialName: string;
  initialDescription: string;
  categoryId: string;
}

const EditCategoryModal: FC<EditCategoryModalProps> = ({
  visible,
  onClose,
  initialName,
  initialDescription,
  categoryId,
}) => {
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState(""); // Local error state
  const dispatch = useDispatch();

  const categoryUpdate = useSelector((state: RootState) => state.categoryUpdate);
  const { error, success } = categoryUpdate;

  useEffect(() => {
    if (success) {
      setLocalLoading(false);
      Alert.alert("Success", "Category updated successfully");
      onClose();
    }
    if (error) {
      setLocalLoading(false);
      setLocalError(error);
      Alert.alert("Error", error);
    }
  }, [success, error]);

  useEffect(() => {
    if (visible) {
      setLocalError(""); // Reset local error state when modal is opened
      setLocalLoading(false); // Reset loading state when modal is opened
    }
  }, [visible]);

  const handleSave = () => {
    setLocalLoading(true);
    dispatch(updateCategory(categoryId, { name, description }));
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
          <Text style={styles.modalHeading}>Edit Category</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Category Name"
          />
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Category Description"
            multiline
          />
          <TouchableOpacity style={styles.button} onPress={handleSave} disabled={localLoading}>
            {localLoading ? (
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
    backgroundColor: "rgba(0, 0, 0, 0.3)",
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
    color: "blue",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: spacing.sm,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  button: {
    backgroundColor: "blue",
    borderRadius: spacing.sm,
    paddingVertical: spacing.sm,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default EditCategoryModal;

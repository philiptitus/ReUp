import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createReport } from '../../../../server/actions/trashActions'; // Adjust the import path as needed

const CreateReport = ({ onCreate }) => {
  const dispatch = useDispatch();
  const reportCreate = useSelector(state => state.reportCreate);
  const { loading, error, success } = reportCreate;

  const [report, setReport] = useState('');
  const [points, setPoints] = useState('');

  const handleCreate = () => {
    const pointsValue = parseInt(points, 10);

    if (isNaN(pointsValue) || pointsValue < 1 || pointsValue > 100) {
      Alert.alert('Points must be a number between 1 and 100');
      return;
    }

    const reportData = {
      report,
      points: pointsValue,
    };

    dispatch(createReport(reportData));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Report</Text>

      <Text style={styles.label}>Report:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Write your report here..."
        multiline
        numberOfLines={10}
        value={report}
        onChangeText={setReport}
      />

      <Text style={styles.label}>Points (1-100):</Text>
      <TextInput
        style={styles.pointsInput}
        keyboardType="numeric"
        placeholder="Enter points"
        value={points}
        onChangeText={setPoints}
      />

      {loading && <ActivityIndicator size="large" color="#4F8EF7" style={styles.spinner} />}
      {success && <Text style={styles.successText}>Report created successfully!</Text>}
      {error && <Text style={styles.errorText}>Error: {error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create Report</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4F8EF7',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  textInput: {
    height: 200,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  pointsInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    width: '50%', // Adjust width as needed
  },
  button: {
    backgroundColor: '#4F8EF7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  spinner: {
    marginVertical: 10,
  },
  successText: {
    color: 'green',
    fontSize: 16,
    marginVertical: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginVertical: 10,
  },
});

export default CreateReport;

import React, { useState, useEffect } from 'react';
import { Modal, View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { createTrashDirect, retrievePoint } from '../../../../server/actions/trashActions'; // Adjust the import path as necessary
import Walk from './Walk';  // Adjust the import path as needed

const TrashModal = ({ isVisible, onClose, closestPoint }) => {
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const trashCreateDirect = useSelector(state => state.trashCreateDirect);
    const { loading, success, error: createError } = trashCreateDirect;
    const { point: retrievedPoint, loading: loadingPoint, success: successPoint, error: errorPoint } = useSelector((state) => state.retrievePoint);
    const [endLocation, setEndLocation] = useState(null);
    const [isWalkModalVisible, setIsWalkModalVisible] = useState(false);

    const handleSubmit = () => {
        if (!closestPoint) {
            setError('No point found');
            return;
        }
        setError('');
        dispatch(createTrashDirect({ trash_type: 'general', point: closestPoint.name }));
    };

    useEffect(() => {
        if (success && closestPoint) {
            dispatch(retrievePoint(closestPoint.name));
        }
    }, [success]);

    useEffect(() => {
        if (retrievedPoint) {
            const [latitude, longitude] = retrievedPoint.location.split(',').map(Number);
            setEndLocation({ latitude, longitude });
            setIsWalkModalVisible(true);
        }
    }, [retrievedPoint]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalView}>
                <Ionicons
                    name="trash-bin-outline"
                    size={50}
                    color="black"
                    style={styles.icon}
                />
                <Text style={styles.title}>Submit Trash Directly</Text>

                {createError && <Text style={styles.errorText}>{createError}</Text>}

                <Text style={styles.label}>Point: {closestPoint?.estate || 'N/A'} </Text>
                <Text>This is the closest disposal point to your location</Text>

                {error && <Text style={styles.errorText}>{error}</Text>}

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Button title="Start" onPress={handleSubmit} color="#841584" />
                )}
                {loadingPoint && <ActivityIndicator size="large" color="blue" />}
                {success && <View style={styles.successIndicator}><Text>Success</Text></View>}
                <Walk visible={isWalkModalVisible} onClose={() => setIsWalkModalVisible(false)} endLocation={endLocation} point={closestPoint?.name} />

                <Button title="Close" onPress={onClose} color="#808080" />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 20,
    },
    icon: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        color: 'white',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    successIndicator: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'green',
        borderRadius: 5,
    },
});

export default TrashModal;

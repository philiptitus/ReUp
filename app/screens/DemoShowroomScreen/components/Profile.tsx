import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView, RefreshControl, ActivityIndicator, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount, getUserDetails,resetAccountDelete } from '../../../../server/actions/userAction'; // Adjust the import path as necessary
import EditProfileComponent from './EditProfileComponent'; // Adjust the import path as necessary
import { navigate } from 'app/navigators';

const UserProfileComponent = ({ navigation }) => {
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [userData, setUserData] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userLogin.userInfo);
    const userDetails = useSelector((state) => state.userDetails);
    const accountDelete = useSelector((state) => state.accountDelete);
    const { loading: deleteLoading, success: deleteSuccess, error: deleteError } = accountDelete;

    const { loading, error, user } = userDetails;

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        if (userInfo) {
            dispatch(getUserDetails(userInfo.id)).then(() => {
                setRefreshing(false);
            });
        } else {
            setRefreshing(false);
        }
    }, [dispatch, userInfo]);

    useEffect(() => {
        if (userInfo) {
            dispatch(getUserDetails(userInfo.id));
        }
    }, [dispatch, userInfo]);

    useEffect(() => {
        if (user) {
            setUserData({
                name: user.name || '',
                email: user.email || '',
                community: user.coname || '',
                point: user.points || 0,

                area: user.aname || '',
                contactNumber: user.contact_number || '',
                dateJoined: user.date_joined || '',
                avi: user.avi ? `https://squareapi.pythonanywhere.com${user.avi}` : '',

            });
        }
    }, [user]);

    useEffect(() => {
        if (deleteSuccess) {
            dispatch(resetAccountDelete());
            navigate('Login'); // Navigate to login screen after account deletion
        }
    }, [deleteSuccess, dispatch, navigation]);

    const handleEditPress = () => {
        setEditModalVisible(true);
    };

    const handleCloseEditModal = () => {
        setEditModalVisible(false);
    };

    const handleSaveUserData = (updatedUserData) => {
        setUserData(updatedUserData);
    };

    const handleCloseAccountPress = () => {
        Alert.alert(
            'Close Account',
            'Are you sure you want to close your account? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => dispatch(deleteAccount()) },
            ],
            { cancelable: true }
        );
    };

    if (loading && !refreshing) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error && !refreshing) {
        return (
            <View style={styles.container}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {deleteLoading && (
                <ActivityIndicator size="large" color="#0000ff" />
            )}
            {deleteError && (
                <Text style={styles.errorText}>Error: {deleteError}</Text>
            )}
            {deleteSuccess && (
                <Text style={styles.successText}>Account deleted successfully</Text>
            )}

            <View style={styles.header}>
                <Text style={styles.title}>Your Account Information</Text>
                <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
                    <Ionicons name="pencil" size={24} color="#4F8EF7" />
                </TouchableOpacity>
            </View>
            {userData && (
                <>
                    <Image source={{ uri: userData.avi }} style={styles.avatar} />
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Name</Text>
                        <Text style={styles.value}>{userData.name}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Email</Text>
                        <Text style={styles.value}>{userData.email}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Community</Text>
                        <Text style={styles.value}>{userData.community}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Area</Text>
                        <Text style={styles.value}>{userData.area}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Contact Number</Text>
                        <Text style={styles.value}>{userData.contactNumber}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Your points - Payment Criteria Sh. 100 for every 1000 points shifting communities/ locations reesets your points. All Payments Are Made Through M-Pesa Once The Target IS Reached</Text>
                        <Text style={styles.value}>{userData.point}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.label}>Date Joined</Text>
                        <Text style={styles.value}>
                            
 {new Date(userData.dateJoined).toLocaleString()}                            
                            
                            </Text>
                    </View>

                    <TouchableOpacity style={styles.closeAccountButton} onPress={handleCloseAccountPress}>
                        <Ionicons name="close-circle" size={24} color="#d9534f" />
                        <Text style={styles.closeAccountButtonText}>Close Account</Text>
                    </TouchableOpacity>

{userInfo?.user_type === "admin" &&

<TouchableOpacity
style={styles.closeAccountButton}
onPress={() => {
  Linking.openURL('https://squareapi.pythonanywhere.com')
    .catch((err) => console.error('An error occurred', err));
}}
>
<Ionicons name="key" size={24} color="green" />
<Text style={{ color: "green", marginLeft: 8 }}>Admin Management Console</Text>
</TouchableOpacity>
}
                    <EditProfileComponent
                        icon="pencil"
                        isVisible={isEditModalVisible}
                        onClose={handleCloseEditModal}
                        userData={userData}
                        onSave={handleSaveUserData}
                    />
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    editButton: {
        padding: 10,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 20,
    },
    infoContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#777',
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    closeAccountButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        alignSelf: 'center',
    },
    closeAccountButtonText: {
        fontSize: 16,
        color: '#d9534f',
        marginLeft: 10,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
    successText: {
        color: 'green',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default UserProfileComponent;

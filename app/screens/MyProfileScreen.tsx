import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import {logout} from '../../server/actions/userAction'
import { navigate } from "app/navigators"

import { EditProfile } from './ProfileScreen';
import UserProfileComponent from './DemoShowroomScreen/components/Profile';
import { DemoDebugScreen } from './DemoDebugScreen';
import CameraView from './DemoShowroomScreen/components/CameraView';

const MyProfileScreen = () => {
  const [currentView, setCurrentView] = useState('Profile'); // Default view
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);
  const dispatch = useDispatch();



  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
    if (open) {
      drawerRef.current?.closeDrawer();
    } else {
      drawerRef.current?.openDrawer();
    }
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
    toggleDrawer();
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userInfo');
    dispatch(logout());
    navigate("Login")

    // You might want to navigate to a login screen or home screen here
  };

  return (
    <Drawer
      ref={drawerRef}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      drawerType="front"  // "front" or "back" for the drawer style
      drawerPosition="left" // "left" or "right"
      renderDrawerContent={() => (
        <View style={styles.drawerContent}>
          <TouchableOpacity onPress={() => handleNavigation('Profile')}>
            <Text style={styles.drawerItem}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleNavigation('AppInfo')}>
            <Text style={styles.drawerItem}>AppInfo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.drawerItem}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.hamburger}>
          <Text style={styles.hamburgerText}>☰</Text>
        </TouchableOpacity>
        <ScrollView>
          {currentView === 'Profile' && <UserProfileComponent />}
          {currentView === 'AppInfo' && <DemoDebugScreen />}
        </ScrollView>
      </View>
    </Drawer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hamburger: {
    padding: 30,
    alignSelf: 'flex-start',
  },
  hamburgerText: {
    fontSize: 24,
  },
  drawerContent: {
    flex: 1,
    padding: 20,
    // backgroundColor: '#fff', // or your desired background color
  },
  drawerItem: {
    fontSize: 18,
    paddingVertical: 15,
    // color: '#000', // or your desired text color
  },
});

export default MyProfileScreen;

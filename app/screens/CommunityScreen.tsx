import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';

import { EditProfile } from './ProfileScreen';
import UserProfileComponent from './DemoShowroomScreen/components/Profile';
import { DemoDebugScreen } from './DemoDebugScreen';
import CommunityDetail from './DemoShowroomScreen/components/CommunityDetail';
import Community from './DemoShowroomScreen/components/Community';
import CreateReport from './DemoShowroomScreen/components/CreateReport';
import { useDispatch, useSelector } from 'react-redux';


const CommunityScreen = () => {
  const [currentView, setCurrentView] = useState('Community'); // Default view
  const [open, setOpen] = useState(false);
  const drawerRef = useRef(null);
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  const handleCreateReport = (reportData) => {
    console.log('Report Data:', reportData);
    // Perform the create report logic here
  };
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

        <TouchableOpacity onPress={() => handleNavigation('Community')}>
            <Text style={styles.drawerItem}>Community Social Feed</Text>
          </TouchableOpacity>


          

         
          <TouchableOpacity onPress={() => handleNavigation('Info')}>
            <Text style={styles.drawerItem}>Info</Text>
          </TouchableOpacity>
        </View>



      )}

      
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.hamburger}>
          <Text style={styles.hamburgerText}>☰</Text>
        </TouchableOpacity>
        <ScrollView>
        {currentView === 'Community' && <Community/>}




          {currentView === 'Info' && <CommunityDetail />}

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

export default CommunityScreen;

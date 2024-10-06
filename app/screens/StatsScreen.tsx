import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';
import IndividualLeaderboard from './DemoShowroomScreen/components/IndividualLeaderBoard';
import CommunityLeaderboard from './DemoShowroomScreen/components/CommunityLeaderBoard';
import Reports from './DemoShowroomScreen/components/Reports';
import { EditProfile } from './ProfileScreen';
import UsersComponent from './DemoShowroomScreen/components/UsersComponent';
import TrashComponent from './DemoShowroomScreen/components/TrashComponent';
import BlacklistComponent from './DemoShowroomScreen/components/Blacklist';
import MyList from './DemoShowroomScreen/components/MyList';
import { useDispatch, useSelector } from 'react-redux';
import CreateReport from './DemoShowroomScreen/components/CreateReport';

const StatsScreen = () => {
  const [currentView, setCurrentView] = useState('IndividualLeaderboard'); // Default view
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
            <TouchableOpacity onPress={() => handleNavigation('Trash')}>
            <Text style={styles.drawerItem}>My Previous Trash Trips</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('IndividualLeaderboard')}>
            <Text style={styles.drawerItem}>Individual Leaderboard</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigation('CommunityLeaderboard')}>
            <Text style={styles.drawerItem}>Community Leaderboard</Text>
          </TouchableOpacity>
{userInfo?.user_type === "admin"  &&
          <TouchableOpacity onPress={() => handleNavigation('Reports')}>
            <Text style={styles.drawerItem}>Your Community Reports</Text>
          </TouchableOpacity>
}

{userInfo?.user_type === "staff"  &&
          <TouchableOpacity onPress={() => handleNavigation('NewReport')}>
            <Text style={styles.drawerItem}>Make a Report</Text>
          </TouchableOpacity>
}

{userInfo?.user_type === "admin"  &&

          <TouchableOpacity onPress={() => handleNavigation('Users')}>
            <Text style={styles.drawerItem}>Users</Text>
          </TouchableOpacity>
      }


{userInfo?.user_type === "admin"  &&

          <TouchableOpacity onPress={() => handleNavigation('BlackList')}>
            <Text style={styles.drawerItem}>Blacklist</Text>
          </TouchableOpacity>

      }


{userInfo?.user_type === "staff"  &&

<TouchableOpacity onPress={() => handleNavigation('BlackList')}>
  <Text style={styles.drawerItem}>Community Blacklist</Text>
</TouchableOpacity>

}

          <TouchableOpacity onPress={() => handleNavigation('MyList')}>
            <Text style={styles.drawerItem}>Your Black List</Text>
          </TouchableOpacity>

        </View>
      )}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleDrawer} style={styles.hamburger}>
          <Text style={styles.hamburgerText}>☰</Text>
        </TouchableOpacity>
        <ScrollView>
        {currentView === 'Trash' && <TrashComponent />}

          {currentView === 'IndividualLeaderboard' && <IndividualLeaderboard />}
          {currentView === 'CommunityLeaderboard' && <CommunityLeaderboard />}
          {currentView === 'Users' && <UsersComponent />}
          {currentView === 'Reports' && <Reports />}
          {currentView === 'NewReport' && <CreateReport onCreate={handleCreateReport} />}

          {currentView === 'BlackList' && <BlacklistComponent />}
          {currentView === 'MyList' && <MyList/>}

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

export default StatsScreen;

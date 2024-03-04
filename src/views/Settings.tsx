import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';
import AwesomeAlert from 'react-native-awesome-alerts';
import {REACT_APP_API_BASE_URL} from '@env';

import {useAuth0} from 'react-native-auth0';

const Settings = ({navigation, route}) => {
  const {clearSession, user} = useAuth0();
  const [showDeleteAccountAlert, setShowDeleteAccountAlert] = useState(false);

  const onLogout = async () => {
    await clearSession({}, {}).then(() => navigation.navigate('Login'));
  };

  const onUserDelete = async () => {
    await clearSession({}, {})
      .then(() => navigation.navigate('Login'))
      .then(() =>
        fetch(
          `${REACT_APP_API_BASE_URL}/users/${
            route.params.uid
          }/${encodeURIComponent(user.sub)}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        ).catch(error => {
          console.error('Error adding token:', error);
        }),
      );
  };

  return (
    <View style={styles.container}>
      <Header
        displaySettings={false}
        displayBackButton={true}
        navigation={navigation}
        uid={route.params.uid}
      />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.logoutButton} onPress={() => onLogout()}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
        <Pressable
          style={[styles.logoutButton, styles.deleteButton]}
          onPress={() => setShowDeleteAccountAlert(true)}>
          <Text style={styles.logoutButtonText}>Delete Account</Text>
        </Pressable>
        <AwesomeAlert
          show={showDeleteAccountAlert}
          showProgress={false}
          title="Are you sure you want to delete your account?"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel it"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            setShowDeleteAccountAlert(false);
          }}
          onConfirmPressed={() => {
            setShowDeleteAccountAlert(false);
            onUserDelete();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    marginTop: 30,
  },
  logoutButton: {
    backgroundColor: '#EF5350',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  logoutButtonText: {
    color: '#FFFFFF', // White text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Settings;

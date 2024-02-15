import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Header from '../components/Header';

import {useAuth0} from 'react-native-auth0';

const Settings = ({navigation, firstName, uid}) => {
    const {clearSession} = useAuth0();

  const onLogout = async () => {
    await clearSession({}, {}).then(() => navigation.navigate('Login'));
  };
  return (
  <View style={styles.container}>
    <Header displaySettings={false} displayBackButton={true} navigation={navigation} prevScreen={"Application"} firstName={firstName} uid={uid}/>
    <View style={styles.buttonContainer}>
        <Pressable style={styles.logoutButton} onPress={() => onLogout()}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </Pressable>
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

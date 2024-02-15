import React, {useState} from 'react';
import {Button, Pressable, Image, StyleSheet, Text, View} from 'react-native';
import {useAuth0} from 'react-native-auth0';

import LoadingScreen from './LoadingScreen';
import MailboxLogo from '../components/MailboxLogo';

import {REACT_APP_API_BASE_URL} from '@env';

const Login = ({navigation}) => {
  const {authorize, user, error, clearSession,  isLoading} = useAuth0();
  const [isUserSetupDone, setUserSetupDone] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [uid, setUid] = useState(null);
  const onLogin = async () => {
    setUserSetupDone(null);
    await authorize({}, {});
  };

  const loggedIn = user !== undefined && user !== null;
  if (loggedIn) {
    fetch(`${REACT_APP_API_BASE_URL}/users/email/${user.email}`)
      .then(res => res.json())
      .then(data => {
        setUserSetupDone(data.length === 1);
        if (isUserSetupDone){
            setFirstName(data[0].first_name);
            setUid(data[0].uid);
        }
      })
      .catch(err => console.log('err', err));
  }

  if (isLoading || (loggedIn && isUserSetupDone === null)) {
      navigation.navigate('LoadingScreen');
  } else if (loggedIn && isUserSetupDone !== null) {
    if (isUserSetupDone) {
      navigation.navigate('Application', {firstName: firstName, uid: uid});
    } else {
      navigation.navigate('Setup', {navigation: navigation});
    }
  } else {
  console.log("Rendering login");
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 100}}>
        <MailboxLogo/>
         </View>

        <Text style={styles.welcomeMessage}>Welcome to Your</Text>
        <Text style={styles.welcomeMessage}>Smart Security Mailbox</Text>
        <Pressable style={styles.loginButton} onPress={() => onLogin()}>
            <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
        {error && <Text style={styles.error}>{error.message}</Text>}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F2F1'
  },
  welcomeMessage: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#37474F',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  loginButton: {
      backgroundColor: '#26A69A',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 6,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
  error: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  },
});

export default Login;

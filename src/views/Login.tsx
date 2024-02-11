import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useAuth0} from 'react-native-auth0';

import LoadingScreen from './LoadingScreen';

import {REACT_APP_API_BASE_URL} from '@env';

const Login = ({navigation}) => {
  const {authorize, user, error, isLoading} = useAuth0();
  const [isUserSetupDone, setUserSetupDone] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [uid, setUid] = useState(null);
  const onLogin = async () => {
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
    return <LoadingScreen userComplete={''} user={''} />;
  } else if (loggedIn && isUserSetupDone !== null) {
    if (isUserSetupDone) {
      navigation.navigate('Application', {firstName: firstName, uid: uid});
    } else {
      navigation.navigate('Setup');
    }
  } else {
    return (
      <View>
        <Text>Smart Security Mailbox</Text>
        <Text>You are not logged in</Text>
        <Button onPress={onLogin} title={'Log In'} />
        {error && <Text>{error.message}</Text>}
      </View>
    );
  }
};

export default Login;

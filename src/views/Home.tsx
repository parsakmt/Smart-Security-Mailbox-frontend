import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, View, Text, Image} from 'react-native';
import {useAuth0} from 'react-native-auth0';
import Header from '../components/Header';
import MailboxLogo from '../components/MailboxLogo';
import {bleStart, bleConnect, bleDisconnect} from '../apis/ble';
import {REACT_APP_API_BASE_URL} from '@env';
import messaging from '@react-native-firebase/messaging';

function Home({firstName, macAddress, navigation, uid}): JSX.Element {
  const [isLocked, onIsLockedChange] = useState(true);
  // For later, when changing button design
  const [lockStatus, onLockStatusChange] = useState('Unlock');
  const [hasMailStatus, setHasMailboxStatus] = useState(false);
  const {clearSession} = useAuth0();

  const onLogout = async () => {
    await clearSession({}, {}).then(navigation.navigate('Login'));
  };

  const getToken = async () => {
    const device_token = await messaging().getToken();
    const response = await fetch(
      `${REACT_APP_API_BASE_URL}/device_tokens/${uid}`,
    );
    if (response.ok) {
      const tokens = await response.json();
      if (!tokens.includes(device_token)) {
        const userTokenData = {
          uid: uid,
          token: device_token,
        };
        fetch(`${REACT_APP_API_BASE_URL}/device_tokens`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userTokenData),
        }).catch(error => {
          console.error('Error adding token:', error);
        });
      }
    }
    console.log('Token = ', device_token);
  };

  useEffect(() => {
    bleStart();
    getToken();
  }, []);

  useEffect(() => {
    fetch(`${REACT_APP_API_BASE_URL}/mailbox_status/${uid}`)
      .then(res => res.json())
      .then(data => setHasMailboxStatus(data[0].contains_mail))
      .catch(err => console.log('err', err));
  });

  const lockAction = () => {
    if (isLocked) {
      bleConnect(macAddress);
      onIsLockedChange(false);
      onLockStatusChange('Lock');
    } else {
      bleDisconnect(macAddress);
      onIsLockedChange(true);
      onLockStatusChange('Unlock');
    }
  };
  return (
    <View style={{backgroundColor: '#E0F2F1', height: '100%'}}>
      <Header
        displayBackButton={false}
        displaySettings={true}
        navigation={navigation}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text
          style={{
            paddingTop: 50,
            color: '#42AB49',
            fontSize: 32,
            fontWeight: 'bold',
          }}>
          {firstName}'s Mailbox
        </Text>
      </View>
      <View style={{alignItems: 'center', paddingBottom: 50, paddingTop: 50}}>
        <Pressable onPress={lockAction}>
          <MailboxLogo />
        </Pressable>
      </View>
      <Text
        style={[
          styles.hasMailText,
          hasMailStatus == false && styles.noMailText,
        ]}>
        {hasMailStatus ? 'You Have Mail' : 'You Have No Mail'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hasMailText: {
    textAlign: 'center',
    color: '#42AB49',
    fontSize: 32,
    fontWeight: 'bold',
  },
  noMailText: {
    color: '#EF5350',
  },
});

export default Home;

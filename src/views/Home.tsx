import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, View, Text, Image} from 'react-native';
import {useAuth0} from 'react-native-auth0';
import Header from '../components/Header';
import MailboxLogo from '../components/MailboxLogo';
import {bleStart, bleConnect, bleDisconnect} from '../apis/ble';

function Home({firstName, macAddress, navigation}): JSX.Element {
  const [isLocked, onIsLockedChange] = useState(true);
  // For later, when changing button design
  const [lockStatus, onLockStatusChange] = useState('Unlock');
  const {clearSession} = useAuth0();

  const onLogout = async () => {
    await clearSession({}, {}).then(navigation.navigate('Login'));
  };

  useEffect(() => {
    bleStart();
  }, []);

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
        style={{
          textAlign: 'center',
          color: '#42AB49',
          fontSize: 32,
          fontWeight: 'bold',
        }}>
        You Have Mail
      </Text>
    </View>
  );
}

export default Home;

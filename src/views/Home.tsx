import React, {useEffect, useState} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {useAuth0} from 'react-native-auth0';
import {bleStart, bleConnect, bleDisconnect} from '../apis/ble';
import {GearSix} from 'phosphor-react-native';
import {MAC_ID} from '@env';

function Home({firstName, navigation}): JSX.Element {

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
    // TODO: Check if device exists first
    if (isLocked) {
      bleConnect(MAC_ID);
      onIsLockedChange(false);
      onLockStatusChange('Lock');
    } else {
      bleDisconnect(MAC_ID);
      onIsLockedChange(true);
      onLockStatusChange('Unlock');
    }
  };

  return (
    <View style={{gap: 30}}>
      <View
        style={{
          paddingTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text style={{color: '#42AB49', fontSize: 32, fontWeight: 'bold'}}>
          Welcome {firstName},
        </Text>
        <GearSix size={48} />
      </View>
      <View style={{alignItems: 'center'}}>
        <Pressable onPress={lockAction}>
          <Image source={require('../../assets/MailboxImage.png')} />
        </Pressable>
      </View>
      <Button onPress={onLogout} title={'Log Out'} />
      <Text
        style={{
          textAlign: 'center',
          color: '#42AB49',
          fontSize: 32,
          fontWeight: 'bold',
        }}>
        {firstName}'s Mailbox
      </Text>
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

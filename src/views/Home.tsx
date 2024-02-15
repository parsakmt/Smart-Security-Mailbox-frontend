import React, {useEffect, useState} from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {bleStart, bleConnect, bleDisconnect} from '../apis/ble';
import {GearSix} from 'phosphor-react-native';
import {MAC_ID} from '@env';

function Home(): JSX.Element {
  const [isLocked, onIsLockedChange] = useState(true);
  // For later, when changing button design
  const [lockStatus, onLockStatusChange] = useState('Unlock');

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
          Welcome Riley,
        </Text>
        <GearSix size={48} />
      </View>
      <View style={{alignItems: 'center'}}>
        <Pressable onPress={lockAction}>
          <Image source={require('../../assets/MailboxImage.png')} />
        </Pressable>
      </View>
      <Text
        style={{
          textAlign: 'center',
          color: '#42AB49',
          fontSize: 32,
          fontWeight: 'bold',
        }}>
        Riley's Home Mailbox
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

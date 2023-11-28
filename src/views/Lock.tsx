import React, {useEffect, useState} from 'react';
import {View, Button} from 'react-native';
import {bleStart, bleConnect, bleDisconnect} from '../apis/ble';
import {MAC_ID} from '@env';

function Lock(): JSX.Element {
  const [isLocked, onIsLockedChange] = useState(true);
  const [lockStatus, onLockStatusChange] = useState('Unlock');

  useEffect(() => {
    bleStart();
  }, []);

  const lockAction = () => {
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
      <Button onPress={lockAction} title={lockStatus} />
    </View>
  );
}

export default Lock;

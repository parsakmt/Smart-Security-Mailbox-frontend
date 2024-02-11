import React from 'react';
import {Button, View, Text, Image} from 'react-native';
import {GearSix} from 'phosphor-react-native';
import {useAuth0} from 'react-native-auth0';

function Home({firstName, navigation}): JSX.Element {
  const {clearSession} = useAuth0();

  const onLogout = async () => {
    await clearSession({}, {}).then(navigation.navigate('Login'));
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
        <Image source={require('../../assets/MailboxImage.png')} />
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

import React from 'react';
import {View, Text, Image} from 'react-native';
import {GearSix} from 'phosphor-react-native';

function Home(): JSX.Element {
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
        <GearSix size={48}/>
      </View>
      <View style={{alignItems: 'center'}}>
        <Image source={require('../../assets/MailboxImage.png')} />
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

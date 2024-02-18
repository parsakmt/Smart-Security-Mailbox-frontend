import React from 'react';
import {Button, StyleSheet, View, Text, Image} from 'react-native';
import {useAuth0} from 'react-native-auth0';
import Header from '../components/Header';
import MailboxLogo from '../components/MailboxLogo';

function Home({firstName, uid, navigation}): JSX.Element {
  return (
    <View style={{backgroundColor: '#E0F2F1', height: '100%'}}>
      <Header
        displaySettings={true}
        navigation={navigation}
        firstName={firstName}
        uid={uid}
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
        <MailboxLogo />
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

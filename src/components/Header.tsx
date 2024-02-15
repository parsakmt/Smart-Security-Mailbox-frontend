import React from 'react';
import {View, Text} from 'react-native';

function Header(): JSX.Element {
  return (
    <View style={{justifyContent:"center", backgroundColor: 'white', height:55}}>
      <Text style={{textAlign: 'center', color: "#4c9394", fontWeight:"bold", fontSize:28}}>Smart Security Mailbox</Text>
    </View>
  );
}

export default Header;

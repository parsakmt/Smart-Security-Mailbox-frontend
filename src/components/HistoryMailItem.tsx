import React from 'react';
import {View, Text} from 'react-native';

function HistoryMailItem(): JSX.Element {
  return (
    <View
      style={{
        height: 80,
        width: 350,
        alignItems: "center",
        backgroundColor: '#E1F8DB',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
        9:00 PM
      </Text>
      <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>Sept 1, 2023</Text>
    </View>
  );
}

export default HistoryMailItem;

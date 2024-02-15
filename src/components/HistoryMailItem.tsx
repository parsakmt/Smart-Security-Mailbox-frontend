import React from 'react';
import {View, Text} from 'react-native';

function HistoryMailItem({time}): JSX.Element {
  let dateTimeObject = new Date(time);
  let dateString = new Date(time).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  let timeString = new Date(time).toLocaleTimeString();

  return (
    <View
      style={{
        height: 80,
        width: 350,
        alignItems: 'center',
        backgroundColor: '#E1F8DB',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
        {timeString}
      </Text>
      <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
        {dateString}
      </Text>
    </View>
  );
}

export default HistoryMailItem;

import React, {useState} from 'react';
import {View, TextInput, FlatList} from 'react-native';
import HistoryMailItem from '../components/HistoryMailItem';

function History(): JSX.Element {
  const [startDate, onStartDateChange] = useState('Sept 1, 2023');
  const [endDate, onEndDateChange] = useState('Sept 30, 2023');

  return (
    <View style={{gap: 10}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginTop: 30,
          padding: 10,
          backgroundColor: '#9BD1A4',
        }}>
        <TextInput
          style={{backgroundColor: 'white'}}
          value={startDate}
          onChangeText={text => onStartDateChange(text)}
        />
        <TextInput
          style={{backgroundColor: 'white'}}
          value={endDate}
          onChangeText={text => onEndDateChange(text)}
        />
      </View>
      <View style={{alignItems: 'center', gap: 15}}>
        <HistoryMailItem />
        <HistoryMailItem />
        <HistoryMailItem />
        <HistoryMailItem />
        <HistoryMailItem />
        <HistoryMailItem />
        <HistoryMailItem />
        <HistoryMailItem />
        <HistoryMailItem />
      </View>
    </View>
  );
}

export default History;

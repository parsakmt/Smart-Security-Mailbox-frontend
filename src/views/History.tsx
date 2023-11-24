import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import HistoryMailItem from '../components/HistoryMailItem';
import DatePicker from 'react-native-date-picker';
import {REACT_APP_API_BASE_URL} from '@env';

function dateToStringLongFormat(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function dateToEpochTime(date: Date, isStartDate: boolean): string {
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const year = date.getFullYear();
  const localDate = isStartDate ? new Date(`${year}-${month}-${day}T00:00:00`) : new Date(`${year}-${month}-${day}T23:59:59`);
  return localDate.getTime();
}

function getDateFromToday(days, months, years) {
  let date = new Date();
  date.setDate(date.getDate() + days);
  date.setMonth(date.getMonth() + months);
  date.setFullYear(date.getFullYear() + years);
  return date;
}

function History(): JSX.Element {
  const [startDate, setStartDate] = useState(getDateFromToday(0, 0, -1));
  const [endDate, setEndDate] = useState(new Date());
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [mailData, setMailData] = useState([]);

  const getMailData = () => {
    let startDateEpoch = dateToEpochTime(startDate, true);
    let endDateEpoch = dateToEpochTime(endDate, false);
    fetch(`${REACT_APP_API_BASE_URL}/mail/${startDateEpoch}/${endDateEpoch}`)
      .then(res => res.json())
      .then(data => setMailData(data))
      .catch(err => console.log('err', err));
  };

  useEffect(() => {
    getMailData();
  }, [startDate, endDate]);

  const renderMailCards = ({item}) => <HistoryMailItem time={item.time} />;

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
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setStartDateOpen(true)}>
          <Text style={styles.buttonText}>
            {dateToStringLongFormat(startDate)}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={startDateOpen}
          mode="date"
          date={startDate}
          maximumDate={endDate}
          onConfirm={date => {
            setStartDateOpen(false);
            setStartDate(date);
          }}
          onCancel={() => {
            setStartDateOpen(false);
          }}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setEndDateOpen(true)}>
          <Text style={styles.buttonText}>
            {dateToStringLongFormat(endDate)}
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          open={endDateOpen}
          mode="date"
          date={endDate}
          minimumDate={startDate}
          onConfirm={date => {
            setEndDateOpen(false);
            setEndDate(date);
          }}
          onCancel={() => {
            setEndDateOpen(false);
          }}
        />
      </View>
      <FlatList
        data={mailData}
        renderItem={renderMailCards}
        keyExtractor={item => item.mid}
        contentContainerStyle={{alignItems: 'center'}}
        ListFooterComponent={<View style={{marginBottom: 100}} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 156,
    height: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default History;

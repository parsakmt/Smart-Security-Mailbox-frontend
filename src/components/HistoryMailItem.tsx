import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function HistoryMailItem({time}): JSX.Element {
  let dateTimeObject = new Date(time);
  let dateString = new Date(time).toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  let timeString = new Date(time).toLocaleTimeString();

  return (
    <View style={styles.card}>
    <View style={{flex: 1}}>
                <Text style={styles.timeText}>{timeString}</Text>
            </View>
        <View style={{flex: 1}}>
            <Text style={styles.dateText}>{dateString}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
     width: '90%',
    elevation: 5,
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#37474F',
  },
  dateText: {
    fontSize: 16,
    color: '#37474F',
  },
   leftColumn: {
      flex: 1,
      marginRight: 10,
    },
    rightColumn: {
      flex: 1,
      marginLeft: 10,
    },
});

export default HistoryMailItem;

import React from 'react';
import {ActivityIndicator, Button, StyleSheet, View} from 'react-native';
import {useAuth0} from 'react-native-auth0';

const LoadingScreen = ({navigation}) => {
const {clearSession} = useAuth0();
const onLogout = async () => {
    await clearSession({}, {}).then(navigation.navigate('Login'));
  };
  return (
    <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Button onPress={onLogout} title={'Log Out'} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default LoadingScreen;


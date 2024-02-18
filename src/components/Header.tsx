import React from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ArrowLeft, GearSix} from 'phosphor-react-native';
import {useAuth0} from 'react-native-auth0';

function Header({
  displayBackButton,
  displaySettings,
  navigation,
  prevScreen,
  firstName,
  uid,
}): JSX.Element {
  const {clearSession} = useAuth0();

  const onBackButton = async () => {
    if (prevScreen == 'Login') {
      await clearSession({}, {}).then(() => navigation.goBack('Login'));
    } else {
      navigation.goBack();
    }
  };
  const onPressSettings = (firstName, uid) => {
    navigation.navigate('Settings', {firstName: firstName, uid: uid});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          {displayBackButton && (
            <View>
              <TouchableOpacity onPress={() => onBackButton(firstName, uid)}>
                <ArrowLeft size={24} weight="bold" color="white" />
              </TouchableOpacity>
            </View>
          )}
          {displayBackButton && <View style={{width: 10}} />}
          <Image
            style={{width: 40, height: 40, tintColor: 'white'}}
            source={require('../../assets/mailbox_icon.png')}
          />
        </View>

        {displaySettings && (
          <View style={styles.gearContainer}>
            <TouchableOpacity onPress={() => onPressSettings()}>
              <GearSix size={28} weight="bold" color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 4.65,
    elevation: 6,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    backgroundColor: '#26A69A',
  },
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  gearContainer: {
    width: 40,
    height: 40,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;

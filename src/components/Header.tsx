import React from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ArrowLeft, GearSix} from 'phosphor-react-native';
import {useAuth0} from 'react-native-auth0';

function Header({
  displayBackButton,
  displaySettings,
  navigation,
  prevScreen,
}): JSX.Element {
  const {clearSession} = useAuth0();

  const onBackButton = async () => {
    await clearSession({}, {}).then(navigation.navigate(prevScreen));
  };
  const onPressSettings = () => {
    navigation.navigate('Settings');
  };
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
      {displayBackButton && (
              <View>
              <TouchableOpacity onPress={onBackButton}>
                <ArrowLeft size={24} weight="bold" />
              </TouchableOpacity>
              </View>
            )}
            {displayBackButton && <View style={{width: 10}} />}
        <Image
          style={{width: 40, height: 40}}
          source={require('../../assets/mailbox_icon.png')}
        />
      </View>

      {displaySettings && (
        <View style={styles.gearContainer}>
          <TouchableOpacity onPress={() => onPressSettings()}>
            <GearSix size={24} weight="bold" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  logoContainer: {
  flex: 1,
      flexDirection: 'row',
    paddingLeft: 10,
  },
  gearContainer: {
    paddingRight: 10,
  },
});

export default Header;

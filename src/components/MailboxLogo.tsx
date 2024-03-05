import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {LockSimple, LockSimpleOpen} from 'phosphor-react-native';

function MailboxLogo({locked, displayLock}): JSX.Element {
  if (locked === undefined || locked === null) {
    locked = true;
  }

  const Lock = ({isLocked}) => {
    return isLocked ? (
      <LockSimple size={128} style={{color: '#9BD1A5'}} />
    ) : (
      <LockSimpleOpen size={128} style={{color: '#D19B9B'}} />
    );
  };
  return (
    <View
      style={[
        styles.logoContainer,
        {backgroundColor: locked ? '#9BD1A5' : '#D19B9B'},
      ]}>
      <View
        style={[
          styles.innerCircle,
          {backgroundColor: locked ? '#E1F8DB' : '#F8DBE1'},
        ]}>
        {displayLock ? (
          <Lock isLocked={locked} />
        ) : (
          <Image
            source={require('../../assets/mailbox_icon.png')}
            style={[styles.logoImage, {tintColor: locked ? undefined : 'red'}]}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    width: 250,
    height: 250,
    borderRadius: 125, // half of width and height for a perfect circle
    backgroundColor: '#9BD1A5', // Outer circle color
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: '#000000',
    shadowColor: '#000',
    elevation: 6,
  },
  innerCircle: {
    width: 230,
    height: 230,
    borderRadius: 115, // half of width and height for a perfect circle
    backgroundColor: '#E1F8DB', // Inner circle color
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: '#000000',
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});

export default MailboxLogo;

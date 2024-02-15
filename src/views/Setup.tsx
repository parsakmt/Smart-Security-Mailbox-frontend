import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useAuth0} from 'react-native-auth0';
import {REACT_APP_API_BASE_URL} from '@env';

const Setup = ({navigation}) => {
  const {user} = useAuth0();
  const [firstName, setFirstName] = useState('');
  const [isValidFirstName, setIsValidFirstName] = useState(true);
  const [lastName, setLastName] = useState('');
  const [isValidLastName, setIsValidLastName] = useState(true);
  const [macAddress, setMacAddress] = useState('');
  const [isValidMacAddress, setIsValidMacAddress] = useState(true);
  const [uid, setUid] = useState(null);

  const validateFirstName = () => {
    setIsValidFirstName(firstName != '');
  };

  const validateLastName = () => {
    setIsValidLastName(lastName != '');
  };
  const validateMacAddress = () => {
    macAddressRegex = /^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$/;
    setIsValidMacAddress(macAddressRegex.test(macAddress));
  };

  const handleSubmission = () => {
    validateFirstName();
    validateLastName();
    validateMacAddress();

    if (isValidFirstName && isValidLastName && isValidMacAddress) {
      const userData = {
        email: user.email,
        first_name: firstName,
        last_name: lastName,
        mac_address: macAddress,
      };
      fetch(`${REACT_APP_API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response error');
          }
          return response.json();
        }).then(data => navigation.navigate("Application", {firstName: firstName, uid: data.uid}))
        .catch(error => {
          console.error('Error creating user:', error);
        });
    }
  };

  return (
    <View>
      <Text>
        Welcome to the Smart Security Mailbox. Please fill out the following
        fields to setup your account
      </Text>
      <TextInput
        style={[styles.input, !isValidFirstName && styles.invalid]}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="Enter First Name Here"
      />
      <TextInput
        style={[styles.input, !isValidLastName && styles.invalid]}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Enter Last Name Here"
      />
      <TextInput
        style={[styles.input, !isValidMacAddress && styles.invalid]}
        onChangeText={setMacAddress}
        value={macAddress}
        placeholder="Enter MAC Address Here"
      />
      <Button title="Submit" onPress={handleSubmission} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  invalid: {
    borderColor: 'red',
  },
});

export default Setup;

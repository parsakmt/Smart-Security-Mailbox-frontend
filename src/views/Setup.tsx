import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {useAuth0} from 'react-native-auth0';
import Header from '../components/Header';

import {REACT_APP_API_BASE_URL} from '@env';

const Setup = ({navigation}) => {
  const {user} = useAuth0();
  const [firstName, setFirstName] = useState('');
  const [isValidFirstName, setIsValidFirstName] = useState(true);
  const [lastName, setLastName] = useState('');
  const [isValidLastName, setIsValidLastName] = useState(true);
  const [macAddress, setMacAddress] = useState('');
  const [isValidMacAddress, setIsValidMacAddress] = useState(true);
  const [serviceUUID, setServiceUUID] = useState('');
const [isValidServiceUUID, setIsValidServiceUUID] = useState(true);
const [ssidCharacteristicUUID, setSSIDCharacteristicUUID] = useState('');
const [isValidSSIDCharacteristicUUID, setIsValidSSIDCharacteristicUUID] = useState(true);
const [passwordCharacteristicUUID, setPasswordCharacteristicUUID] = useState('');
const [isValidPasswordCharacteristicUUID, setIsValidPasswordCharacteristicUUID] = useState(true);
const [uidCharacteristicUUID, setUIDCharacteristicUUID] = useState('');
const [isValidUIDCharacteristicUUID, setIsValidUIDCharacteristicUUID] = useState(true);
const [wifiSSID, setWifiSSID] = useState('');
const [isValidWifiSSID, setIsValidWifiSSID] = useState(true);
const [wifiPassword, setWifiPassword] = useState('');
const [isValidWifiPassword, setIsValidWifiPassword] = useState(true);
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
  const validateServiceUUID = () => {
      setIsValidServiceUUID(serviceUUID != '');
    };
    const validateSSIDCharacteristicUUID = () => {
          setIsValidSSIDCharacteristicUUID(ssidCharacteristicUUID != '');
        };
   const validatePasswordCharacteristicUUID = () => {
             setIsValidPasswordCharacteristicUUID(passwordCharacteristicUUID != '');
           };
   const validateUIDCharacteristicUUID = () => {
                setIsValidUIDCharacteristicUUID(uidCharacteristicUUID != '');
              };
  const validateWifiSSID = () => {
                  setIsValidWifiSSID(wifiSSID != '');
                };
 const validateWifiPassword = () => {
                   setIsValidWifiPassword(wifiPassword != '');
                 };

  const handleSubmission = () => {
    validateFirstName();
    validateLastName();
    validateMacAddress();
    validateServiceUUID();
    validateSSIDCharacteristicUUID();
    validatePasswordCharacteristicUUID();
    validateUIDCharacteristicUUID();
    validateWifiSSID();
    validateWifiPassword();

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
    <View style={styles.container}>
    <Header />
    <View style={styles.inputContainer}>
      <Text style={styles.welcomeText}>
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
      <TextInput
                    style={[styles.input, !isValidServiceUUID && styles.invalid]}
                    onChangeText={setServiceUUID}
                    value={serviceUUID}
                    placeholder="Enter Service UUID Here"
                  />
      <TextInput
                    style={[styles.input, !isValidSSIDCharacteristicUUID && styles.invalid]}
                    onChangeText={setSSIDCharacteristicUUID}
                    value={ssidCharacteristicUUID}
                    placeholder="Enter SSID Characteristic UUID Here"
                  />
      <TextInput
                    style={[styles.input, !isValidPasswordCharacteristicUUID && styles.invalid]}
                    onChangeText={setPasswordCharacteristicUUID}
                    value={passwordCharacteristicUUID}
                    placeholder="Enter Password Characteristic UUID Here"
                  />
      <TextInput
                    style={[styles.input, !isValidUIDCharacteristicUUID && styles.invalid]}
                    onChangeText={setUIDCharacteristicUUID}
                    value={uidCharacteristicUUID}
                    placeholder="Enter UID Characteristic UUID Here"
                  />
      <TextInput
              style={[styles.input, !isValidWifiSSID && styles.invalid]}
              onChangeText={setWifiSSID}
              value={wifiSSID}
              placeholder="Enter WiFi SSID Here"
            />
      <TextInput
                    style={[styles.input, !isValidWifiPassword && styles.invalid]}
                    onChangeText={setWifiPassword}
                    value={wifiPassword}
                    placeholder="Enter WiFi Password Here"
                  />

      <Pressable style={styles.submitButton} onPress={() => handleSubmission()}>
                  <Text style={styles.submitButtonText}>Submit</Text>
              </Pressable>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
  flex: 1,
  justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#E0F2F1',
      padding: 20,
      },
  welcomeText: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#37474F',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#4DB6AC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  invalid: {
    borderColor: '#EF5350',
  },
  submitButton: {
    backgroundColor: '#26A69A',
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Setup;

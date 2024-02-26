import BLEManager from 'react-native-ble-manager';
import {Buffer} from 'buffer';

async function bleStart() {
  return await BLEManager.start()
    .then(() => {
      console.log('BLE module initialized');
    })
    .catch(() => {
      console.log('Error initializing BLE module');
    });
}

async function bleConnect(id: string) {
  return await BLEManager.connect(id, {autoconnect: true})
    .then(() => {
      console.log('Connected');
    })
    .catch(() => {
      console.log('Error connecting BLE');
    });
}

async function bleDisconnect(id: string) {
  return await BLEManager.disconnect(id)
    .then(() => {
      console.log('Disconnected');
    })
    .catch(() => {
      console.log('Error disconnecting BLE');
    });
}

async function bleWrite(
  id: string,
  serviceUUID: string,
  characteristicUUID: string,
  data: string,
) {
  return await BLEManager.retrieveServices(id).then(() => {
    BLEManager.writeWithoutResponse(
      id,
      serviceUUID,
      characteristicUUID,
      Buffer.from(data).toJSON().data,
      50, // max string length
    )
      .then(() => {
        console.log('Wrote response');
      })
      .catch(() => {
        console.log('Error writing response');
      });
  });
}

export {bleStart, bleConnect, bleDisconnect, bleWrite};

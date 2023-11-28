import BLEManager from 'react-native-ble-manager';

function bleStart() {
  BLEManager.start()
    .then(() => {
      console.log('BLE module initialized');
    })
    .catch(() => {
      console.log('Error initializing BLE module');
    });
}

function bleConnect(id: string) {
  BLEManager.connect(id, {autoconnect: true})
    .then(() => {
      console.log('Connected');
    })
    .catch(() => {
      console.log('Error connecting BLE');
    });
}

function bleDisconnect(id: string) {
  BLEManager.disconnect(id)
    .then(() => {
      console.log('Disconnected');
    })
    .catch(() => {
      console.log('Error disconnecting BLE');
    });
}

export {bleStart, bleConnect, bleDisconnect};

import driver from 'bigchaindb-driver';
import bip39 from 'bip39';

import APPCONFIG from '../../../../constants/Config';
import connection from '../BigchaindbConnection';
import { encrypt, decrypt } from '../../services/CryptoEncrypt';

const apiURL = APPCONFIG.apiURL;

const endPoints = {
  login: 'users/login',
  register: 'users/register'
};

export const login = credential => {
  const url = apiURL + endPoints.login;
  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(credential)
    })
    .then(response => {
      if (response.status !== 200) {
        return reject(response);
      }
      return response.json();
    })
    .then(res => resolve(res))
    .catch(err => reject(err))
  });
}

export const register = userInfo => {
  const currentIdentity = generateKeypair(userInfo.password);
  // Create asset object.
  const assetData = {
      'type': 'Identiify'
  };
  // Create metadata object.
  const metaData = {
      'name': encrypt(userInfo.name, userInfo.password),
      'DOB': encrypt(userInfo.DOB, userInfo.password),
      'address': encrypt(userInfo.address, userInfo.password),
      'email': encrypt(userInfo.email, userInfo.password),
      'created_at': new Date().toISOString(),
      'updated_at': new Date().toISOString()
  };
  // Create a CREATE transaction.
  const introduceFoodItemToMarketTransaction = driver.Transaction.makeCreateTransaction(
      assetData,
      metaData,
      [driver.Transaction.makeOutput(driver.Transaction.makeEd25519Condition(currentIdentity.publicKey))],
      currentIdentity.publicKey
  );
  // We sign the transaction
  const signedTransaction = driver.Transaction.signTransaction(introduceFoodItemToMarketTransaction, currentIdentity.privateKey);
  // Post the transaction to the network
  return new Promise((resolve, reject) => {
    connection.postTransactionCommit(signedTransaction).then(postedTransaction => {
      return postedTransaction;
    }).catch(err => {
      reject(err);
    })
  });
}

function generateKeypair(keySeed) {
  if (typeof keySeed == "undefined" || keySeed == "") return new driver.Ed25519Keypair();
  return new driver.Ed25519Keypair(bip39.mnemonicToSeed(keySeed).slice(0, 32));
}

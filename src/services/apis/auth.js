import { Transaction } from 'bigchaindb-driver';

import connection from '../BigchaindbConnection';
import { encrypt, generateKeypair, decryptProfile } from '../../services/CryptoEncrypt';

export const register = userInfo => {
  const currentIdentity = generateKeypair(userInfo.password);
  // Create asset object.
  const assetData = {
      'type': 'Identiify',
      'item': 'IDProfile'
  };
  // Create metadata object.
  const encryptKey = currentIdentity.privateKey;
  const metaData = {
      'name': encrypt(userInfo.name, encryptKey),
      'DOB': encrypt(userInfo.DOB, encryptKey),
      'address': encrypt(userInfo.address, encryptKey),
      'email': encrypt(userInfo.email, encryptKey),
      'created_at': new Date().toISOString(),
      'updated_at': new Date().toISOString()
  };
  // Create a CREATE transaction.
  const introduceFoodItemToMarketTransaction = Transaction.makeCreateTransaction(
      assetData,
      metaData,
      [Transaction.makeOutput(Transaction.makeEd25519Condition(currentIdentity.publicKey))],
      currentIdentity.publicKey
  );
  // We sign the transaction
  const signedTransaction = Transaction.signTransaction(introduceFoodItemToMarketTransaction, currentIdentity.privateKey);
  // Post the transaction to the network
  console.log('signed transaction - ', signedTransaction);
  console.log('generated password - ', userInfo.password);
  return new Promise((resolve, reject) => {
    connection.postTransactionCommit(signedTransaction)
    .then(postedTransaction => {
      resolve({ currentIdentity: currentIdentity, me: decryptProfile(postedTransaction.metadata, encryptKey) });
    }).catch(err => {
      reject(err);
    })
  });
}

export const login = userInfo => {
  const currentIdentity = generateKeypair(userInfo.password);
  const decryptKey = currentIdentity.privateKey;
  
  return new Promise((resolve, reject) => {
    // Get a list of ids of unspent transactions from a public key.
    connection.listOutputs(currentIdentity.publicKey, false).then(response => {
      console.log('response outputs - ', response);
      // select the last transaction for the latest updated profile
      const transactionId = response[response.length - 1].transaction_id;
      connection.getTransaction(transactionId).then(response => {
        console.log('response transaction - ', response);
        resolve({ currentIdentity: currentIdentity, me: decryptProfile(response.metadata, decryptKey) });
      }).catch(err => {
        reject(err);
      })
    }).catch(err => {
      reject(err);
    })
  });
}

export const updateProfile = userInfo => {
  const currentIdentity = generateKeypair(userInfo.password);
  // Create asset object.
  const assetData = {
      'type': 'Identiify',
      'item': 'IDProfile'
  };
  // Create metadata object.
  const encryptKey = currentIdentity.privateKey;
  const metaData = {
      'name': encrypt(userInfo.name, encryptKey),
      'DOB': encrypt(userInfo.DOB, encryptKey),
      'address': encrypt(userInfo.address, encryptKey),
      'email': encrypt(userInfo.email, encryptKey),
      'created_at': new Date().toISOString(),
      'updated_at': new Date().toISOString()
  };
  // Create a CREATE transaction.
  const introduceFoodItemToMarketTransaction = Transaction.makeCreateTransaction(
      assetData,
      metaData,
      [Transaction.makeOutput(Transaction.makeEd25519Condition(currentIdentity.publicKey))],
      currentIdentity.publicKey
  );
  // We sign the transaction
  const signedTransaction = Transaction.signTransaction(introduceFoodItemToMarketTransaction, currentIdentity.privateKey);
  // Post the transaction to the network
  console.log('signed transaction - ', signedTransaction);
  console.log('generated password - ', userInfo.password);
  return new Promise((resolve, reject) => {
    connection.postTransactionCommit(signedTransaction)
    .then(postedTransaction => {
      resolve({ currentIdentity: currentIdentity, me: decryptProfile(postedTransaction.metadata, encryptKey) });
    }).catch(err => {
      reject(err);
    })
  });
}

import { Transaction } from 'bigchaindb-driver';

import connection from '../BigchaindbConnection';
import { encrypt, generateKeypair } from '../../services/CryptoEncrypt';
import { store } from '../../index';

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
  const transaction = Transaction.makeCreateTransaction(
      assetData,
      metaData,
      [Transaction.makeOutput(Transaction.makeEd25519Condition(currentIdentity.publicKey))],
      currentIdentity.publicKey
  );
  // We sign the transaction
  const signedTransaction = Transaction.signTransaction(transaction, currentIdentity.privateKey);
  // Post the transaction to the network
  console.log('signed transaction - ', signedTransaction);
  console.log('generated password - ', userInfo.password);
  return new Promise((resolve, reject) => {
    connection.postTransactionCommit(signedTransaction)
    .then(response => {
      resolve({ currentIdentity: currentIdentity, generatedPassword: userInfo.password, me: response });
    }).catch(err => {
      reject(err);
    });
  });
}

export const login = userInfo => {
  const currentIdentity = generateKeypair(userInfo.password);
  
  return new Promise((resolve, reject) => {
    // Get a list of ids of unspent transactions from a public key.
    connection.listOutputs(currentIdentity.publicKey, false).then(response => {
      console.log('response outputs - ', response);
      // select the last transaction for the latest updated profile
      const transactionId = response[response.length - 1].transaction_id;
      connection.getTransaction(transactionId).then(response => {
        console.log('response transaction - ', response);
        resolve({ currentIdentity: currentIdentity, me: response });
      }).catch(err => {
        reject(err);
      })
    }).catch(err => {
      reject(err);
    })
  });
}

export const updateProfile = userInfo => {
  const { currentIdentity, me } = store.getState().auth;
  // Create metadata object.
  const encryptKey = currentIdentity.privateKey;
  const metaData = {
      'name': encrypt(userInfo.name, encryptKey),
      'DOB': encrypt(userInfo.DOB, encryptKey),
      'address': encrypt(userInfo.address, encryptKey),
      'email': encrypt(userInfo.email, encryptKey),
      'created_at': me.metadata.created_at,
      'updated_at': new Date().toISOString()
  };

  // Create a new TRANSFER transaction.
  const updateAssetTransaction = Transaction.makeTransferTransaction(
    [{ tx: me, output_index: 0 }],
    [Transaction.makeOutput(Transaction.makeEd25519Condition(currentIdentity.publicKey))],
    metaData
  )
  const signedTransaction = Transaction.signTransaction(updateAssetTransaction, currentIdentity.privateKey);
  return new Promise((resolve, reject) => {
    connection.postTransactionCommit(signedTransaction)
    .then(response => {
      resolve({ currentIdentity: currentIdentity, me: response });
    }).catch(err => {
      reject(err);
    });
  });
}

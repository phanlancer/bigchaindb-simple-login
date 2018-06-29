import { Ed25519Keypair, Transaction } from 'bigchaindb-driver';
import bip39 from 'bip39';

import connection from '../BigchaindbConnection';
import { encrypt } from '../../services/CryptoEncrypt';

export const register = userInfo => {
  const currentIdentity = generateKeypair(userInfo.password);
  // Create asset object.
  const assetData = {
      'type': 'Identiify',
      'item': 'IDProfile'
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
  return new Promise((resolve, reject) => {
    connection.postTransactionCommit(signedTransaction)
    .then(postedTransaction => {
      resolve({ currentIdentity: currentIdentity, me: postedTransaction });
    }).catch(err => {
      reject(err);
    })
  });
}

export const login = userInfo => {
  const currentIdentity = generateKeypair(userInfo.password);

  // get user information by getting an asset
  return { currentIdentity: currentIdentity, me: {} };
}

function generateKeypair(keySeed) {
  if (typeof keySeed === "undefined" || keySeed === "") return new Ed25519Keypair();
  return new Ed25519Keypair(bip39.mnemonicToSeed(keySeed).slice(0, 32));
}

import CryptoJS from 'crypto-js';
import bip39 from 'bip39';
import { Ed25519Keypair } from '../bigchaindb-driver';

export function encrypt(text, key) {
  return CryptoJS.AES.encrypt(text, key).toString();
}

export function decrypt(text, key) {
  const bytes = CryptoJS.AES.decrypt(text, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function generateKeypair(keySeed) {
  if (typeof keySeed === "undefined" || keySeed === "") return new Ed25519Keypair();
  return new Ed25519Keypair(bip39.mnemonicToSeed(keySeed).slice(0, 32));
}

export function decryptProfile(encrypted, key) {
  return {
    'name': decrypt(encrypted.name, key),
    'DOB': decrypt(encrypted.DOB, key),
    'address': decrypt(encrypted.address, key),
    'email': decrypt(encrypted.email, key)
  };
}

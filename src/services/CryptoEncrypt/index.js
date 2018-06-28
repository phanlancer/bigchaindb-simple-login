import CryptoJS from 'crypto-js';

export function encrypt(text, key) {
  return CryptoJS.AES.encrypt(text, key);
}

export function decrypt(text, key) {
  const bytes = CryptoJS.AES.decrypt(text, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}
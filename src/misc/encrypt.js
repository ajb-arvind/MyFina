import CryptoJS from 'crypto-js';
const secretPass = '$AjB2o24VaA$';

export function encrypt(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretPass).toString();
}

export function decrypt(data) {
  const bytes = CryptoJS.AES.decrypt(data, secretPass);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

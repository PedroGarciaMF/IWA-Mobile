import {NativeModules} from 'react-native';

const Encryptor = NativeModules.Encryptor;

export const encrypt = (plainText) => {
  // Add your additional custom logic here
  return Encryptor.encrypt(plainText);
};

export const decrypt = (encrptedText) => {
  // Add your additional custom logic here
  return Encryptor.decrypt(encrptedText);
};
// You can directly export this and access it
// like Encryptor.enrypt/Encryptor.decrypt
export default Encryptor;
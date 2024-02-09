// cryptoUtils.js
import CryptoJS from 'crypto-js'

const keyLengthWords = 8

const generatedKey = CryptoJS.lib.WordArray.random(keyLengthWords)

const SECRET_KEY = generatedKey.toString(CryptoJS.enc.Hex)

// Function to encrypt data
export const encryptData = (plaintext: string) => {
    const ciphertext = CryptoJS.AES.encrypt(plaintext, SECRET_KEY).toString()
    return ciphertext
}

// Function to decrypt data
export const decryptData = (ciphertext: any) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY)
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
    return decryptedData
}

// import {
//     encryptData,
//     decryptData,
// } from '../path-to-your-crypto-utils/cryptoUtils'

// const key = 'your-secret-key' // Replace with a strong and secure key
// const plaintextData = 'This is some sensitive information.'

// // Encrypt data
// const encryptedData = encryptData(key, plaintextData)

// console.log('Encrypted Data:', encryptedData)

// // Decrypt data
// const decryptedData = decryptData(key, encryptedData)

// console.log('Decrypted Data:', decryptedData)

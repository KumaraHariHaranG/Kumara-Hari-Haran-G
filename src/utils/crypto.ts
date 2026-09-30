/**
 * End-to-End Encryption (E2EE) utilities using standard Web Crypto API (AES-GCM 256-bit & SHA-256).
 * Ensures client measurement profiles, design drafts, and fitting photos are protected
 * in compliance with Guna Tailor Services 5-stage firewall and zero-trust standards.
 */

// Generate a random AES-GCM 256-bit encryption key
export async function generateAESKey(): Promise<CryptoKey> {
  return await window.crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256,
    },
    true,
    ['encrypt', 'decrypt']
  );
}

// Compute SHA-256 hash string of raw text or ArrayBuffer for integrity checks
export async function calculateSHA256(data: ArrayBuffer | string): Promise<string> {
  let buffer: ArrayBuffer;
  if (typeof data === 'string') {
    const encoder = new TextEncoder();
    buffer = encoder.encode(data).buffer as ArrayBuffer;
  } else {
    buffer = data;
  }

  const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Encrypt plaintext or file bytes using AES-GCM 256
export async function encryptData(
  plainText: string,
  passphrase = 'GunaTailor-MasterKey-2026'
): Promise<{ cipherTextBase64: string; ivBase64: string; sha256Checksum: string }> {
  const encoder = new TextEncoder();
  const dataBytes = encoder.encode(plainText);

  // Calculate integrity checksum
  const sha256Checksum = await calculateSHA256(plainText);

  // Derive key from passphrase
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  const salt = encoder.encode('GUNA-TAILOR-SALT-SALT');
  const derivedKey = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );

  // Generate 12-byte initialization vector (IV)
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    derivedKey,
    dataBytes
  );

  const cipherTextBase64 = arrayBufferToBase64(encryptedBuffer);
  const ivBase64 = arrayBufferToBase64(iv.buffer as ArrayBuffer);

  return {
    cipherTextBase64,
    ivBase64,
    sha256Checksum,
  };
}

// Decrypt ciphertext using derived AES-GCM 256 key
export async function decryptData(
  cipherTextBase64: string,
  ivBase64: string,
  passphrase = 'GunaTailor-MasterKey-2026'
): Promise<string> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const encryptedBytes = base64ToArrayBuffer(cipherTextBase64);
  const ivBytes = new Uint8Array(base64ToArrayBuffer(ivBase64));

  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  const salt = encoder.encode('GUNA-TAILOR-SALT-SALT');
  const derivedKey = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );

  const decryptedBuffer = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: ivBytes,
    },
    derivedKey,
    encryptedBytes
  );

  return decoder.decode(decryptedBuffer);
}

// Helper: Convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

// Helper: Convert Base64 to ArrayBuffer
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export const getRandomPrime = () => {
  const primes = [17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59];
  return primes[Math.floor(Math.random() * primes.length)];
};

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// randomness.ts

export const PRIME_256_BIT_HEX = `
FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF
C90FDAA2 2168C234 C4C6628B 80DC1CD1
29024E08 8A67CC74 020BBEA6 3B139B22
514A0879 8E3404DD EF9519B3 CD3A431B
`;
export const hexToBigInt = (hex: string): bigint => {
  const cleaned = hex.replace(/[^0-9a-fA-F]/g, "");
  return BigInt("0x" + cleaned);
};

export const getRandomBigIntBelow = (max: bigint): bigint => {
  const byteLength = Math.ceil(max.toString(2).length / 8);
  const array = new Uint8Array(byteLength);
  window.crypto.getRandomValues(array);
  const hex = Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const rand = BigInt("0x" + hex);
  return rand % max;
};

export const generateDiffieHellman256 = () => {
  const p = hexToBigInt(PRIME_256_BIT_HEX);
  const g = 2n;
  const a = getRandomBigIntBelow(p - 2n) + 1n;
  const b = getRandomBigIntBelow(p - 2n) + 1n;

  return { p, g, a, b };
};

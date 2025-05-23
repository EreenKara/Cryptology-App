export const gcd = (a: bigint, b: bigint): bigint => {
  return b === 0n ? a : gcd(b, a % b);
};

export const modInverse = (e: bigint, phi: bigint): bigint => {
  let [a, b] = [phi, e];
  let [x0, x1] = [0n, 1n];

  while (b !== 0n) {
    let q = a / b;
    [a, b] = [b, a % b];
    [x0, x1] = [x1, x0 - q * x1];
  }

  return x0 < 0n ? x0 + phi : x0;
};

export const isPrime = (num: bigint): boolean => {
  if (num < 2n) return false;
  for (let i = 2n; i * i <= num; i++) {
    if (num % i === 0n) return false;
  }
  return true;
};

export const generateRSAKeys = (p: bigint, q: bigint) => {
  const n = p * q;
  const phi = (p - 1n) * (q - 1n);

  let e = 3n;
  while (gcd(e, phi) !== 1n) {
    e += 2n;
  }

  const d = modInverse(e, phi);

  return {
    p,
    q,
    n,
    phi,
    e,
    d,
    publicKey: `${e},${n}`,
    privateKey: `${d},${n}`,
  };
};

export const encrypt = (msg: string, e: bigint, n: bigint): bigint[] => {
  return [...msg].map((char) => BigInt(char.charCodeAt(0)) ** e % n);
};

export const decrypt = (cipher: bigint[], d: bigint, n: bigint): string => {
  return cipher.map((c) => String.fromCharCode(Number(c ** d % n))).join("");
};

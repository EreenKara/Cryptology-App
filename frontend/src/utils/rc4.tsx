export function rc4(key: string, text: string): string {
  const S = new Array<number>(256);
  const K = new Array<number>(256);
  let i,
    j = 0;

  // Key Scheduling Algorithm (KSA)
  for (i = 0; i < 256; i++) {
    S[i] = i;
    K[i] = key.charCodeAt(i % key.length);
  }

  for (i = 0; i < 256; i++) {
    j = (j + S[i] + K[i]) % 256;
    [S[i], S[j]] = [S[j], S[i]];
  }

  // Pseudo-Random Generation Algorithm (PRGA)
  i = j = 0;
  let result = "";
  for (let c = 0; c < text.length; c++) {
    i = (i + 1) % 256;
    j = (j + S[i]) % 256;
    [S[i], S[j]] = [S[j], S[i]];
    const k = S[(S[i] + S[j]) % 256];
    result += String.fromCharCode(text.charCodeAt(c) ^ k);
  }

  return result;
}

export interface Rc4Step {
  charIndex: number;
  inputChar: string;
  i: number;
  j: number;
  S: number[];
  k: number;
  outputChar: string;
}

export function rc4WithSteps(
  key: string,
  text: string
): { encrypted: string; steps: Rc4Step[] } {
  const S = new Array<number>(256);
  const K = new Array<number>(256);
  let i,
    j = 0;

  for (i = 0; i < 256; i++) {
    S[i] = i;
    K[i] = key.charCodeAt(i % key.length);
  }

  for (i = 0; i < 256; i++) {
    j = (j + S[i] + K[i]) % 256;
    [S[i], S[j]] = [S[j], S[i]];
  }

  i = j = 0;
  let result = "";
  const steps: Rc4Step[] = [];

  for (let c = 0; c < text.length; c++) {
    i = (i + 1) % 256;
    j = (j + S[i]) % 256;
    [S[i], S[j]] = [S[j], S[i]];
    const k = S[(S[i] + S[j]) % 256];
    const charCode = text.charCodeAt(c) ^ k;
    const outputChar = String.fromCharCode(charCode);
    result += outputChar;

    steps.push({
      charIndex: c,
      inputChar: text[c],
      i,
      j,
      S: [...S.slice(0, 10)], // sadece ilk 10 elemanı göster
      k,
      outputChar,
    });
  }

  return { encrypted: result, steps };
}

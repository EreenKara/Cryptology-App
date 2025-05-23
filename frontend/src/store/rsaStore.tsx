import { create } from "zustand";

type RSAState = {
  p: bigint;
  q: bigint;
  n: bigint;
  phi: bigint;
  e: bigint;
  d: bigint;
  publicKey: string;
  privateKey: string;
  setKeys: (data: Partial<RSAState>) => void;
  reset: () => void;
};

export const useRSAStore = create<RSAState>((set) => ({
  p: 0n,
  q: 0n,
  n: 0n,
  phi: 0n,
  e: 0n,
  d: 0n,
  publicKey: "",
  privateKey: "",
  setKeys: (data) => set((state) => ({ ...state, ...data })),
  reset: () =>
    set({
      p: 0n,
      q: 0n,
      n: 0n,
      phi: 0n,
      e: 0n,
      d: 0n,
      publicKey: "",
      privateKey: "",
    }),
}));

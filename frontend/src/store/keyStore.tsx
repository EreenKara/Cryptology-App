import { create } from "zustand";

type KeyState = {
  p: bigint;
  g: bigint;
  a: bigint;
  b: bigint;
  A: bigint;
  B: bigint;
  sharedKeyA: bigint;
  sharedKeyB: bigint;
  setKeys: (data: Partial<KeyState>) => void;
  reset: () => void;
};

export const useKeyStore = create<KeyState>((set) => ({
  p: 0n,
  g: 0n,
  a: 0n,
  b: 0n,
  A: 0n,
  B: 0n,
  sharedKeyA: 0n,
  sharedKeyB: 0n,

  setKeys: (data) => set((state) => ({ ...state, ...data })),
  reset: () =>
    set({
      p: 0n,
      g: 0n,
      a: 0n,
      b: 0n,
      A: 0n,
      B: 0n,
      sharedKeyA: 0n,
      sharedKeyB: 0n,
    }),
}));

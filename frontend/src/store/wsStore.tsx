import { create } from "zustand";

type WSState = {
  userId: string | null;
  partnerId: string;
  socket: WebSocket | null;
  setUserId: (id: string) => void;
  setPartnerId: (id: string) => void;
  setSocket: (socket: WebSocket) => void;
};

export const useWSStore = create<WSState>((set) => ({
  userId: null,
  partnerId: "",
  socket: null,
  setUserId: (id) => set({ userId: id }),
  setPartnerId: (id) => set({ partnerId: id }),
  setSocket: (socket) => set({ socket }),
}));

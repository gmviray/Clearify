import { create } from "zustand";

export default create((set) => ({
    user: undefined,
    setUser: (user) => set((_) => ({ user })),
}));

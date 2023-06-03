import { create } from "zustand";
import { persist } from "zustand/middleware";
import { apiAxios } from "../utils";

export default create()(
    persist(
        (set) => ({
            user: undefined,
            signIn: async (email, password) => {
                try {
                    const response = await apiAxios.post("/sign-in", {
                        email,
                        password,
                    });

                    set((_) => ({ user: response.data.data }));

                    return response.data;
                } catch (err) {
                    if (err.response) return err.response.data;
                }
            },
            signOut: async () => {
                try {
                    const response = await apiAxios.post("/sign-out");

                    set((_) => ({ user: undefined }));
                } catch (err) {}
            },
        }),
        {
            name: "user-storage",
            partialize: (state) => ({ user: state.user }),
        }
    )
);

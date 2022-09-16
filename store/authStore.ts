import axios from "axios";
import create from "zustand";
import { persist } from "zustand/middleware";
import { BASE_URL } from "../utils";

const authStore = (set: any) => ({
  allUsers: [],
  userProfile: null,

  removeUser: () => set({ userProfile: null }),
  addUser: (user: any) => set({ userProfile: user }),
  fetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/users`);
    set({ allUsers: response.data });
  },
});

export const useAuthStore = create(persist(authStore, { name: "auth" }));

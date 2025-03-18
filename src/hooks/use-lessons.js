import { create } from "zustand";
import { $axios } from "../https/api";

export const useLessonsStore = create((set) => ({
  lessons: [],
  fetchLessons: async () => {
    try {
      const res = await $axios.get(
        "https://express.axadjonovsardorbek.uz/lesson/get/list"
      );
      set({ lessons: res.data });
    } catch (error) {
      console.error("Failed to fetch lessons:", error);
    }
  },
  setLessons: (lessons) => set({ lessons }),
}));

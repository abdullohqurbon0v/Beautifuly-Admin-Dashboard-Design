import { create } from "zustand";

export const useTasks = create(set => ({
  tasks: [],
  count: 0,
  loading: false,
  changeLoading: (value) => set(() => ({ loading: value })),
  setCount: (count) => set({ count }),
  setTasks: (tasks) => set({ tasks })
}));

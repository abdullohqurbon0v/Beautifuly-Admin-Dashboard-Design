import { create } from "zustand";

export const useUsers = create(set => ({
      users: [],
      count: 0,
      loading: false,
      changeLoading: () => set(state => ({ loading: !state.loading })),
      setCount: (count) => set({ count }),
      setUsers: (users) => set({ users })
}))
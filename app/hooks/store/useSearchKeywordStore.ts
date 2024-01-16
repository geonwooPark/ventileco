import { create } from 'zustand'

interface State {
  keyword: string
}

interface Actions {
  actions: {
    onChange: (keyword: string) => void
  }
}

const useSearchKeywordStore = create<State & Actions>()((set) => ({
  keyword: 'all',
  actions: {
    onChange: (keyword: string) => set({ keyword }),
  },
}))

export const useSearchKeyword = () =>
  useSearchKeywordStore((state) => state.keyword)
export const useSearchKeywordActions = () =>
  useSearchKeywordStore((state) => state.actions)

import { create } from 'zustand'

interface State {
  filter: {
    keyword: string
    category: string
    gu: string
  }
}

interface Actions {
  actions: {
    onKeywordChange: (keyword: string) => void
    onCategoryChange: (category: string) => void
    onGuChange: (gu: string) => void
  }
}

const useHotPlaceFilterStore = create<State & Actions>()((set) => ({
  filter: {
    keyword: '',
    category: '',
    gu: '',
  },
  actions: {
    onKeywordChange: (keyword: string) =>
      set((state) => ({ filter: { ...state.filter, keyword } })),
    onCategoryChange: (category: string) =>
      set((state) => ({ filter: { ...state.filter, category } })),
    onGuChange: (gu: string) =>
      set((state) => ({ filter: { ...state.filter, gu } })),
  },
}))

export const useHotPlaceFilter = () =>
  useHotPlaceFilterStore((state) => state.filter)
export const useKeywordChange = () =>
  useHotPlaceFilterStore((state) => state.actions.onKeywordChange)
export const useCategoryChange = () =>
  useHotPlaceFilterStore((state) => state.actions.onCategoryChange)
export const useGuChange = () =>
  useHotPlaceFilterStore((state) => state.actions.onGuChange)

import { create } from 'zustand'

interface State {
  map: any
}

interface Actions {
  actions: {
    onAdd: (map: any) => void
  }
}

const useMapStore = create<State & Actions>()((set) => ({
  map: null,
  actions: {
    onAdd: (map: any) => set({ map }),
  },
}))

export const useMap = () => useMapStore((state) => state.map)
export const useMapActions = () => useMapStore((state) => state.actions)

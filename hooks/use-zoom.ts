'use client';

import { create } from 'zustand';

interface ZoomStore {
  zoom: number;
  increaseZoom: () => void;
  decreaseZoom: () => void;
  resetZoom: () => void;
}

export const useZoom = create<ZoomStore>((set) => ({
  zoom: 1,
  
  increaseZoom: () =>
    set((state) => ({
      zoom: Math.min(2, state.zoom + 0.1),
    })),
    
  decreaseZoom: () =>
    set((state) => ({
      zoom: Math.max(0.5, state.zoom - 0.1),
    })),
    
  resetZoom: () =>
    set({
      zoom: 1,
    }),
}));
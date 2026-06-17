import { create } from 'zustand';

export interface AppWindow {
    id: string;
    title: string;
    // 1. ADD 'about' and 'projects' to the allowed components
    component: 'terminal' | 'space-invaders' | 'chat' | 'preview' | 'about' | 'projects';
    isOpen: boolean;
    zIndex: number;
    position: { x: number; y: number };
    size: { width: number; height: number };
}

interface DesktopState {
    windows: AppWindow[];
    activeZIndex: number;
    openWindow: (id: string, component: AppWindow['component'], title: string) => void;
    closeWindow: (id: string) => void;
    focusWindow: (id: string) => void;
    updateWindowProps: (id: string, props: Partial<AppWindow>) => void;
}

export const useDesktopStore = create<DesktopState>((set, get) => ({
    windows: [{
        id: 'main-terminal',
        title: 'stephen@Stephens-MacBook-Air: ~',
        component: 'terminal',
        isOpen: true,
        zIndex: 10,
        position: { x: 50, y: 50 },
        size: { width: 800, height: 500 }
    }],
    activeZIndex: 10,

    openWindow: (id, component, title) => {
        const { windows, activeZIndex } = get();
        if (windows.find(w => w.id === id)) {
            get().focusWindow(id);
            return;
        }
        const newZ = activeZIndex + 1;
        set({
            windows: [...windows, {
                id, component, title, isOpen: true, zIndex: newZ,
                position: { x: 80, y: 80 },
                size: { width: 800, height: 500 }
            }],
            activeZIndex: newZ
        });
    },

    closeWindow: (id) => set((state) => ({
        windows: state.windows.filter((w) => w.id !== id)
    })),

    focusWindow: (id) => {
        const newZ = get().activeZIndex + 1;
        set((state) => ({
            windows: state.windows.map(w => w.id === id ? { ...w, zIndex: newZ } : w),
            activeZIndex: newZ
        }));
    },

    updateWindowProps: (id, props) => set((state) => ({
        windows: state.windows.map(w => w.id === id ? { ...w, ...props } : w)
    }))
}));
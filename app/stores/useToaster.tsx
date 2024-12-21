import { create } from "zustand";

type ToastType = "success" | "error" | "info" | "warning";

type ShowToastProps = {
  title?: string;
  message?: string;
  type: ToastType;
  duration?: number;
};

interface ToastState {
  title: string | null;
  message: string | null;
  duration: number;
  type: ToastType;
  showToast: (data: ShowToastProps) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>(set => ({
  title: null,
  message: null,
  type: "info",
  duration: 3000,
  showToast: ({ title, message, type, duration = 3000 }: ShowToastProps) =>
    set({ message, title, type, duration: duration }),
  hideToast: () =>
    set({ title: null, message: null, type: "info", duration: 3000 }),
}));

/** Tiny stores for the two dialogs any screen can open: sign-in and the composer. */
import { useSyncExternalStore } from "react";
import type { PostView } from "./atproto";

interface UiState {
  loginOpen: boolean;
  /** `null` = closed, `{}` = new post, `{ replyTo }` = reply. */
  composer: { replyTo?: PostView } | null;
}

let state: UiState = { loginOpen: false, composer: null };
const listeners = new Set<() => void>();

function set(next: Partial<UiState>) {
  state = { ...state, ...next };
  listeners.forEach((fn) => fn());
}

export const openLogin = () => set({ loginOpen: true });
export const closeLogin = () => set({ loginOpen: false });
export const openComposer = (replyTo?: PostView) => set({ composer: { replyTo } });
export const closeComposer = () => set({ composer: null });

export function useUi(): UiState {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    () => state,
  );
}

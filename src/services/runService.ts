import { mockRuns } from "../data/mockRuns";
import type { Run } from "../types/run";

function delay(milliseconds: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Request aborted", "AbortError"));
      return;
    }
    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException("Request aborted", "AbortError"));
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, milliseconds);
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}


export async function fetchRuns(signal?: AbortSignal): Promise<Run[]> {
  // Optional query parameters only affect the local Vite demo, not production.
  const scenario = import.meta.env.DEV
    ? new URLSearchParams(window.location.search).get("demo")
    : null;
  await delay(scenario === "slow" ? 2400 : 650, signal);
  if (scenario === "error") throw new Error("Не удалось загрузить запуски.");
  return scenario === "empty" ? [] : structuredClone(mockRuns);
}

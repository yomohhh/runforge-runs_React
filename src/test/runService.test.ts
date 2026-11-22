import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchRuns } from "../services/runService";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("local mock service", () => {
  it("returns a Promise after a visible delay and does not expose mutable source data", async () => {
    vi.useFakeTimers();
    const promise = fetchRuns();
    let resolved = false;
    void promise.then(() => {
      resolved = true;
    });
    await vi.advanceTimersByTimeAsync(600);
    expect(resolved).toBe(false);
    await vi.advanceTimersByTimeAsync(50);
    const runs = await promise;
    expect(runs).toHaveLength(8);
    expect(new Set(runs.map((run) => run.status)).size).toBe(4);
    runs[0].name = "Changed";
    const secondPromise = fetchRuns();
    await vi.advanceTimersByTimeAsync(650);
    expect((await secondPromise)[0].name).toBe("Auth refactor");
  });

  it("rejects an aborted request and cleans up its timer", async () => {
    vi.useFakeTimers();
    const controller = new AbortController();
    const promise = fetchRuns(controller.signal);
    const assertion = expect(promise).rejects.toMatchObject({
      name: "AbortError",
    });
    controller.abort();
    await assertion;
    expect(vi.getTimerCount()).toBe(0);
  });
});

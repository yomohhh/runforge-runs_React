import { describe, expect, it } from "vitest";
import { mockRuns } from "../data/mockRuns";
import { filterRuns } from "../utils/filterRuns";
import { formatDate, formatDuration } from "../utils/format";

describe("filterRuns", () => {
  it("filters by status", () => {
    expect(filterRuns(mockRuns, "", "failed").map((run) => run.id)).toEqual([
      "run-004",
      "run-008",
    ]);
  });
  it("searches name or repository without case sensitivity and with trimmed spaces", () => {
    expect(
      filterRuns(mockRuns, "  WEB-platform  ", "all").map((run) => run.id),
    ).toEqual(["run-001", "run-004"]);
    expect(
      filterRuns(mockRuns, "CHECKOUT", "all").map((run) => run.id),
    ).toEqual(["run-002"]);
  });
  it("combines search AND status", () => {
    expect(
      filterRuns(mockRuns, "web-platform", "running").map((run) => run.id),
    ).toEqual(["run-001"]);
    expect(filterRuns(mockRuns, "web-platform", "queued")).toEqual([]);
  });
  it("does not search by branch and returns all runs for All + empty query", () => {
    expect(filterRuns(mockRuns, "feat/auth-refactor", "all")).toEqual([]);
    expect(filterRuns(mockRuns, "   ", "all")).toHaveLength(8);
  });
  it("does not mutate input data", () => {
    const before = structuredClone(mockRuns);
    filterRuns(mockRuns, "payments", "failed");
    expect(mockRuns).toEqual(before);
  });
});

describe("formatting", () => {
  it("formats optional duration and handles invalid input", () => {
    expect(formatDuration()).toBe("—");
    expect(formatDuration(0)).toBe("0 с");
    expect(formatDuration(52)).toBe("52 с");
    expect(formatDuration(60)).toBe("1 мин");
    expect(formatDuration(138)).toBe("2 мин 18 с");
    expect(formatDuration(-1)).toBe("—");
    expect(formatDuration(NaN)).toBe("—");
  });
  it("handles an invalid date without showing Invalid Date", () => {
    expect(formatDate("invalid")).toBe("Дата не указана");
    expect(formatDate("2026-11-21T09:42:00Z")).toMatch(/2026/);
  });
});

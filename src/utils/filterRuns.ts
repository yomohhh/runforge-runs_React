import type { Run, StatusFilter } from "../types/run";

export function filterRuns(
    runs: Run[],
    query: string,
    status: StatusFilter,
): Run[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return runs.filter((run) => {
    const matchesStatus = status === "all" || run.status === status;
    const matchesQuery =
        !normalizedQuery ||
        [run.name, run.repository].some((value) =>
            value.toLocaleLowerCase().includes(normalizedQuery),
        );
    return matchesStatus && matchesQuery;
  });
}

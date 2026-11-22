import type { Run, RunStatus, StatusFilter } from "../../types/run";
import { Icon } from "../ui/Icon";
import { statusLabels } from "./status";
import styles from "./RunFilters.module.css";

const statuses: StatusFilter[] = [
  "all",
  "queued",
  "running",
  "succeeded",
  "failed",
];

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  status: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  runs: Run[];
  disabled?: boolean;
};

export function RunFilters({
  query,
  onQueryChange,
  status,
  onStatusChange,
  runs,
  disabled,
}: Props) {
  return (
    <div className={styles.filters}>
      <div className={styles.top}>
        <div className={styles.searchWrap}>
          <label htmlFor="run-search" className="sr-only">
            Поиск по названию или репозиторию
          </label>
          <Icon name="search" size={18} className={styles.searchIcon} />
          <input
            id="run-search"
            type="search"
            placeholder="Поиск по названию или репозиторию…"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            disabled={disabled}
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              className={styles.clear}
              onClick={() => onQueryChange("")}
              aria-label="Очистить поиск"
            >
              <Icon name="close" size={15} />
            </button>
          )}
        </div>
        <span className={styles.hint}>Поиск без учёта регистра</span>
      </div>
      <div
        className={styles.tabs}
        role="group"
        aria-label="Фильтр по статусу"
        tabIndex={0}
      >
        {statuses.map((value) => {
          const count =
            value === "all"
              ? runs.length
              : runs.filter((run) => run.status === value).length;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={status === value}
              disabled={disabled}
              className={`${styles.tab} ${status === value ? styles.active : ""}`}
              onClick={() => onStatusChange(value)}
            >
              {value === "all" ? "All runs" : statusLabels[value as RunStatus]}
              <span className={styles.count}>{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

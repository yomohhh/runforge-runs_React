import { useCallback, useMemo, useState } from "react";
import { Header } from "../components/layout/Header";
import { Sidebar } from "../components/layout/Sidebar";
import { RunDetails } from "../components/runs/RunDetails";
import { RunFilters } from "../components/runs/RunFilters";
import { RunList } from "../components/runs/RunList";
import { ErrorState, RunsSkeleton } from "../components/ui/DataStates";
import { Icon } from "../components/ui/Icon";
import { useRuns } from "../hooks/useRuns";
import { useCompactLayout } from "../hooks/useCompactLayout";
import type { StatusFilter } from "../types/run";
import { filterRuns } from "../utils/filterRuns";
import styles from "./App.module.css";

export default function App() {
  const { state, retry } = useRuns();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const closeDetails = useCallback(() => setSelectedId(null), []);
  const compactLayout = useCompactLayout();
  const runs = useMemo(
    () => (state.status === "success" ? state.runs : []),
    [state],
  );
  const visibleRuns = useMemo(
    () => filterRuns(runs, query, status),
    [runs, query, status],
  );
  const selectedRun = runs.find((run) => run.id === selectedId);
  const isFiltered = query.trim() !== "" || status !== "all";
  const resetFilters = () => {
    setQuery("");
    setStatus("all");
  };
  const runningCount = runs.filter((run) => run.status === "running").length;
  const succeededCount = runs.filter(
    (run) => run.status === "succeeded",
  ).length;
  const failedCount = runs.filter((run) => run.status === "failed").length;

  return (
    <div className={styles.shell}>
      <a href="#main-content" className={styles.skipLink}>
        Перейти к содержимому
      </a>
      <Sidebar />
      <div className={styles.workspace}>
        <Header />
        <main id="main-content" className={styles.main} tabIndex={-1}>
          <div className={styles.pageHeading}>
            <div>
              <span className={styles.eyebrow}>AGENT OPERATIONS</span>
              <h1>
                Runs<span className={styles.titleDot}>.</span>
              </h1>
              <p>Запуски AI-агентов</p>
            </div>
            <button
              className="button-secondary"
              onClick={() => {
                closeDetails();
                retry();
              }}
              disabled={state.status === "loading"}
            >
              <Icon
                name="refresh"
                size={15}
                className={
                  state.status === "loading" ? styles.refreshing : undefined
                }
              />
              {state.status === "loading" ? "Загрузка…" : "Обновить"}
            </button>
          </div>
          <section className={styles.summary} aria-label="Сводка запусков">
            <div>
              <span className={styles.summaryLabel}>Всего запусков</span>
              <strong>{state.status === "success" ? runs.length : "—"}</strong>
              <Icon name="layers" size={19} />
            </div>
            <div>
              <span className={styles.summaryLabel}>
                <span className={`${styles.dot} ${styles.blue}`} />
                Выполняется
              </span>
              <strong>{state.status === "success" ? runningCount : "—"}</strong>
              <Icon name="running" size={19} />
            </div>
            <div>
              <span className={styles.summaryLabel}>
                <span className={`${styles.dot} ${styles.green}`} />
                Успешно
              </span>
              <strong>
                {state.status === "success" ? succeededCount : "—"}
              </strong>
              <Icon name="check" size={19} />
            </div>
            <div>
              <span className={styles.summaryLabel}>
                <span className={`${styles.dot} ${styles.red}`} />С ошибкой
              </span>
              <strong>{state.status === "success" ? failedCount : "—"}</strong>
              <Icon name="failed" size={19} />
            </div>
          </section>
          <section
            id="runs"
            className={styles.panel}
            aria-labelledby="runs-heading"
          >
            <div className={styles.panelHeading}>
              <h2 id="runs-heading">
                История запусков
                <span>{state.status === "success" ? runs.length : "…"}</span>
              </h2>
              <span className={styles.panelMeta}>
                <Icon name="clock" size={13} />
                Последние запуски
              </span>
            </div>
            <RunFilters
              query={query}
              onQueryChange={setQuery}
              status={status}
              onStatusChange={setStatus}
              runs={runs}
              disabled={state.status !== "success"}
            />
            <div aria-busy={state.status === "loading"}>
              {state.status === "loading" && <RunsSkeleton />}
              {state.status === "error" && (
                <ErrorState message={state.message} onRetry={retry} />
              )}
              {state.status === "success" && (
                <>
                  <p className="sr-only" role="status">
                    Найдено запусков: {visibleRuns.length}
                  </p>
                  <RunList
                    runs={visibleRuns}
                    total={runs.length}
                    onSelect={setSelectedId}
                    onReset={resetFilters}
                    isFiltered={isFiltered}
                    compact={compactLayout}
                  />
                </>
              )}
            </div>
          </section>
          <footer className={styles.pageFooter}>
            <span>
              <Icon name="logo" size={16} />
              Built for builders. Powered by agents.
            </span>
            <span>
              Runforge frontend demo <span aria-hidden="true">·</span> 2026
            </span>
          </footer>
        </main>
      </div>
      {selectedRun && <RunDetails run={selectedRun} onClose={closeDetails} />}
    </div>
  );
}

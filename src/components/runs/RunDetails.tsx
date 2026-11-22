import type { Run } from "../../types/run";
import { formatDate, formatDuration } from "../../utils/format";
import { Drawer } from "../ui/Drawer";
import { Icon } from "../ui/Icon";
import { LogLines } from "./LogLines";
import { StatusBadge } from "./StatusBadge";
import { statusDescriptions } from "./status";
import styles from "./RunDetails.module.css";

export function RunDetails({
                             run,
                             onClose,
                           }: {
  run: Run;
  onClose: () => void;
}) {
  return (
      <Drawer
          title={run.name}
          eyebrow={`Детали запуска / ${run.id}`}
          onClose={onClose}
      >
        <div className={styles.statusLine}>
          <StatusBadge status={run.status} />
          <span>{statusDescriptions[run.status]}</span>
        </div>
        <dl className={styles.metadata}>
          <div>
            <dt>Репозиторий</dt>
            <dd>{run.repository}</dd>
          </div>
          <div>
            <dt>Ветка</dt>
            <dd className={styles.branch}>
              <Icon name="branch" size={14} />
              {run.branch}
            </dd>
          </div>
          <div>
            <dt>Создан</dt>
            <dd>
              <time dateTime={run.createdAt}>{formatDate(run.createdAt)}</time>
            </dd>
          </div>
          <div>
            <dt>Длительность</dt>
            <dd>{formatDuration(run.durationSeconds)}</dd>
          </div>
        </dl>
        <section aria-labelledby={`${run.id}-logs`}>
          <div className={styles.sectionHeading}>
            <h3 id={`${run.id}-logs`}>
              <Icon name="runs" size={17} />
              Логи выполнения
            </h3>
            <span>{run.logs.length} строк</span>
          </div>
          <div
              className={styles.logs}
              tabIndex={0}
              role="region"
              aria-label="Логи запуска, прокручиваемая область"
          >
            <LogLines logs={run.logs} />
          </div>
        </section>
        <section className={styles.result} aria-labelledby={`${run.id}-result`}>
          <div className={styles.sectionHeading}>
            <h3 id={`${run.id}-result`}>
              <Icon
                  name={run.status === "failed" ? "failed" : "layers"}
                  size={17}
              />
              Результат
            </h3>
          </div>
          {run.result ? (
              <p
                  className={
                    run.status === "failed"
                        ? styles.failedResult
                        : styles.successResult
                  }
              >
                {run.result}
              </p>
          ) : (
              <p className={styles.muted}>
                {run.status === "queued" || run.status === "running"
                    ? "Результат появится после завершения запуска."
                    : "Для этого запуска результат не указан."}
              </p>
          )}
        </section>
        <p className={styles.demoNote}>
          <Icon name="shield" size={14} />
          Демонстрационный запуск. Код не выполняется.
        </p>
      </Drawer>
  );
}
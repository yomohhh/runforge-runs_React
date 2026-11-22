import type { Run } from "../../types/run";
import { formatDate, formatDuration } from "../../utils/format";
import { Icon } from "../ui/Icon";
import { StatusBadge } from "./StatusBadge";
import styles from "./RunList.module.css";

type Props = {
  runs: Run[];
  onSelect: (id: string) => void;
  total: number;
  onReset: () => void;
  isFiltered: boolean;
  compact: boolean;
};

function Repository({ run }: { run: Run }) {
  return (
    <span className={styles.repository}>
      <span>{run.repository}</span>
      <small>
        <Icon name="branch" size={12} />
        {run.branch}
      </small>
    </span>
  );
}

export function RunList({
  runs,
  onSelect,
  total,
  onReset,
  isFiltered,
  compact,
}: Props) {
  if (!runs.length)
    return (
      <div className={styles.empty} role="status">
        <span className={styles.emptyIcon}>
          <Icon name={total ? "search" : "inbox"} size={28} />
        </span>
        <h3>{total ? "Ничего не найдено" : "Запусков пока нет"}</h3>
        <p>
          {total
            ? "Попробуйте другое название или измените фильтр статуса."
            : "Здесь появятся запуски, когда mock-сервис вернёт данные."}
        </p>
        {isFiltered && (
          <button className="button-secondary" onClick={onReset}>
            Сбросить поиск и фильтры
          </button>
        )}
      </div>
    );

  return (
    <>
      {!compact && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className="sr-only">
              Запуски AI-агентов. Нажмите на название, чтобы открыть детали.
            </caption>
            <thead>
              <tr>
                <th scope="col">Запуск</th>
                <th scope="col">Репозиторий / ветка</th>
                <th scope="col">Статус</th>
                <th scope="col">Создан</th>
                <th scope="col">Длительность</th>
                <th scope="col">
                  <span className="sr-only">Детали</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {runs.map((run) => (
                <tr key={run.id} onClick={() => onSelect(run.id)}>
                  <td>
                    <button
                      className={styles.nameButton}
                      onClick={(event) => {
                        event.stopPropagation();
                        onSelect(run.id);
                      }}
                      aria-label={`Открыть детали: ${run.name}`}
                    >
                      <span className={styles.runIcon}>
                        <Icon name="runs" size={17} />
                      </span>
                      <span>
                        <strong>{run.name}</strong>
                        <small className={styles.runId}>{run.id}</small>
                      </span>
                    </button>
                  </td>
                  <td>
                    <Repository run={run} />
                  </td>
                  <td>
                    <StatusBadge status={run.status} />
                  </td>
                  <td className={styles.date}>
                    <time dateTime={run.createdAt}>
                      {formatDate(run.createdAt)}
                    </time>
                  </td>
                  <td className={styles.duration}>
                    {formatDuration(run.durationSeconds)}
                  </td>
                  <td>
                    <Icon name="chevron" size={15} className={styles.chevron} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {compact && (
        <div className={styles.cards}>
          {runs.map((run) => (
            <button
              key={run.id}
              className={styles.card}
              onClick={() => onSelect(run.id)}
              aria-label={`Открыть детали: ${run.name}`}
            >
              <span className={styles.cardTop}>
                <strong>{run.name}</strong>
                <StatusBadge status={run.status} />
              </span>
              <Repository run={run} />
              <span className={styles.cardBottom}>
                <time dateTime={run.createdAt}>
                  {formatDate(run.createdAt)}
                </time>
                <span>
                  <Icon name="clock" size={13} />
                  {formatDuration(run.durationSeconds)}
                  <Icon name="chevron" size={14} />
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
      <div className={styles.listFooter}>
        <span>
          Показано <strong>{runs.length}</strong> из {total} запусков
        </span>
        <span>
          <Icon name="shield" size={13} />
          Локальные демо-данные
        </span>
      </div>
    </>
  );
}

import { Icon } from "./Icon";
import styles from "./DataStates.module.css";

export function RunsSkeleton() {
  return (
    <div
      className={styles.skeleton}
      role="status"
      aria-label="Загружаем запуски"
    >
      <span className="sr-only">Загружаем запуски…</span>
      <div className={styles.loadingText}>
        <Icon name="running" size={17} className={styles.spinner} />
        Подключаемся к mock-сервису…
      </div>
      {Array.from({ length: 6 }, (_, index) => (
        <div className={styles.row} key={index} aria-hidden="true">
          <span className={styles.avatar} />
          <div>
            <span className={styles.line} />
            <span className={styles.shortLine} />
          </div>
          <span className={styles.badge} />
        </div>
      ))}
    </div>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className={styles.error} role="alert">
      <span className={styles.errorIcon}>
        <Icon name="failed" size={28} />
      </span>
      <h3>Не удалось загрузить запуски</h3>
      <p>{message} Проверьте соединение и попробуйте ещё раз.</p>
      <button className="button-primary" onClick={onRetry}>
        <Icon name="refresh" size={16} />
        Повторить
      </button>
    </div>
  );
}

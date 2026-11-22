import { Icon } from "../ui/Icon";
import styles from "./Sidebar.module.css";

export function Sidebar() {
  return (
    <aside className={styles.sidebar} aria-label="Информация о рабочей области">
      <a
        className={styles.brand}
        href="#main-content"
        aria-label="Runforge — к содержимому"
      >
        <span className={styles.logo}>
          <Icon name="logo" size={25} />
        </span>
        runforge
      </a>
      <div className={styles.workspace}>
        <span className={styles.workspaceIcon}>
          <Icon name="layers" size={18} />
        </span>
        <div>
          <strong>web-platform</strong>
          <small>Демо-пространство</small>
        </div>
        <span className={styles.workspaceTag}>DEV</span>
      </div>
      <div className={styles.navSection}>
        <span className={styles.label}>WORKSPACE</span>
        <nav aria-label="Текущий раздел">
          <a href="#runs" className={styles.active} aria-current="page">
            <Icon name="runs" size={18} />
            Runs
            <span className={styles.navDot} />
          </a>
        </nav>
      </div>
      <div className={styles.description}>
        <span className={styles.label}>ВАШ AI-WORKSPACE</span>
        <p>
          От идеи до результата.
          <br />
          Каждый запуск — под контролем.
        </p>
        <ul>
          <li>
            <Icon name="check" size={14} />
            Запуски и статусы
          </li>
          <li>
            <Icon name="check" size={14} />
            Логи выполнения
          </li>
          <li>
            <Icon name="check" size={14} />
            Результаты агентов
          </li>
        </ul>
      </div>
      <div className={styles.bottom}>
        <div className={styles.runtime}>
          <span className={styles.runtimeIcon}>
            <Icon name="shield" size={21} />
          </span>
          <strong>Isolated by design</strong>
          <p>
            Безопасное пространство
            <br />
            для ваших AI-агентов.
          </p>
          <span className={styles.runtimeLine}>
            RUNTIME ENVIRONMENT <span>01</span>
          </span>
        </div>
        <div className={styles.local}>
          <span className={styles.onlineDot} />
          Local mock service<span>v.1.0</span>
        </div>
      </div>
    </aside>
  );
}

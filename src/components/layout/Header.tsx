import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.breadcrumb}>
        <span>Workspace</span>
        <span aria-hidden="true">/</span>
        <strong>Runs</strong>
      </div>
      <div className={styles.right}>
        <span className={styles.live}>
          <span />
          Демо-режим
        </span>
        <span className={styles.divider} />
        <span className={styles.avatar} aria-label="Демо-пользователь">
          DF
        </span>
      </div>
    </header>
  );
}

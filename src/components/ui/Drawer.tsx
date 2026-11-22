import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Icon } from "./Icon";
import styles from "./Drawer.module.css";

type Props = {
  title: string;
  eyebrow: string;
  onClose: () => void;
  children: ReactNode;
};

export function Drawer({ title, eyebrow, onClose, children }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    const previousFocus =
        document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;
    const previousOverflow = document.body.style.overflow;
    const appRoot = document.getElementById("root");
    const previousInert = appRoot?.inert ?? false;
    if (appRoot) appRoot.inert = true;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const elements = panelRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), [tabindex="0"]',
      );
      if (!elements?.length) {
        event.preventDefault();
        panelRef.current?.focus();
        return;
      }
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (appRoot) appRoot.inert = previousInert;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [onClose]);

  return createPortal(
      <div
          className={styles.overlay}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
      >
        <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className={styles.panel}
        >
          <header className={styles.header}>
            <div>
              <span className={styles.eyebrow}>{eyebrow}</span>
              <h2 id={titleId}>{title}</h2>
            </div>
            <button
                ref={closeRef}
                className={styles.close}
                onClick={onClose}
                aria-label="Закрыть детали"
            >
              <Icon name="close" />
            </button>
          </header>
          <div className={styles.content}>{children}</div>
          <footer className={styles.footer}>
            <button className="button-secondary" onClick={onClose}>
              <span aria-hidden="true">←</span> Вернуться к списку
            </button>
            <span>Esc — закрыть</span>
          </footer>
        </div>
      </div>,
      document.body,
  );
}

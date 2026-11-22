import styles from "./RunDetails.module.css";

type Props = {
    logs: string[];
};

export function LogLines({ logs }: Props) {
    if (logs.length === 0) {
        return <p className={styles.muted}>Логи пока отсутствуют.</p>;
    }

    return (
        <>
            {logs.map((line, index) => {
                const isError = /error/i.test(line);
                return (
                    <div
                        key={index}
                        className={`${styles.logLine} ${isError ? styles.errorLine : ""}`}
                    >
                        <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                        <code>{line}</code>
                    </div>
                );
            })}
        </>
    );
}
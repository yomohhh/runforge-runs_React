import type { RunStatus } from "../../types/run";
import { Icon } from "../ui/Icon";
import { statusIcons, statusLabels } from "./status";
import styles from "./StatusBadge.module.css";

export function StatusBadge({ status }: { status: RunStatus }) {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      <Icon name={statusIcons[status]} size={13} />
      {statusLabels[status]}
    </span>
  );
}

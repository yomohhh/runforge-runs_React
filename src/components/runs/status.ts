import type { RunStatus } from "../../types/run";
import type { IconName } from "../ui/Icon";

export const statusLabels: Record<RunStatus, string> = {
  queued: "Queued",
  running: "Running",
  succeeded: "Succeeded",
  failed: "Failed",
};
export const statusDescriptions: Record<RunStatus, string> = {
  queued: "Ожидает запуска",
  running: "Выполняется",
  succeeded: "Успешно завершён",
  failed: "Завершён с ошибкой",
};
export const statusIcons: Record<RunStatus, IconName> = {
  queued: "queued",
  running: "running",
  succeeded: "check",
  failed: "failed",
};

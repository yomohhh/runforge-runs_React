import type { Run } from "../types/run";

// Fixed dates keep the demo and its snapshots reproducible.
export const mockRuns: Run[] = [
  {
    id: "run-001",
    name: "Auth refactor",
    repository: "web-platform",
    branch: "feat/auth-refactor",
    status: "running",
    createdAt: "2026-11-21T09:42:00Z",
    logs: [
      "[09:42:00] Preparing isolated runtime",
      "[09:42:02] Repository web-platform checked out",
      "[09:42:04] Installing dependencies",
      "[09:42:12] Agent is refactoring the authentication flow",
    ],
  },
  {
    id: "run-002",
    name: "Fix checkout tests",
    repository: "payments",
    branch: "fix/checkout-tests",
    status: "succeeded",
    createdAt: "2026-11-21T09:15:00Z",
    durationSeconds: 138,
    logs: [
      "[09:15:00] Runtime ready",
      "[09:15:08] Running checkout test suite",
      "[09:17:14] Updated assertions for payment retries",
      "[09:17:18] All 42 tests passed",
    ],
    result:
      "Исправлена обработка повторной оплаты. Все 42 теста пройдены; подготовлено 3 изменения в checkout-модуле.",
  },
  {
    id: "run-003",
    name: "Update dependencies",
    repository: "api-service",
    branch: "chore/dependencies",
    status: "queued",
    createdAt: "2026-11-21T08:58:00Z",
    logs: [
      "[08:58:00] Run accepted",
      "[08:58:00] Waiting for an available runtime",
    ],
  },
  {
    id: "run-004",
    name: "Build landing page",
    repository: "web-platform",
    branch: "feat/landing",
    status: "failed",
    createdAt: "2026-11-21T08:30:00Z",
    durationSeconds: 74,
    logs: [
      "[08:30:00] Runtime ready",
      "[08:30:12] Generating landing page components",
      "[08:31:13] Running production build",
      "[08:31:14] ERROR: Missing module @/components/Hero",
    ],
  },
  {
    id: "run-005",
    name: "Add payment webhooks",
    repository: "payments",
    branch: "feat/webhooks",
    status: "running",
    createdAt: "2026-11-21T08:10:00Z",
    durationSeconds: 245,
    logs: [
      "[08:10:00] Preparing isolated runtime",
      "[08:10:05] Reading webhook specification",
      "[08:13:58] Implementing signature verification",
    ],
  },
  {
    id: "run-006",
    name: "Optimize API queries",
    repository: "api-service",
    branch: "perf/database-queries",
    status: "succeeded",
    createdAt: "2026-11-20T17:45:00Z",
    durationSeconds: 386,
    logs: [
      "[17:45:00] Runtime ready",
      "[17:45:20] Profiling database queries",
      "[17:51:24] Added index and removed duplicate reads",
      "[17:51:26] Benchmark completed",
    ],
    result:
      "Добавлен индекс для выборки заказов. Время ответа контроллера в тестовом сценарии сократилось с 240 до 85 мс.",
  },
  {
    id: "run-007",
    name: "Sync design tokens",
    repository: "design-system",
    branch: "chore/design-tokens",
    status: "queued",
    createdAt: "2026-11-20T16:20:00Z",
    logs: [
      "[16:20:00] Run accepted",
      "[16:20:01] Queued after dependency update",
    ],
  },
  {
    id: "run-008",
    name: "Repair image pipeline",
    repository: "media-worker",
    branch: "fix/image-pipeline",
    status: "failed",
    createdAt: "2026-11-20T15:05:00Z",
    durationSeconds: 52,
    logs: [
      "[15:05:00] Runtime ready",
      "[15:05:10] Processing image fixtures",
      "[15:05:52] ERROR: Unsupported color profile in fixture cover.tif",
    ],
    result:
      "Запуск остановлен на обработке тестового изображения. Требуется поддержка цветового профиля CMYK.",
  },
];

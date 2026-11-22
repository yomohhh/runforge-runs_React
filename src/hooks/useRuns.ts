import { useCallback, useEffect, useState } from "react";
import { fetchRuns } from "../services/runService";
import type { RunRequestState } from "../types/run";

export function useRuns() {
  const [state, setState] = useState<RunRequestState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => {
    setState({ status: "loading" });
    setAttempt((value) => value + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetchRuns(controller.signal)
      .then((runs) => {
        if (!controller.signal.aborted) setState({ status: "success", runs });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "Неизвестная ошибка загрузки.",
        });
      });

    return () => controller.abort();
  }, [attempt]);

  return { state, retry };
}

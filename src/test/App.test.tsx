import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "../app/App";
import { mockRuns } from "../data/mockRuns";
import { fetchRuns } from "../services/runService";

vi.mock("../services/runService", () => ({ fetchRuns: vi.fn() }));
const mockedFetch = vi.mocked(fetchRuns);
const openButton = (name: string) =>
  screen.getAllByRole("button", { name: `Открыть детали: ${name}` })[0];
const loaded = () => waitFor(() => expect(mockedFetch).toHaveBeenCalled());

beforeEach(() => {
  mockedFetch.mockResolvedValue(structuredClone(mockRuns));
});
afterEach(() => vi.unstubAllGlobals());

describe("Runs page", () => {
  it("shows loading then all eight runs", async () => {
    render(<App />);
    expect(
      screen.getByRole("status", { name: "Загружаем запуски" }),
    ).toBeInTheDocument();
    await screen.findByText("Auth refactor");
    expect(
      screen.getAllByRole("button", { name: /^Открыть детали:/ }),
    ).toHaveLength(8);
    expect(screen.getByRole("button", { name: "Обновить" })).toBeEnabled();
  });

  it("filters by status and visibly marks the active filter", async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText("Auth refactor");
    const failedFilter = screen.getByRole("button", { name: /^Failed/ });
    await user.click(failedFilter);
    expect(failedFilter).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /^All runs/ })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(screen.queryByText("Auth refactor")).not.toBeInTheDocument();
    expect(screen.getByText("Build landing page")).toBeInTheDocument();
    expect(screen.getByText("Repair image pipeline")).toBeInTheDocument();
  });

  it("searches by repository and combines search with status", async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText("Auth refactor");
    await user.type(screen.getByRole("searchbox"), "  WEB-PLATFORM  ");
    expect(screen.getByText("Auth refactor")).toBeInTheDocument();
    expect(screen.getByText("Build landing page")).toBeInTheDocument();
    expect(screen.queryByText("Fix checkout tests")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /^Running/ }));
    expect(screen.getByText("Auth refactor")).toBeInTheDocument();
    expect(screen.queryByText("Build landing page")).not.toBeInTheDocument();
  });

  it("opens details with logs and result, closes with Escape and restores focus", async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText("Auth refactor");
    const trigger = openButton("Fix checkout tests");
    await user.click(trigger);
    const dialog = screen.getByRole("dialog", { name: "Fix checkout tests" });
    expect(
      within(dialog).getByText(/Все 42 теста пройдены/),
    ).toBeInTheDocument();
    expect(within(dialog).getByText(/All 42 tests passed/)).toBeInTheDocument();
    expect(
      within(dialog).getByText("fix/checkout-tests", { exact: false }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Закрыть детали" }),
    ).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("works without optional duration and result", async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText("Auth refactor");
    await user.click(openButton("Auth refactor"));
    const dialog = screen.getByRole("dialog");
    expect(
      within(dialog).getByText("Результат появится после завершения запуска."),
    ).toBeInTheDocument();
    expect(within(dialog).getByText("—")).toBeInTheDocument();
    expect(within(dialog).queryByText(/undefined|NaN/)).not.toBeInTheDocument();
  });

  it("shows empty search and resets both search and status", async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText("Auth refactor");
    await user.type(screen.getByRole("searchbox"), "does-not-exist");
    await user.click(screen.getByRole("button", { name: /^Failed/ }));
    expect(screen.getByText("Ничего не найдено")).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: "Сбросить поиск и фильтры" }),
    );
    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(screen.getByRole("button", { name: /^All runs/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      screen.getAllByRole("button", { name: /^Открыть детали:/ }),
    ).toHaveLength(8);
  });

  it("shows a real error and retries the request successfully", async () => {
    mockedFetch.mockRejectedValueOnce(new Error("Сбой mock-сервиса."));
    const user = userEvent.setup();
    render(<App />);
    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Сбой mock-сервиса.",
    );
    await user.click(screen.getByRole("button", { name: "Повторить" }));
    await screen.findByText("Auth refactor");
    expect(mockedFetch).toHaveBeenCalledTimes(2);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("handles an empty dataset without a broken reset action", async () => {
    mockedFetch.mockResolvedValue([]);
    render(<App />);
    expect(await screen.findByText("Запусков пока нет")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Сбросить поиск и фильтры" }),
    ).not.toBeInTheDocument();
  });

  it("keeps search and filter when returning from details", async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText("Auth refactor");
    await user.type(screen.getByRole("searchbox"), "payments");
    await user.click(screen.getByRole("button", { name: /^Succeeded/ }));
    await user.click(openButton("Fix checkout tests"));
    await user.click(
      screen.getByRole("button", { name: /Вернуться к списку/ }),
    );
    expect(screen.getByRole("searchbox")).toHaveValue("payments");
    expect(screen.getByRole("button", { name: /^Succeeded/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("traps keyboard focus inside the drawer", async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText("Auth refactor");
    await user.click(openButton("Auth refactor"));
    await user.tab({ shift: true });
    expect(
      screen.getByRole("button", { name: /Вернуться к списку/ }),
    ).toHaveFocus();
    await user.tab();
    expect(
      screen.getByRole("button", { name: "Закрыть детали" }),
    ).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("region", { name: /Логи запуска/ })).toHaveFocus();
  });

  it("renders mobile cards without a duplicate hidden table", async () => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    render(<App />);
    await screen.findByText("Auth refactor");
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: /^Открыть детали:/ }),
    ).toHaveLength(8);
  });

  it("closes details on the backdrop and restores focus", async () => {
    const user = userEvent.setup();
    render(<App />);
    await screen.findByText("Auth refactor");
    const trigger = openButton("Auth refactor");
    await user.click(trigger);
    await user.click(screen.getByRole("dialog").parentElement!);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("aborts the request on unmount", async () => {
    const { unmount } = render(<App />);
    await loaded();
    const signal = mockedFetch.mock.calls[0][0];
    expect(signal?.aborted).toBe(false);
    unmount();
    expect(signal?.aborted).toBe(true);
  });
});

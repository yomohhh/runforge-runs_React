import type { ReactNode } from "react";

const paths = {
  logo: (
    <>
      <path d="M5 16h14a4 4 0 0 0 .5-8A6 6 0 0 0 8 6.5 4.8 4.8 0 0 0 5 16Z" />
      <path d="M9 12h6m-3-3v6" />
    </>
  ),
  runs: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="m7 9 3 3-3 3m6 0h4" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  close: <path d="m6 6 12 12M6 18 18 6" />,

  chevron: <path d="m9 5 7 7-7 7" />,
  branch: (
    <>
      <circle cx="6" cy="5" r="2" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="6" r="2" />
      <path d="M6 7v10m12-9a10 10 0 0 1-10 10" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  failed: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="m9 9 6 6m-6 0 6-6" />
    </>
  ),
  running: (
    <>
      <path d="M20 12a8 8 0 1 1-8-8" />
      <path d="M12 8a4 4 0 1 0 4 4" />
    </>
  ),
  queued: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M8 12h8" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5" />
    </>
  ),
  shield: (
    <>
      <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  refresh: (
    <>
      <path d="M20 7v5h-5M4 17v-5h5" />
      <path d="M6 7a7 7 0 0 1 12-1l2 6M4 12l2 6a7 7 0 0 0 12-1" />
    </>
  ),
  inbox: (
    <>
      <path d="m4 4-2 12v4h20v-4L20 4H4Z" />
      <path d="M2 16h6l2 3h4l2-3h6M8 8h8m-6 4h4" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof paths;

export function Icon({
  name,
  size = 20,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

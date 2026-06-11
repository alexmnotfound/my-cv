export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="MR — Matias Rodriguez"
      role="img"
    >
      <rect x="1.25" y="1.25" width="29.5" height="29.5" rx="8" strokeWidth="1.5" />
      <path d="M7.5 21.5v-10l4 5.5 4-5.5v10" strokeWidth="2" />
      <path d="M19 21.5v-10h3.25a2.875 2.875 0 0 1 0 5.75H19" strokeWidth="2" />
      <path d="M21.75 17.25l2.75 4.25" strokeWidth="2" />
    </svg>
  )
}

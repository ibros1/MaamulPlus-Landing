/** The decorative arch from the brand mark, used faintly behind the Enterprise card and the CTA band. */
export function Arch({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 280 260" aria-hidden="true" focusable="false">
      <path
        d="M34 134 V112 A53 53 0 0 1 140 112 V250 M140 112 A53 53 0 0 1 246 112 V250"
        fill="none"
        stroke="currentColor"
        strokeWidth="40"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

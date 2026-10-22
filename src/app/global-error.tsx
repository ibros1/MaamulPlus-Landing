'use client';

/** Last-resort error boundary for the root layout. Plain HTML: the layout and styles may not have loaded. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '64px 24px', textAlign: 'center' }}>
        <h1 style={{ fontWeight: 500 }}>Something went wrong.</h1>
        <p>Please try again in a moment.</p>
        <button type="button" onClick={reset} style={{ marginTop: 16, padding: '10px 18px', cursor: 'pointer' }}>
          Try again
        </button>
      </body>
    </html>
  );
}

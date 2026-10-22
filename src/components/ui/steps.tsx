interface StepsProps {
  items: readonly { title: string; body: string }[];
}

/** Numbered steps (01, 02, …) drawn with a CSS counter. */
export function Steps({ items }: StepsProps) {
  return (
    <ol className="steps">
      {items.map((s) => (
        <li key={s.title}>
          <h3>{s.title}</h3>
          <p>{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

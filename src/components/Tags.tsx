export function Tags({ items, label }: { items: string[]; label?: string }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={label}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-md border border-line bg-surface px-2 py-0.5 text-[0.8rem] leading-6 text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

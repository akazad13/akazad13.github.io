export function Footer({ name }: { name: string }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-[0.9rem] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </p>
        <p className="text-xs text-muted/80">
          Built with React, TypeScript &amp; Vite
        </p>
      </div>
    </footer>
  );
}

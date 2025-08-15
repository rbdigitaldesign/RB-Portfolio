import React from "react";

type Props = { children: React.ReactNode };

export default function StatusNote({ children }: Props) {
  return (
    <aside
      className="my-4 rounded-xl border p-4 text-sm
                 border-primary/20
                 bg-primary/10
                 text-primary/90 dark:border-primary/30 dark:bg-primary/20 dark:text-primary-foreground/80"
      role="note"
      aria-label="status note"
    >
      {children}
    </aside>
  );
}

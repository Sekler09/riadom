const soonRows = [
  { label: 'Friends', id: 'friends' },
  { label: 'My activities', id: 'activities' },
] as const;

const ProfileSoonRows = () => {
  return (
    <section aria-label="Coming soon">
      <p className="text-label mb-2">In Riadom</p>
      <ul className="border-t border-border/60">
        {soonRows.map((row) => (
          <li
            key={row.id}
            className="flex min-h-11 items-center justify-between gap-4 border-b border-border/60 py-3 opacity-60"
            aria-disabled="true"
          >
            <span className="text-sm font-medium">{row.label}</span>
            <span className="text-kicker">Soon</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export { ProfileSoonRows };

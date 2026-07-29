const activities = [
  'pickup basketball',
  'sunset hike',
  'study session',
  'concert meetup',
  'board game night',
  'morning run',
  'photography walk',
  'coffee & co-work',
];

const MarqueeSection = () => {
  const items = [...activities, ...activities];

  return (
    <section
      className="border-y border-border/50 py-5"
      aria-label="Activity types on riadom"
    >
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

        <div className="animate-marquee flex w-max items-center gap-0 motion-reduce:animate-none">
          {items.map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="text-kicker flex shrink-0 items-center tracking-[0.18em]"
            >
              <span className="px-6">{name}</span>
              <span className="text-border" aria-hidden="true">
                /
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export { MarqueeSection };

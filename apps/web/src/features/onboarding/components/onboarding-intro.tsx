const OnboardingIntro = () => {
  return (
    <div className="lg:col-span-5 lg:sticky lg:top-[calc(5rem+env(safe-area-inset-top))] lg:self-start">
      <p className="text-label mb-8 border-l border-foreground pl-4">
        before you hit the map
      </p>
      <h1 className="type-display-lg">
        who are you
        <span className="block text-muted-foreground">showing up as</span>
      </h1>
      <p className="text-body-lg mt-6 max-w-[36ch]">
        people see this once you share an activity — not while they browse the
        map.
      </p>
    </div>
  );
};

export { OnboardingIntro };

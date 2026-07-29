import {
  PageContainer,
  Section,
  SectionHeader,
} from '@repo/ui/components/section';
import { cn } from '@repo/ui/lib/utils';

import { useInView } from '@/hooks/use-in-view';

const stories = [
  {
    quote:
      'I joined a pickup game on a whim and ended up with a regular crew. No awkward profile browsing — we just played.',
    name: 'alex m.',
    role: 'pickup basketball',
  },
  {
    quote:
      'Moved to a new city and found a hiking group in my first week. Way better than scrolling strangers’ photos.',
    name: 'jordan l.',
    role: 'sunset hike',
  },
  {
    quote:
      'We coordinated the concert meetup on riadom, then moved to telegram after. Exactly how it should work.',
    name: 'sam r.',
    role: 'concert meetup',
  },
];

const StoriesSection = () => {
  const { ref, inView } = useInView();

  return (
    <Section id="stories">
      <PageContainer ref={ref}>
        <SectionHeader
          className={cn(
            'transition-all duration-700',
            inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
          )}
          label="stories"
          heading={
            <>
              people who met
              <span className="block text-muted-foreground">by showing up</span>
            </>
          }
        />

        <div className="grid-editorial md:grid-cols-3">
          {stories.map((item, index) => (
            <figure
              key={item.name}
              className={cn(
                'flex flex-col bg-background p-6 transition-all duration-700 md:p-8',
                inView
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0',
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <blockquote className="mb-8 flex-1 text-sm leading-[1.75] text-foreground/90">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="border-t border-border/60 pt-4">
                <p className="text-sm font-medium tracking-[-0.01em] lowercase">
                  {item.name}
                </p>
                <p className="text-kicker mt-1">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </PageContainer>
    </Section>
  );
};

export { StoriesSection };

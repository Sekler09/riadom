import {
  PageContainer,
  Section,
  SectionHeader,
} from '@repo/ui/components/section';
import { cn } from '@repo/ui/lib/utils';
import { Handshake, Map, UserCheck } from 'lucide-react';

import { useInView } from '@/hooks/use-in-view';

const steps = [
  {
    step: '01',
    title: 'discover on the map',
    description:
      'open riadom and see activities near you — basketball, hikes, study groups, concert meetups.',
    icon: Map,
  },
  {
    step: '02',
    title: 'join and get approved',
    description:
      'request a spot or join instantly. location and contact details unlock only after approval.',
    icon: UserCheck,
  },
  {
    step: '03',
    title: 'show up, connect off-app',
    description:
      'meet in person, then swap handles on telegram, instagram, or wherever you chat.',
    icon: Handshake,
  },
];

const HowItWorksSection = () => {
  const { ref, inView } = useInView();

  return (
    <Section id="how-it-works" muted>
      <PageContainer ref={ref}>
        <SectionHeader
          className={cn(
            'transition-all duration-700',
            inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
          )}
          label="how it works"
          heading={
            <>
              three steps to
              <span className="block text-muted-foreground">meeting irl</span>
            </>
          }
        />

        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className={cn(
                'relative border-t border-foreground/20 pt-6 transition-all duration-700',
                inView
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0',
              )}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="mb-6 flex items-end justify-between">
                <span className="font-display text-4xl font-medium tracking-[-0.04em] text-foreground/15">
                  {item.step}
                </span>
                <span className="icon-box size-10">
                  <item.icon
                    className="size-4"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
              </div>
              <h3 className="mb-3 text-base font-medium tracking-[-0.02em] lowercase">
                {item.title}
              </h3>
              <p className="text-sm leading-body text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </PageContainer>
    </Section>
  );
};

export { HowItWorksSection };

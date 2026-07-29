import {
  PageContainer,
  Section,
  SectionHeader,
} from '@repo/ui/components/section';
import { cn } from '@repo/ui/lib/utils';
import {
  ExternalLink,
  Lock,
  Map,
  Shield,
  UserCheck,
  Users,
} from 'lucide-react';

import { useInView } from '@/hooks/use-in-view';

const features = [
  {
    title: 'map-first discovery',
    description:
      'the map is home. browse pickup games, hikes, study sessions, and meetups — then tap to join.',
    icon: Map,
    className: 'md:col-span-2 md:row-span-2',
    highlight: true,
  },
  {
    title: 'join real activities',
    description:
      'request a spot or join instantly. the host approves who shows up.',
    icon: UserCheck,
    className: 'md:col-span-1',
  },
  {
    title: 'no in-app chat',
    description:
      'once approved, see social handles and continue on telegram, instagram, or whatsapp.',
    icon: ExternalLink,
    className: 'md:col-span-1',
  },
  {
    title: 'gated contact info',
    description:
      'handles are only visible to people you share an approved activity with.',
    icon: Lock,
    className: 'md:col-span-1',
  },
  {
    title: 'masked locations',
    description:
      'exact coordinates stay hidden until you are approved onto an activity.',
    icon: Shield,
    className: 'md:col-span-1',
  },
  {
    title: 'friends across activities',
    description:
      'a persistent friends list tracks people you have met through different hangouts.',
    icon: Users,
    className: 'md:col-span-2',
  },
];

const FeaturesSection = () => {
  const { ref, inView } = useInView();

  return (
    <Section id="features">
      <PageContainer ref={ref}>
        <SectionHeader
          className={cn(
            'transition-all duration-700',
            inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0',
          )}
          label="features"
          heading={
            <>
              the activity is the reason,
              <span className="block text-muted-foreground">
                not the profile
              </span>
            </>
          }
          description="built for people who want to meet offline — without swiping, profile carousels, or dm-first browsing."
        />

        <div className="grid-editorial md:grid-cols-4 md:grid-rows-3">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={cn(
                'bg-background p-6 transition-all duration-700 md:p-8',
                feature.className,
                inView
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-8 opacity-0',
              )}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <span className="icon-box mb-6 size-9">
                <feature.icon
                  className="size-4"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </span>
              <h3
                className={cn(
                  'mb-3 font-medium tracking-[-0.02em] lowercase',
                  feature.highlight && 'text-lg',
                )}
              >
                {feature.title}
              </h3>
              <p className="text-sm leading-body text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </PageContainer>
    </Section>
  );
};

export { FeaturesSection };

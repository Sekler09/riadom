import { Button } from '@repo/ui/components/button';
import { PageContainer } from '@repo/ui/components/section';
import {
  ArrowUpRight,
  BookOpen,
  MapPin,
  Music,
  Trophy,
  Trees,
} from 'lucide-react';

const mapActivities = [
  {
    id: 1,
    title: 'pickup basketball',
    meta: 'today · 5 pm · ~1.2 km',
    spots: '3/8 joined',
    icon: Trophy,
    pin: 'top-[28%] left-[22%]',
  },
  {
    id: 2,
    title: 'sunset hike',
    meta: 'sat · 6 am · ~3.4 km',
    spots: '5/10 joined',
    icon: Trees,
    pin: 'top-[18%] right-[30%]',
  },
  {
    id: 3,
    title: 'study session',
    meta: 'tomorrow · 2 pm · ~0.8 km',
    spots: '2/4 joined',
    icon: BookOpen,
    pin: 'bottom-[32%] left-[38%]',
  },
  {
    id: 4,
    title: 'concert meetup',
    meta: 'fri · 7 pm · ~2.1 km',
    spots: '6/12 joined',
    icon: Music,
    pin: 'bottom-[24%] right-[22%]',
  },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-(--header-height)">
      <div
        className="surface-muted pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      />

      <PageContainer className="pb-24 pt-16 md:pb-32 md:pt-24">
        <div className="grid items-end gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-12">
          <div className="max-w-xl">
            <p
              className="animate-fade-up text-label mb-8 border-l border-foreground pl-4"
              style={{ animationDelay: '0.1s' }}
            >
              meet through activities
            </p>

            <h1
              className="animate-fade-up type-display-xl mb-8"
              style={{ animationDelay: '0.2s' }}
            >
              find your people
              <span className="block text-muted-foreground">by showing up</span>
            </h1>

            <p
              className="animate-fade-up text-body-lg mb-10 max-w-md"
              style={{ animationDelay: '0.35s' }}
            >
              discover pickup games, hikes, study sessions, and meetups on a
              map. join, get approved, meet offline — then continue on telegram,
              instagram, or wherever you actually talk.
            </p>

            <div
              className="animate-fade-up flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: '0.45s' }}
            >
              <Button size="lg">
                find activities
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="tracking-nav normal-case"
                nativeButton={false}
                render={<a href="#how-it-works" />}
              >
                how it works
              </Button>
            </div>

            <p
              className="animate-fade-up text-kicker mt-8"
              style={{ animationDelay: '0.55s' }}
            >
              no swiping · no in-app dms
            </p>
          </div>

          <div
            className="animate-fade-up animate-float"
            style={{ animationDelay: '0.6s' }}
          >
            <div className="overflow-hidden border border-border/70 bg-card">
              <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
                <p className="text-label">map view</p>
                <div className="text-kicker flex items-center gap-2">
                  <MapPin className="size-3" aria-hidden="true" />
                  near you
                </div>
              </div>

              <div className="grid md:grid-cols-[1fr_240px]">
                <div className="border-b border-border/60 p-4 md:border-r md:border-b-0">
                  <div
                    className="surface-muted relative h-56"
                    aria-label="Map preview showing nearby activities"
                  >
                    <div
                      className="absolute inset-0 opacity-25"
                      style={{
                        backgroundImage:
                          'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                      }}
                      aria-hidden="true"
                    />
                    {mapActivities.map((activity) => (
                      <span
                        key={activity.id}
                        className={`icon-box absolute ${activity.pin} size-7 -translate-x-1/2 -translate-y-1/2 bg-background`}
                        aria-hidden="true"
                      >
                        <activity.icon className="size-3.5" strokeWidth={1.5} />
                      </span>
                    ))}
                    <div className="text-kicker absolute right-3 bottom-3 border border-border/70 bg-background/90 px-2 py-1">
                      location masked
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 p-4">
                  <div>
                    <p className="text-label mb-2">up next</p>
                    <p className="text-sm font-medium tracking-[-0.01em] lowercase">
                      pickup basketball
                    </p>
                    <p className="mt-1 text-[11px] tracking-[0.06em] text-muted-foreground lowercase">
                      today · 5 pm · approx. 1.2 km
                    </p>
                  </div>

                  <div className="scroll-fade-y no-scrollbar max-h-36 overflow-y-auto">
                    <div className="flex flex-col gap-px bg-border/60">
                      {mapActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-start gap-3 bg-card p-2.5"
                        >
                          <span className="icon-box mt-0.5 size-7 shrink-0">
                            <activity.icon
                              className="size-3.5"
                              strokeWidth={1.5}
                              aria-hidden="true"
                            />
                          </span>
                          <div className="min-w-0 text-left">
                            <p className="truncate text-xs font-medium tracking-[-0.01em] lowercase">
                              {activity.title}
                            </p>
                            <p className="text-[10px] tracking-[0.04em] text-muted-foreground lowercase">
                              {activity.meta}
                            </p>
                            <p className="text-kicker text-foreground/70">
                              {activity.spots}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-[11px] tracking-[0.1em]"
                  >
                    request to join
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
};

export { HeroSection };

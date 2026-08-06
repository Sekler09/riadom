import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { PageContainer, Section } from '@repo/ui/components/section';
import { ArrowUpRight } from 'lucide-react';

const CtaSection = () => {
  return (
    <Section>
      <PageContainer>
        <div className="border border-border/60 px-8 py-16 md:px-16 md:py-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="text-label mb-4">early access</p>
            <h2 className="type-display-lg mb-4">
              something&apos;s happening
              <span className="block text-muted-foreground">near you</span>
            </h2>
            <p className="text-body-lg mb-10">
              be first to discover and join real-world activities in your area.
              sign in with telegram when we launch.
            </p>

            <form
              className="mx-auto flex max-w-md flex-col gap-2 sm:flex-row"
              onSubmit={(event) => event.preventDefault()}
            >
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@email.com"
                required
                className="flex-1"
              />
              <Button type="submit" size="lg" className="shrink-0">
                join waitlist
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Button>
            </form>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
};

export { CtaSection };

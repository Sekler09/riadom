import { Logo } from '@repo/ui/components/logo';
import { Link, Outlet } from '@tanstack/react-router';

import { MetaballCanvas } from '@/features/auth/components/metaball-canvas';

const AuthLayout = () => {
  return (
    <main className="flex min-h-svh w-full flex-col bg-background lg:grid lg:grid-cols-2">
      <section className="relative h-[clamp(220px,38svh,360px)] shrink-0 overflow-hidden border-b border-border lg:h-auto lg:min-h-svh lg:border-r lg:border-b-0">
        <div className="pointer-events-none absolute inset-0">
          <MetaballCanvas />
        </div>

        <div className="pointer-events-none relative z-10 flex h-full flex-col p-6 lg:justify-between lg:p-12">
          <Logo className="hidden lg:inline-flex" />

          <p className="text-kicker mt-auto lg:hidden">
            meet through activities
          </p>

          <div className="hidden max-w-md space-y-3 lg:block">
            <h2 className="type-display-lg">
              find your people
              <span className="block text-muted-foreground">by showing up</span>
            </h2>
            <p className="text-kicker">no swiping · no in-app dms</p>
          </div>
        </div>
      </section>

      <section className="flex flex-1 flex-col justify-center px-6 py-10 sm:px-10 lg:min-h-svh lg:p-12">
        <div className="mb-10 flex items-center justify-between lg:hidden">
          <Link to="/" className="text-foreground" aria-label="riadom home">
            <Logo />
          </Link>
        </div>

        <Outlet />
      </section>
    </main>
  );
};

export { AuthLayout };

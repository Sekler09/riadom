import { useState } from 'react';
import { Button } from '@repo/ui/components/button';
import { Logo } from '@repo/ui/components/logo';
import { cn } from '@repo/ui/lib/utils';
import { Menu, X } from 'lucide-react';

import { navLinks } from '@/features/landing/constants/nav-links';

const navLinkClassName =  'h-auto px-0 text-nav normal-case hover:bg-transparent';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background">
        <div className="page-container grid h-(--header-height) grid-cols-[1fr_auto_1fr] items-center">
          <a
            href="#"
            className="justify-self-start text-foreground"
            aria-label="riadom home"
          >
            <Logo />
          </a>

          <nav
            className="hidden items-center gap-9 md:flex"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                size="sm"
                className={navLinkClassName}
                nativeButton={false}
                render={<a href={link.href} />}
              >
                {link.label}
              </Button>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-5">
            <Button
              variant="ghost"
              size="sm"
              className={cn(navLinkClassName, 'hidden sm:inline-flex')}
              nativeButton={false}
              render={<a href="#" />}
            >
              sign in
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hidden text-[11px] tracking-caps uppercase md:inline-flex"
              nativeButton={false}
              render={<a href="#" />}
            >
              join
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-10 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? (
                <X className="size-4" strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Menu className="size-4" strokeWidth={1.5} aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <div
        id="mobile-nav"
        className={cn(
          'fixed inset-0 z-40 bg-background transition-opacity duration-300 md:hidden',
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col px-6 pt-24 pb-8">
          <nav
            className="flex flex-col gap-6 border-t border-border/50 pt-8"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                className="type-display-md h-auto justify-start p-0 normal-case hover:bg-transparent"
                nativeButton={false}
                render={<a href={link.href} onClick={() => setOpen(false)} />}
              >
                {link.label}
              </Button>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-4 border-t border-border/50 pt-8">
            <Button
              variant="ghost"
              size="sm"
              className={cn(navLinkClassName, 'justify-start')}
              nativeButton={false}
              render={<a href="#" onClick={() => setOpen(false)} />}
            >
              sign in
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full"
              nativeButton={false}
              render={<a href="#" onClick={() => setOpen(false)} />}
            >
              join waitlist
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export { Navbar };

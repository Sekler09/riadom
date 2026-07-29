import { Logo } from '@repo/ui/components/logo';
import { PageContainer } from '@repo/ui/components/section';

const footerLinks = [
  { label: 'features', href: '#features' },
  { label: 'how it works', href: '#how-it-works' },
  { label: 'stories', href: '#stories' },
  { label: 'privacy', href: '#' },
  { label: 'terms', href: '#' },
];

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12">
      <PageContainer className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <Logo className="text-[1.15rem]" />

        <nav
          className="flex flex-wrap justify-center gap-x-8 gap-y-2"
          aria-label="Footer navigation"
        >
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-nav">
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-kicker">© {new Date().getFullYear()} riadom</p>
      </PageContainer>
    </footer>
  );
};

export { Footer };

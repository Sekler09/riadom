import * as React from 'react';

import { cn } from '../lib/utils.js';

const PageContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(function PageContainer({ className, ...props }, ref) {
  return (
    <div ref={ref} className={cn('page-container', className)} {...props} />
  );
});

function Section({
  className,
  muted = false,
  ...props
}: React.ComponentProps<'section'> & { muted?: boolean }) {
  return (
    <section
      className={cn(
        'section-padding',
        muted && 'surface-muted border-y border-border/50',
        className,
      )}
      {...props}
    />
  );
}

type SectionHeaderProps = Omit<React.ComponentProps<'div'>, 'title'> & {
  label: string;
  heading: React.ReactNode;
  description?: string;
  align?: 'left' | 'center';
};

function SectionHeader({
  label,
  heading,
  description,
  align = 'left',
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-16 max-w-xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
      {...props}
    >
      <p className="text-label mb-4">{label}</p>
      <h2 className="type-display-lg mb-4">{heading}</h2>
      {description && (
        <p
          className={cn(
            'text-body-lg max-w-md',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export { PageContainer, Section, SectionHeader };

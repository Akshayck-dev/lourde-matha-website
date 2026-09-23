import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-display text-[13px] font-medium uppercase tracking-[0.18em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        gold: 'bg-gold text-maroon-deep shadow-[0_2px_14px_rgba(176,141,58,0.28)] hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_12px_30px_rgba(176,141,58,0.4)]',
        maroon:
          'bg-maroon text-ivory shadow-[0_2px_14px_rgba(92,22,34,0.28)] hover:-translate-y-0.5 hover:bg-maroon-rich hover:shadow-[0_12px_30px_rgba(92,22,34,0.4)]',
        outline:
          'border border-ivory/40 text-ivory hover:-translate-y-0.5 hover:border-gold-light hover:text-gold-light hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)]',
        outlineDark:
          'border border-maroon/25 text-maroon-deep hover:-translate-y-0.5 hover:border-gold hover:bg-maroon hover:text-ivory hover:shadow-soft',
        ghost: 'text-maroon-deep hover:bg-maroon/5',
      },
      size: {
        default: 'h-12 px-8',
        sm: 'h-10 px-6 text-xs',
        lg: 'h-14 px-10 text-sm',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'maroon',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };

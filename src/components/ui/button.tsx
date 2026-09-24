import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

/* Reference-site style: sharp corners, 2px outlines, uppercase Montserrat, flat. */
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[3px] font-display text-[12px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        gold: 'border-2 border-gold bg-transparent text-gold hover:bg-gold hover:text-white',
        goldSolid:
          'border-2 border-gold bg-gold text-white hover:border-gold-dark hover:bg-gold-dark',
        maroon:
          'border-2 border-maroon-deep bg-maroon-deep text-ivory hover:border-maroon hover:bg-maroon',
        accent:
          'border-2 border-accent-cyan bg-accent-cyan text-white hover:border-maroon-deep hover:bg-maroon-deep',
        outline:
          'border-2 border-ivory/70 text-ivory hover:border-ivory hover:bg-ivory hover:text-maroon-deep',
        outlineDark:
          'border-2 border-maroon-deep/30 text-maroon-deep hover:border-gold hover:bg-gold hover:text-white',
        white:
          'border-2 border-ivory bg-ivory text-maroon-deep hover:border-ivory hover:bg-transparent hover:text-ivory',
        ghost: 'text-maroon-deep hover:bg-maroon/5',
      },
      size: {
        default: 'h-12 px-8',
        sm: 'h-10 px-6',
        lg: 'h-14 px-10 text-[13px]',
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

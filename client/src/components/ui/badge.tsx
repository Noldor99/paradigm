import * as React from 'react'

import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  cn(
    'inline-flex items-center px-2 py-2 text-xs transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
  ),
  {
    variants: {
      variant: {
        white: 'bg-white text-black hover:border-muted-foreground',
        muted: 'rounded-[8px] bg-muted text-black hover:bg-black hover:text-white',
        primary: 'bg-primary text-white hover:bg-muted',
        turquoise: 'bg-turquoise text-white hover:border-muted-foreground',
        destructive: 'bg-destructive text-white hover:border-muted-foreground',
        secondary: 'bg-secondary text-black hover:border-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'white',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }

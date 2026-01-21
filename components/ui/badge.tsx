import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import * as Slot from '@rn-primitives/slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Platform, View, ViewProps } from 'react-native';

const badgeVariants = cva(
  cn(
    'border-zinc-200 dark:border-zinc-700 group shrink-0 flex-row items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5',
    Platform.select({
      web: 'focus-visible:border-zinc-400 focus-visible:ring-zinc-400/50 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 w-fit whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3',
    })
  ),
  {
    variants: {
      variant: {
        default: cn(
          'bg-zinc-900 dark:bg-zinc-100 border-transparent',
          Platform.select({ web: '[a&]:hover:bg-zinc-800 dark:[a&]:hover:bg-zinc-200' })
        ),
        secondary: cn(
          'bg-zinc-100 dark:bg-zinc-800 border-transparent',
          Platform.select({ web: '[a&]:hover:bg-zinc-200 dark:[a&]:hover:bg-zinc-700' })
        ),
        destructive: cn(
          'bg-red-500 border-transparent',
          Platform.select({ web: '[a&]:hover:bg-red-600' })
        ),
        outline: Platform.select({ web: '[a&]:hover:bg-zinc-100 dark:[a&]:hover:bg-zinc-800 [a&]:hover:text-zinc-900 dark:[a&]:hover:text-zinc-100' }),
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

const badgeTextVariants = cva('text-xs font-medium', {
  variants: {
    variant: {
      default: 'text-white dark:text-zinc-900',
      secondary: 'text-zinc-900 dark:text-zinc-100',
      destructive: 'text-white',
      outline: 'text-zinc-900 dark:text-zinc-100',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type BadgeProps = ViewProps &
  React.RefAttributes<View> & {
    asChild?: boolean;
  } & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, asChild, ...props }: BadgeProps) {
  const Component = asChild ? Slot.View : View;
  return (
    <TextClassContext.Provider value={badgeTextVariants({ variant })}>
      <Component className={cn(badgeVariants({ variant }), className)} {...props} />
    </TextClassContext.Provider>
  );
}

export { Badge, badgeTextVariants, badgeVariants };
export type { BadgeProps };

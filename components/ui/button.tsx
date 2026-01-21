import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Platform, Pressable } from 'react-native';

const buttonVariants = cva(
  cn(
    'group shrink-0 flex-row items-center justify-center gap-2 rounded-md shadow-none',
    Platform.select({
      web: "focus-visible:border-zinc-400 focus-visible:ring-zinc-400/50 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 whitespace-nowrap outline-none transition-all focus-visible:ring-[3px] disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    })
  ),
  {
    variants: {
      variant: {
        default: cn(
          'bg-zinc-900 dark:bg-zinc-100 active:bg-zinc-800 dark:active:bg-zinc-200 shadow-sm shadow-black/5',
          Platform.select({ web: 'hover:bg-zinc-800 dark:hover:bg-zinc-200' })
        ),
        destructive: cn(
          'bg-red-500 active:bg-red-600 dark:bg-red-600 shadow-sm shadow-black/5',
          Platform.select({
            web: 'hover:bg-red-600 focus-visible:ring-red-500/20 dark:focus-visible:ring-red-500/40',
          })
        ),
        outline: cn(
          'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 active:bg-zinc-100 dark:active:bg-zinc-700 border shadow-sm shadow-black/5',
          Platform.select({
            web: 'hover:bg-zinc-100 dark:hover:bg-zinc-700',
          })
        ),
        secondary: cn(
          'bg-zinc-100 dark:bg-zinc-800 active:bg-zinc-200 dark:active:bg-zinc-700 shadow-sm shadow-black/5',
          Platform.select({ web: 'hover:bg-zinc-200 dark:hover:bg-zinc-700' })
        ),
        ghost: cn(
          'active:bg-zinc-100 dark:active:bg-zinc-800',
          Platform.select({ web: 'hover:bg-zinc-100 dark:hover:bg-zinc-800' })
        ),
        link: '',
      },
      size: {
        default: cn('h-10 px-4 py-2 sm:h-9', Platform.select({ web: 'has-[>svg]:px-3' })),
        sm: cn('h-9 gap-1.5 rounded-md px-3 sm:h-8', Platform.select({ web: 'has-[>svg]:px-2.5' })),
        lg: cn('h-11 rounded-md px-6 sm:h-10', Platform.select({ web: 'has-[>svg]:px-4' })),
        icon: 'h-10 w-10 sm:h-9 sm:w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva(
  cn(
    'text-zinc-900 dark:text-zinc-100 text-sm font-medium',
    Platform.select({ web: 'pointer-events-none transition-colors' })
  ),
  {
    variants: {
      variant: {
        default: 'text-white dark:text-zinc-900',
        destructive: 'text-white',
        outline: cn(
          'group-active:text-zinc-900 dark:group-active:text-zinc-100',
          Platform.select({ web: 'group-hover:text-zinc-900 dark:group-hover:text-zinc-100' })
        ),
        secondary: 'text-zinc-900 dark:text-zinc-100',
        ghost: 'group-active:text-zinc-900 dark:group-active:text-zinc-100',
        link: cn(
          'text-zinc-900 dark:text-zinc-100 group-active:underline',
          Platform.select({ web: 'underline-offset-4 hover:underline group-hover:underline' })
        ),
      },
      size: {
        default: '',
        sm: '',
        lg: '',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = React.ComponentProps<typeof Pressable> &
  React.RefAttributes<typeof Pressable> &
  VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <Pressable
        className={cn(props.disabled && 'opacity-50', buttonVariants({ variant, size }), className)}
        role="button"
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };

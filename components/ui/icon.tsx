import type { LucideIcon, LucideProps } from 'lucide-react-native';

type IconProps = LucideProps & {
  as: LucideIcon;
};

/**
 * A wrapper component for Lucide icons.
 *
 * @component
 * @example
 * ```tsx
 * import { ArrowRight } from 'lucide-react-native';
 * import { Icon } from '@/components/ui/icon';
 *
 * <Icon as={ArrowRight} size={16} />
 * ```
 *
 * @param {LucideIcon} as - The Lucide icon component to render.
 * @param {number} size - Icon size (defaults to 14).
 * @param {...LucideProps} ...props - Additional Lucide icon props passed to the "as" icon.
 */
function Icon({ as: IconComponent, size = 14, ...props }: IconProps) {
  return <IconComponent size={size} {...props} />;
}

export { Icon };

// Web implementation of the UI kit (React Native Web + Uniwind).
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Screen } from '@/components/ui/screen';
import { Skeleton } from '@/components/ui/skeleton';
import { Text } from '@/components/ui/text';
import { useColors } from '@/lib/stores/theme';
import { cn } from '@/lib/utils';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { ChevronRight, Heart } from 'lucide-react-native';
import { Children, Fragment, type ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import type {
  DisclosureProps,
  FieldProps,
  HeroProps,
  ActionProps,
  NoticeProps,
  PageProps,
  PlaceholderProps,
  ProseProps,
  RowProps,
  SectionProps,
  SegmentedProps,
  StatsProps,
} from './types';

export * from './types';

export function Page({ children }: PageProps) {
  return <Screen contentClassName="gap-10">{children}</Screen>;
}

function Label({ children, className, heading }: { children: ReactNode; className?: string; heading?: boolean }) {
  return (
    <Text
      role={heading ? 'heading' : undefined}
      aria-level={heading ? '2' : undefined}
      className={cn('font-mono text-[11px] leading-4 font-medium uppercase tracking-[0.14em] text-ink-muted', className)}
    >
      {children}
    </Text>
  );
}

function Card({ children }: { children: ReactNode }) {
  const items = Children.toArray(children).filter(Boolean);
  return (
    <View className="bg-surface border border-rule rounded-lg overflow-hidden">
      {items.map((child, i) => (
        <Fragment key={i}>
          {i > 0 ? <View className="h-px bg-rule" /> : null}
          {child}
        </Fragment>
      ))}
    </View>
  );
}

export function Section({ title, footer, children }: SectionProps) {
  return (
    <View className="gap-3">
      {title ? (
        <Label heading className="px-1">
          {title}
        </Label>
      ) : null}
      <Card>{children}</Card>
      {footer ? <Label className="px-1 normal-case tracking-normal">{footer}</Label> : null}
    </View>
  );
}

export function Row({ title, subtitle, mono, trailing, href, onPress, imageUri, avatar, marked }: RowProps) {
  const colors = useColors();
  const body = (
    <>
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          alt={title}
          style={{ width: 40, height: 40, borderRadius: 20 }}
          contentFit="cover"
          transition={150}
        />
      ) : avatar ? (
        <View className="h-10 w-10 items-center justify-center rounded-full bg-sunken">
          <Text className="font-mono text-[15px] text-ink-muted">?</Text>
        </View>
      ) : null}
      <View className="flex-1 gap-1">
        <Text className="text-ink text-[16px] leading-[22px]">{title}</Text>
        {subtitle ? (
          <Text
            className={
              mono
                ? 'font-mono text-[12px] leading-4 tracking-[0.06em] text-ink-muted uppercase'
                : 'text-[14px] leading-5 text-ink-muted'
            }
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      {marked ? <Heart size={13} color={colors.accent} fill={colors.accent} /> : null}
      {trailing ? <Text className="font-mono text-[13px] text-ink-muted tabular-nums">{trailing}</Text> : null}
      {href || onPress ? <ChevronRight size={16} color={colors.muted} strokeWidth={1.75} /> : null}
    </>
  );
  const className = 'flex-row items-center gap-4 px-5 py-4 min-h-[64px] active:bg-sunken cursor-pointer';

  if (href) {
    return (
      <Link href={href} asChild>
        <Pressable accessibilityRole="link" className={className}>
          {body}
        </Pressable>
      </Link>
    );
  }
  if (onPress) {
    return (
      <Pressable accessibilityRole="button" onPress={onPress} className={className}>
        {body}
      </Pressable>
    );
  }
  return <View className="flex-row items-center gap-4 px-5 py-4">{body}</View>;
}

export function Hero({ kicker, title, lede, imageUri }: HeroProps) {
  return (
    <View className="flex-row items-center gap-6">
      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          alt={title ?? ''}
          style={{ width: 112, height: 112, borderRadius: 4, filter: 'grayscale(1) contrast(1.1)' } as never}
          contentFit="cover"
        />
      ) : null}
      <View className="flex-1 gap-4">
        {kicker ? (
          <View className="flex-row items-center gap-2">
            <View className="h-2 w-2 bg-stamp" />
            <Text className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-stamp">{kicker}</Text>
          </View>
        ) : null}
        {title ? (
          <Text
            role="heading"
            aria-level="1"
            selectable
            className="text-ink text-[40px] leading-[44px] font-bold tracking-[-0.02em] sm:text-[52px] sm:leading-[56px]"
          >
            {title}
          </Text>
        ) : null}
        {lede ? <Text className="text-ink-soft text-[18px] leading-[28px] max-w-[60ch]">{lede}</Text> : null}
      </View>
    </View>
  );
}

export function Field({ label, value, redacted, href }: FieldProps) {
  const valueNode = redacted ? (
    <View
      accessibilityLabel="Salattu tieto"
      className="h-[18px] w-36 bg-ink"
      // A slight skew reads as a hand-drawn redaction bar
      style={{ transform: [{ skewX: '-6deg' }] }}
    />
  ) : (
    <Text selectable className={cn('text-[16px] text-right', href ? 'text-stamp underline underline-offset-4' : 'text-ink')}>
      {value}
    </Text>
  );

  const body = (
    <View className="flex-row items-center justify-between gap-6 px-5 py-4">
      <Label>{label}</Label>
      {valueNode}
    </View>
  );

  return href ? (
    <Link href={href} asChild>
      <Pressable accessibilityRole="link" className="active:bg-sunken cursor-pointer">
        {body}
      </Pressable>
    </Link>
  ) : (
    body
  );
}

export function Prose({ blocks }: ProseProps) {
  return (
    <View className="gap-4 px-5 py-6 sm:px-7">
      {blocks.map((block, i) =>
        block.kind === 'heading' ? (
          <Text key={i} role="heading" aria-level="3" className="text-ink text-[17px] font-semibold pt-2">
            {block.text}
          </Text>
        ) : (
          <Text key={i} selectable className="text-ink-soft text-[17px] leading-[28px] max-w-[66ch]">
            {block.kind === 'bullet' ? `•  ${block.text}` : block.text}
          </Text>
        )
      )}
    </View>
  );
}

export function Stats({ items }: StatsProps) {
  return (
    <View className="flex-row">
      {items.map((item, i) => (
        <View key={item.label} className={cn('flex-1 gap-1 px-5 py-5', i > 0 && 'border-l border-rule')}>
          <Text className="text-ink text-[28px] leading-8 font-semibold tabular-nums">{item.value}</Text>
          <Label>{item.label}</Label>
        </View>
      ))}
    </View>
  );
}

export function Segmented<T extends string>({ value, options, onChange }: SegmentedProps<T>) {
  return (
    <View accessibilityRole="radiogroup" className="flex-row self-start rounded-md border border-rule bg-surface p-1 gap-1">
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            onPress={() => onChange(o.value)}
            className={cn('rounded px-3 py-1.5 cursor-pointer', selected ? 'bg-ink' : 'active:bg-sunken')}
          >
            <Text className={cn('font-mono text-[12px] uppercase tracking-[0.08em]', selected ? 'text-paper' : 'text-ink-soft')}>
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function Disclosure({ title, text }: DisclosureProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={title} className="border-b-0 px-5">
        <AccordionTrigger>
          <Text className="text-ink text-[16px] flex-1">{title}</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text selectable className="text-ink-soft text-[15px] leading-[24px] max-w-[66ch]">
            {text}
          </Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function Notice({ text }: NoticeProps) {
  return <Label className="text-center">{text}</Label>;
}

export function Placeholder({ rows = 4 }: PlaceholderProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <View key={i} className="gap-2 px-5 py-4">
          <Skeleton height={16} width={i % 2 ? '50%' : '70%'} borderRadius={2} />
          <Skeleton height={12} width={64} borderRadius={2} />
        </View>
      ))}
    </>
  );
}

export function Action({ title, onPress }: ActionProps) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" className="items-center bg-ink px-5 py-4 cursor-pointer active:opacity-80">
      <Text className="font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-paper">{title}</Text>
    </Pressable>
  );
}

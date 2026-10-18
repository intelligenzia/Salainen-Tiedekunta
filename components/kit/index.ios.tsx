// iOS implementation of the UI kit, rendered with SwiftUI through @expo/ui.
import { haptics } from '@/lib/haptics';
import { useColors, useTheme } from '@/lib/stores/theme';
import {
  Button,
  ContextMenu,
  DisclosureGroup,
  HStack,
  Host,
  Image,
  List,
  Picker,
  RNHostView,
  Section as SwiftSection,
  Spacer,
  Text,
  VStack,
} from '@expo/ui/swift-ui';
import {
  background,
  accessibilityLabel,
  buttonStyle,
  controlSize,
  textCase,
  contentShape,
  font,
  foregroundStyle,
  frame,
  kerning,
  lineSpacing,
  listRowBackground,
  listRowInsets,
  listRowSeparator,
  listStyle,
  monospacedDigit,
  pickerStyle,
  redacted,
  refreshable,
  scrollContentBackground,
  shapes,
  tag,
  textSelection,
  tint,
} from '@expo/ui/swift-ui/modifiers';
import { Image as ExpoImage } from 'expo-image';
import { useRouter } from 'expo-router';
import type { SFSymbol } from 'sf-symbols-typescript';
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

const mono = (size: number, weight: 'regular' | 'medium' | 'semibold' | 'bold' = 'medium') =>
  font({ size, weight, design: 'monospaced' });

export function Page({ children, onRefresh }: PageProps) {
  const colors = useColors();
  const { isDark } = useTheme();
  return (
    <Host style={{ flex: 1 }} colorScheme={isDark ? 'dark' : 'light'} useViewportSizeMeasurement>
      <List
        modifiers={[
          listStyle('insetGrouped'),
          scrollContentBackground('hidden'),
          background(colors.background),
          tint(colors.accent),
          ...(onRefresh ? [refreshable(async () => void (await onRefresh()))] : []),
        ]}
      >
        {children}
      </List>
    </Host>
  );
}

export function Section({ title, footer, children }: SectionProps) {
  const colors = useColors();
  return (
    <SwiftSection
      header={
        title ? (
          <Text modifiers={[mono(12, 'semibold'), kerning(1.4), foregroundStyle(colors.muted)]}>
            {title.toUpperCase()}
          </Text>
        ) : undefined
      }
      footer={
        footer ? (
          <Text modifiers={[mono(11), foregroundStyle(colors.muted)]}>{footer}</Text>
        ) : undefined
      }
    >
      {children}
    </SwiftSection>
  );
}

function Chevron() {
  const colors = useColors();
  return (
    <Image
      systemName="chevron.right"
      size={13}
      color={colors.muted}
      modifiers={[font({ size: 13, weight: 'semibold' })]}
    />
  );
}

export function Row({ title, subtitle, mono: isMono, trailing, href, onPress, imageUri, avatar, marked, menu }: RowProps) {
  const colors = useColors();
  const router = useRouter();
  const tappable = Boolean(href || onPress);

  const press = () => {
    haptics.selection();
    if (onPress) onPress();
    else if (href) router.push(href);
  };

  const content = (
    <HStack spacing={12} modifiers={[contentShape(shapes.rectangle())]}>
      {imageUri ? (
        <RNHostView matchContents>
          <ExpoImage
            source={{ uri: imageUri }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
            contentFit="cover"
            transition={150}
          />
        </RNHostView>
      ) : avatar ? (
        <Image systemName="person.crop.circle.fill" size={40} color={colors.muted} />
      ) : null}
      <VStack alignment="leading" spacing={3}>
        <Text modifiers={[font({ textStyle: 'body' }), foregroundStyle(colors.foreground)]}>{title}</Text>
        {subtitle ? (
          <Text
            modifiers={[
              isMono ? mono(12) : font({ textStyle: 'footnote' }),
              ...(isMono ? [kerning(0.6)] : []),
              foregroundStyle(colors.muted),
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </VStack>
      <Spacer />
      {marked ? <Image systemName="heart.fill" size={11} color={colors.accent} /> : null}
      {trailing ? (
        <Text modifiers={[font({ textStyle: 'subheadline' }), monospacedDigit(), foregroundStyle(colors.muted)]}>
          {trailing}
        </Text>
      ) : null}
      {tappable ? <Chevron /> : null}
    </HStack>
  );

  const row = tappable ? (
    <Button onPress={press} modifiers={[buttonStyle('plain'), listRowBackground(colors.surface)]}>
      {content}
    </Button>
  ) : (
    <HStack modifiers={[listRowBackground(colors.surface)]}>{content}</HStack>
  );

  if (!menu?.length) return row;

  return (
    <ContextMenu modifiers={[listRowBackground(colors.surface)]}>
      <ContextMenu.Items>
        {menu.map((action) => (
          <Button
            key={action.title}
            label={action.title}
            systemImage={action.systemImage as SFSymbol | undefined}
            onPress={action.onPress}
          />
        ))}
      </ContextMenu.Items>
      <ContextMenu.Trigger>{row}</ContextMenu.Trigger>
    </ContextMenu>
  );
}

/** Page header drawn straight on the background, outside the grouped cards. */
export function Hero({ kicker, title, lede, imageUri }: HeroProps) {
  const colors = useColors();
  return (
    <SwiftSection>
      <HStack
        spacing={16}
        modifiers={[
          listRowBackground('clear'),
          listRowInsets({ top: 16, leading: 4, bottom: 8, trailing: 4 }),
        ]}
      >
        {imageUri ? (
          <RNHostView matchContents>
            <ExpoImage
              source={{ uri: imageUri }}
              style={{ width: 84, height: 84, borderRadius: 42 }}
              contentFit="cover"
              transition={150}
            />
          </RNHostView>
        ) : null}
        <VStack alignment="leading" spacing={8} modifiers={[frame({ maxWidth: Infinity, alignment: 'leading' })]}>
          {kicker ? (
            <Text modifiers={[mono(11, 'bold'), kerning(1.6), textCase('uppercase'), foregroundStyle(colors.accent)]}>{kicker}</Text>
          ) : null}
          {title ? (
            <Text modifiers={[font({ size: 30, weight: 'bold' }), foregroundStyle(colors.foreground), textSelection(true)]}>
              {title}
            </Text>
          ) : null}
          {lede ? (
            <Text modifiers={[font({ textStyle: 'body' }), lineSpacing(3), foregroundStyle(colors.soft)]}>{lede}</Text>
          ) : null}
        </VStack>
      </HStack>
    </SwiftSection>
  );
}

export function Field({ label, value, redacted: isRedacted, href }: FieldProps) {
  const colors = useColors();
  const router = useRouter();

  const content = (
    <HStack spacing={12} modifiers={[contentShape(shapes.rectangle())]}>
      <Text modifiers={[mono(12), kerning(0.8), foregroundStyle(colors.muted)]}>{label.toUpperCase()}</Text>
      <Spacer />
      {isRedacted ? (
        <Text
          modifiers={[mono(15), foregroundStyle(colors.foreground), accessibilityLabel('Salattu tieto')]}
        >
          {'█████████'}
        </Text>
      ) : (
        <Text modifiers={[font({ textStyle: 'body' }), foregroundStyle(href ? colors.accent : colors.foreground)]}>
          {value ?? ''}
        </Text>
      )}
    </HStack>
  );

  if (href) {
    return (
      <Button
        onPress={() => router.push(href)}
        modifiers={[buttonStyle('plain'), listRowBackground(colors.surface)]}
      >
        {content}
      </Button>
    );
  }
  return <HStack modifiers={[listRowBackground(colors.surface)]}>{content}</HStack>;
}

export function Prose({ blocks }: ProseProps) {
  const colors = useColors();
  return (
    <>
      {blocks.map((block, i) => (
        <Text
          key={i}
          modifiers={[
            listRowBackground(colors.surface),
            listRowSeparator('hidden'),
            textSelection(true),
            ...(block.kind === 'heading'
              ? [font({ textStyle: 'headline' }), foregroundStyle(colors.foreground)]
              : [font({ textStyle: 'body' }), lineSpacing(3), foregroundStyle(colors.soft)]),
          ]}
        >
          {block.kind === 'bullet' ? `•  ${block.text}` : block.text}
        </Text>
      ))}
    </>
  );
}

export function Stats({ items }: StatsProps) {
  const colors = useColors();
  return (
    <HStack modifiers={[listRowBackground(colors.surface)]}>
      {items.map((item) => (
        <VStack key={item.label} spacing={2} modifiers={[frame({ maxWidth: Infinity })]}>
          <Text modifiers={[font({ size: 22, weight: 'semibold' }), monospacedDigit(), foregroundStyle(colors.foreground)]}>
            {item.value}
          </Text>
          <Text modifiers={[mono(10, 'semibold'), kerning(1), foregroundStyle(colors.muted)]}>
            {item.label.toUpperCase()}
          </Text>
        </VStack>
      ))}
    </HStack>
  );
}

export function Segmented<T extends string>({ value, options, onChange }: SegmentedProps<T>) {
  return (
    <Picker
      selection={value}
      onSelectionChange={(v) => {
        haptics.selection();
        onChange(v as T);
      }}
      modifiers={[
        pickerStyle('segmented'),
        listRowBackground('clear'),
        listRowInsets({ top: 0, leading: 0, bottom: 0, trailing: 0 }),
      ]}
    >
      {options.map((o) => (
        <Text key={o.value} modifiers={[tag(o.value)]}>
          {o.label}
        </Text>
      ))}
    </Picker>
  );
}

export function Disclosure({ title, text }: DisclosureProps) {
  const colors = useColors();
  return (
    <DisclosureGroup label={title} modifiers={[listRowBackground(colors.surface), foregroundStyle(colors.foreground)]}>
      <Text modifiers={[font({ textStyle: 'callout' }), lineSpacing(2), foregroundStyle(colors.soft), textSelection(true)]}>
        {text}
      </Text>
    </DisclosureGroup>
  );
}

export function Notice({ text }: NoticeProps) {
  const colors = useColors();
  return (
    <Text
      modifiers={[
        mono(10),
        kerning(1),
        foregroundStyle(colors.muted),
        listRowBackground('clear'),
        frame({ maxWidth: Infinity, alignment: 'center' }),
      ]}
    >
      {text.toUpperCase()}
    </Text>
  );
}

/** Redacted rows shown while content loads. */
export function Placeholder({ rows = 4 }: PlaceholderProps) {
  const colors = useColors();
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <VStack key={i} alignment="leading" spacing={3} modifiers={[redacted('placeholder'), listRowBackground(colors.surface)]}>
          <Text modifiers={[font({ textStyle: 'body' })]}>Salattu kurssin nimi</Text>
          <Text modifiers={[mono(12)]}>XXX000</Text>
        </VStack>
      ))}
    </>
  );
}

/** Primary call to action, drawn as a full-width prominent button. */
export function Action({ title, onPress }: ActionProps) {
  const colors = useColors();
  return (
    <Button
      onPress={onPress}
      modifiers={[
        buttonStyle('borderedProminent'),
        controlSize('large'),
        tint(colors.foreground),
        listRowBackground('clear'),
        listRowInsets({ top: 0, leading: 0, bottom: 0, trailing: 0 }),
      ]}
    >
      <Text modifiers={[mono(14, 'semibold'), kerning(1.2), textCase('uppercase'), frame({ maxWidth: Infinity })]}>
        {title}
      </Text>
    </Button>
  );
}

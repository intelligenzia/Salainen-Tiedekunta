// Android implementation of the UI kit, rendered with Jetpack Compose (Material 3) through @expo/ui.
import { haptics } from '@/lib/haptics';
import { useColors, useTheme } from '@/lib/stores/theme';
import {
  Button,
  Card,
  Column,
  HorizontalDivider,
  Host,
  LazyColumn,
  ListItem,
  PullToRefreshBox,
  RNHostView,
  Row as ComposeRow,
  SegmentedButton,
  SingleChoiceSegmentedButtonRow,
  Spacer,
  Text,
} from '@expo/ui/jetpack-compose';
import {
  background,
  clickable,
  fillMaxWidth,
  padding,
  weight,
} from '@expo/ui/jetpack-compose/modifiers';
import { Image as ExpoImage } from 'expo-image';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Children, Fragment, useState, type ReactNode } from 'react';
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

export function Page({ children, onRefresh, headerless }: PageProps) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();
  const [refreshing, setRefreshing] = useState(false);

  const list = (
    <LazyColumn
      verticalArrangement={{ spacedBy: 20 }}
      contentPadding={{ start: 16, end: 16, top: (headerless ? insets.top : 0) + 12, bottom: 32 + insets.bottom }}
      modifiers={[background(colors.background)]}
    >
      {children}
    </LazyColumn>
  );

  return (
    <Host style={{ flex: 1 }} colorScheme={isDark ? 'dark' : 'light'} seedColor={colors.accent}>
      {onRefresh ? (
        <PullToRefreshBox
          isRefreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true);
            try {
              await onRefresh();
            } finally {
              setRefreshing(false);
            }
          }}
        >
          {list}
        </PullToRefreshBox>
      ) : (
        list
      )}
    </Host>
  );
}

export function Section({ title, footer, children }: SectionProps) {
  const colors = useColors();
  const items = Children.toArray(children).filter(Boolean);
  return (
    <Column verticalArrangement={{ spacedBy: 8 }} modifiers={[fillMaxWidth()]}>
      {title ? (
        <Text
          color={colors.muted}
          style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: '600', letterSpacing: 1.4 }}
          modifiers={[padding(4, 0, 4, 0)]}
        >
          {title.toUpperCase()}
        </Text>
      ) : null}
      <Card colors={{ containerColor: colors.surface, contentColor: colors.foreground }} modifiers={[fillMaxWidth()]}>
        <Column modifiers={[fillMaxWidth()]}>
          {items.map((child, i) => (
            <Fragment key={i}>
              {i > 0 ? <HorizontalDivider color={colors.border} /> : null}
              {child}
            </Fragment>
          ))}
        </Column>
      </Card>
      {footer ? (
        <Text color={colors.muted} style={{ fontFamily: 'monospace', fontSize: 11 }} modifiers={[padding(4, 0, 4, 0)]}>
          {footer}
        </Text>
      ) : null}
    </Column>
  );
}

export function Row({ title, subtitle, mono, trailing, href, onPress, imageUri, avatar, marked }: RowProps) {
  const colors = useColors();
  const router = useRouter();
  const tappable = Boolean(href || onPress);

  return (
    <ListItem
      colors={{ containerColor: colors.surface, contentColor: colors.foreground }}
      modifiers={
        tappable
          ? [
              clickable(() => {
                haptics.selection();
                if (onPress) onPress();
                else if (href) router.push(href);
              }),
            ]
          : undefined
      }
    >
      <ListItem.HeadlineContent>
        <Text style={{ typography: 'bodyLarge' }} color={colors.foreground}>
          {title}
        </Text>
      </ListItem.HeadlineContent>
      {subtitle ? (
        <ListItem.SupportingContent>
          <Text
            color={colors.muted}
            style={mono ? { fontFamily: 'monospace', fontSize: 12, letterSpacing: 0.6 } : { typography: 'bodyMedium' }}
          >
            {subtitle}
          </Text>
        </ListItem.SupportingContent>
      ) : null}
      {imageUri ? (
        <ListItem.LeadingContent>
          <RNHostView matchContents>
            <ExpoImage source={{ uri: imageUri }} style={{ width: 40, height: 40, borderRadius: 20 }} contentFit="cover" />
          </RNHostView>
        </ListItem.LeadingContent>
      ) : avatar ? (
        <ListItem.LeadingContent>
          <Text color={colors.muted} style={{ fontFamily: 'monospace', fontSize: 20 }}>
            {'?'}
          </Text>
        </ListItem.LeadingContent>
      ) : null}
      {trailing || marked ? (
        <ListItem.TrailingContent>
          <Text color={marked ? colors.accent : colors.muted} style={{ typography: 'bodyMedium' }}>
            {[marked ? '♥' : null, trailing].filter(Boolean).join('  ')}
          </Text>
        </ListItem.TrailingContent>
      ) : null}
    </ListItem>
  );
}

export function Hero({ kicker, title, lede, imageUri }: HeroProps) {
  const colors = useColors();
  return (
    <ComposeRow horizontalArrangement={{ spacedBy: 16 }} verticalAlignment="center" modifiers={[fillMaxWidth(), padding(4, 8, 4, 0)]}>
      {imageUri ? (
        <RNHostView matchContents>
          <ExpoImage source={{ uri: imageUri }} style={{ width: 84, height: 84, borderRadius: 42 }} contentFit="cover" />
        </RNHostView>
      ) : null}
      <Column verticalArrangement={{ spacedBy: 8 }} modifiers={[weight(1)]}>
        {kicker ? (
          <Text color={colors.accent} style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: '700', letterSpacing: 1.6 }}>
            {kicker.toUpperCase()}
          </Text>
        ) : null}
        {title ? (
          <Text color={colors.foreground} style={{ typography: 'headlineMedium', fontWeight: '700' }}>
            {title}
          </Text>
        ) : null}
        {lede ? (
          <Text color={colors.soft} style={{ typography: 'bodyLarge', lineHeight: 24 }}>
            {lede}
          </Text>
        ) : null}
      </Column>
    </ComposeRow>
  );
}

export function Field({ label, value, redacted, href }: FieldProps) {
  const colors = useColors();
  const router = useRouter();
  return (
    <ComposeRow
      verticalAlignment="center"
      modifiers={[
        fillMaxWidth(),
        ...(href ? [clickable(() => router.push(href))] : []),
        padding(16, 14, 16, 14),
      ]}
    >
      <Text color={colors.muted} style={{ fontFamily: 'monospace', fontSize: 12, letterSpacing: 0.8 }}>
        {label.toUpperCase()}
      </Text>
      <Spacer modifiers={[weight(1)]} />
      {redacted ? (
        <Text color={colors.foreground} style={{ typography: 'bodyLarge', background: colors.foreground }}>
          {'      '}
        </Text>
      ) : (
        <Text color={href ? colors.accent : colors.foreground} style={{ typography: 'bodyLarge' }}>
          {value ?? ''}
        </Text>
      )}
    </ComposeRow>
  );
}

export function Prose({ blocks }: ProseProps) {
  const colors = useColors();
  return (
    <Column verticalArrangement={{ spacedBy: 10 }} modifiers={[fillMaxWidth(), padding(16, 16, 16, 16)]}>
      {blocks.map((block, i) =>
        block.kind === 'heading' ? (
          <Text key={i} color={colors.foreground} style={{ typography: 'titleMedium', fontWeight: '600' }}>
            {block.text}
          </Text>
        ) : (
          <Text key={i} color={colors.soft} style={{ typography: 'bodyLarge', lineHeight: 24 }}>
            {block.kind === 'bullet' ? `•  ${block.text}` : block.text}
          </Text>
        )
      )}
    </Column>
  );
}

export function Stats({ items }: StatsProps) {
  const colors = useColors();
  return (
    <ComposeRow modifiers={[fillMaxWidth(), padding(8, 16, 8, 16)]}>
      {items.map((item) => (
        <Column key={item.label} horizontalAlignment="center" modifiers={[weight(1)]}>
          <Text color={colors.foreground} style={{ typography: 'titleLarge', fontWeight: '600' }}>
            {item.value}
          </Text>
          <Text color={colors.muted} style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: 1 }}>
            {item.label.toUpperCase()}
          </Text>
        </Column>
      ))}
    </ComposeRow>
  );
}

export function Segmented<T extends string>({ value, options, onChange }: SegmentedProps<T>) {
  return (
    <SingleChoiceSegmentedButtonRow modifiers={[fillMaxWidth()]}>
      {options.map((o) => (
        <SegmentedButton
          key={o.value}
          selected={o.value === value}
          onClick={() => {
            haptics.selection();
            onChange(o.value);
          }}
        >
          <SegmentedButton.Label>
            <Text>{o.label}</Text>
          </SegmentedButton.Label>
        </SegmentedButton>
      ))}
    </SingleChoiceSegmentedButtonRow>
  );
}

export function Disclosure({ title, text }: DisclosureProps) {
  const colors = useColors();
  const [open, setOpen] = useState(false);
  return (
    <Column modifiers={[fillMaxWidth(), clickable(() => setOpen((o) => !o)), padding(16, 14, 16, 14)]}>
      <ComposeRow verticalAlignment="center" modifiers={[fillMaxWidth()]}>
        <Text color={colors.foreground} style={{ typography: 'bodyLarge' }} modifiers={[weight(1)]}>
          {title}
        </Text>
        <Text color={colors.muted}>{open ? '–' : '+'}</Text>
      </ComposeRow>
      {open ? (
        <Text color={colors.soft} style={{ typography: 'bodyMedium', lineHeight: 22 }} modifiers={[padding(0, 10, 0, 0)]}>
          {text}
        </Text>
      ) : null}
    </Column>
  );
}

export function Notice({ text }: NoticeProps): ReactNode {
  const colors = useColors();
  return (
    <Text
      color={colors.muted}
      style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: 1, textAlign: 'center' }}
      modifiers={[fillMaxWidth()]}
    >
      {text.toUpperCase()}
    </Text>
  );
}

export function Placeholder({ rows = 4 }: PlaceholderProps) {
  const colors = useColors();
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <Column key={i} verticalArrangement={{ spacedBy: 6 }} modifiers={[fillMaxWidth(), padding(16, 16, 16, 16)]}>
          <Text style={{ typography: 'bodyLarge', background: colors.sunken }} color={colors.sunken}>
            {'Salattu kurssin nimi'}
          </Text>
          <Text style={{ fontFamily: 'monospace', fontSize: 12, background: colors.sunken }} color={colors.sunken}>
            {'XXX000'}
          </Text>
        </Column>
      ))}
    </>
  );
}

export function Action({ title, onPress }: ActionProps) {
  const colors = useColors();
  return (
    <Button
      onClick={onPress}
      colors={{ containerColor: colors.foreground, contentColor: colors.background }}
      modifiers={[fillMaxWidth()]}
    >
      <Text style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: '600', letterSpacing: 1.2 }}>
        {title.toUpperCase()}
      </Text>
    </Button>
  );
}

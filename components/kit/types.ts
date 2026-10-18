import type { ProseBlock } from '@/lib/richtext';
import type { Href } from 'expo-router';
import type { ReactNode } from 'react';

/**
 * The UI kit has one implementation per platform: SwiftUI on iOS
 * (`index.ios.tsx`), Jetpack Compose on Android (`index.android.tsx`) and
 * React Native Web on the web (`index.tsx`). Screens only use these props.
 */

export interface PageProps {
  children: ReactNode;
  onRefresh?: () => Promise<unknown>;
  /** The screen has no navigation header, so the page pads itself below the status bar. */
  headerless?: boolean;
}

export interface SectionProps {
  title?: string;
  footer?: string;
  children: ReactNode;
}

export interface MenuAction {
  title: string;
  /** SF Symbol name, used on iOS. */
  systemImage?: string;
  onPress: () => void;
}

export interface RowProps {
  title: string;
  subtitle?: string;
  /** Render the subtitle in the monospaced "file code" style. */
  mono?: boolean;
  trailing?: string;
  href?: Href;
  onPress?: () => void;
  imageUri?: string;
  /** Reserve an avatar slot; shows a redacted silhouette when there is no image. */
  avatar?: boolean;
  /** Small red mark before the trailing text (e.g. favourite). */
  marked?: boolean;
  menu?: MenuAction[];
}

export interface HeroProps {
  /** Classification line above the title, e.g. "TIEDOSTO OMO311". */
  kicker?: string;
  title?: string;
  lede?: string;
  imageUri?: string;
}

export interface FieldProps {
  label: string;
  value?: string;
  /** Show a redaction bar instead of a value. */
  redacted?: boolean;
  href?: Href;
}

export interface ProseProps {
  blocks: ProseBlock[];
}

export interface StatsProps {
  items: { value: string; label: string }[];
}

export interface SegmentedProps<T extends string> {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}

export interface DisclosureProps {
  title: string;
  text: string;
}

export interface NoticeProps {
  text: string;
}

export interface PlaceholderProps {
  rows?: number;
}

export interface ActionProps {
  title: string;
  onPress: () => void;
}

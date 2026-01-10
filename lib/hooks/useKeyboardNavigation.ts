import { useEffect, useCallback, useRef } from 'react';
import { Platform } from 'react-native';

interface KeyboardNavigationOptions {
  items: { id: string; onSelect: () => void }[];
  enabled?: boolean;
  onEscape?: () => void;
}

export function useKeyboardNavigation({
  items,
  enabled = true,
  onEscape,
}: KeyboardNavigationOptions) {
  const focusedIndex = useRef(-1);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled || items.length === 0) return;

      switch (event.key) {
        case 'j':
        case 'ArrowDown':
          event.preventDefault();
          focusedIndex.current = Math.min(
            focusedIndex.current + 1,
            items.length - 1
          );
          break;
        case 'k':
        case 'ArrowUp':
          event.preventDefault();
          focusedIndex.current = Math.max(focusedIndex.current - 1, 0);
          break;
        case 'Enter':
        case ' ':
          if (focusedIndex.current >= 0) {
            event.preventDefault();
            items[focusedIndex.current]?.onSelect();
          }
          break;
        case 'Escape':
          event.preventDefault();
          focusedIndex.current = -1;
          onEscape?.();
          break;
        case 'Home':
          event.preventDefault();
          focusedIndex.current = 0;
          break;
        case 'End':
          event.preventDefault();
          focusedIndex.current = items.length - 1;
          break;
        default:
          return;
      }
    },
    [items, enabled, onEscape]
  );

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') {
      return;
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    focusedIndex: focusedIndex.current,
    resetFocus: () => {
      focusedIndex.current = -1;
    },
  };
}

// Hook to handle search input keyboard shortcuts
export function useSearchShortcut(
  inputRef: React.RefObject<any>,
  enabled = true
) {
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof window === 'undefined' || !enabled) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      // Focus search on / or Cmd+K
      if (
        event.key === '/' ||
        ((event.metaKey || event.ctrlKey) && event.key === 'k')
      ) {
        // Don't trigger if already focused on an input
        if (
          document.activeElement?.tagName === 'INPUT' ||
          document.activeElement?.tagName === 'TEXTAREA'
        ) {
          return;
        }
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputRef, enabled]);
}

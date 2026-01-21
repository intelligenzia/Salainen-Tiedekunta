import { View, Pressable } from 'react-native';
import { AlertCircle, RefreshCw } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/lib/stores/theme';
import { haptics } from '@/lib/haptics';

interface ErrorViewProps {
  title?: string;
  message?: string;
  error?: Error | null;
  onRetry?: () => void;
  showRetry?: boolean;
}

export function ErrorView({
  title = 'Virhe tietojen lataamisessa',
  message,
  error,
  onRetry,
  showRetry = true,
}: ErrorViewProps) {
  const { isDark } = useTheme();

  const errorMessage =
    message ||
    error?.message ||
    'Tietojen lataaminen epäonnistui. Tarkista internetyhteytesi ja yritä uudelleen.';

  const handleRetry = () => {
    if (onRetry) {
      haptics.light();
      onRetry();
    }
  };

  return (
    <View className="flex-1 bg-zinc-50 dark:bg-zinc-900 justify-center items-center p-6">
      <View className="items-center max-w-md">
        {/* Error Icon */}
        <View className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-4">
          <AlertCircle size={48} color={isDark ? '#fca5a5' : '#ef4444'} />
        </View>

        {/* Title */}
        <Text className="text-red-600 dark:text-red-400 text-center text-lg font-semibold mb-2">
          {title}
        </Text>

        {/* Message */}
        <Text className="text-zinc-600 dark:text-zinc-400 text-center text-sm mb-6 leading-relaxed">
          {errorMessage}
        </Text>

        {/* Retry Button */}
        {showRetry && onRetry && (
          <Pressable
            onPress={handleRetry}
            className="flex-row items-center bg-zinc-900 dark:bg-zinc-100 px-6 py-3 rounded-lg active:opacity-80"
            accessibilityRole="button"
            accessibilityLabel="Yritä uudelleen"
          >
            <RefreshCw size={18} color={isDark ? '#09090b' : '#fafafa'} />
            <Text className="text-white dark:text-zinc-900 font-medium ml-2">
              Yritä uudelleen
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

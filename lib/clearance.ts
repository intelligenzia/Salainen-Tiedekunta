import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Whether the visitor has "signed" the faculty's confidentiality pledge.
const KEY = '@clearance_v1';

export async function hasClearance(): Promise<boolean> {
  try {
    if (Platform.OS === 'web') return typeof localStorage !== 'undefined' && localStorage.getItem(KEY) === '1';
    return (await AsyncStorage.getItem(KEY)) === '1';
  } catch {
    return true;
  }
}

export async function grantClearance() {
  try {
    if (Platform.OS === 'web') localStorage.setItem(KEY, '1');
    else await AsyncStorage.setItem(KEY, '1');
  } catch {
    // Storage unavailable: the gate simply shows again next time
  }
}

export async function resetClearance() {
  try {
    if (Platform.OS === 'web') localStorage.removeItem(KEY);
    else await AsyncStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

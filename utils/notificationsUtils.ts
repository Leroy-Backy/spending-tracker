import { getPermissionsAsync, requestPermissionsAsync } from 'expo-notifications';

export async function requestNotificationPermission() {
  const { status } = await getPermissionsAsync();
  if (status !== 'granted') {
    await requestPermissionsAsync();
  }
}
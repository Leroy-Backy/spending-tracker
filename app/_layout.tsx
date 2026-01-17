import {Stack} from "expo-router";
import {MD3DarkTheme, MD3LightTheme, PaperProvider, Text} from "react-native-paper";
import {useColorScheme} from "react-native";
import {SQLiteProvider} from 'expo-sqlite';
import {initDatabase} from '@/utils/dbInit';
import {Suspense, useEffect} from 'react';

import { setNotificationHandler } from 'expo-notifications';
import { requestNotificationPermission } from "@/utils/notificationsUtils";

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: false,
    shouldShowList: false,
  }),
});

export default function RootLayout() {
  const scheme = useColorScheme();

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <SQLiteProvider databaseName="spending-tracker.db" onInit={initDatabase} useSuspense>
      <PaperProvider theme={scheme === "dark" ? MD3DarkTheme : MD3LightTheme}>
        <Suspense fallback={<Text>Loading...</Text>}>
          <Stack>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          </Stack>
        </Suspense>
      </PaperProvider>
    </SQLiteProvider>
  );
}

import {FC} from "react";
import {Tabs} from "expo-router";
import {useTheme} from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const TabLayout: FC = () => {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outlineVariant,
        },
        headerTintColor: theme.colors.primary,
        headerStyle: {
          backgroundColor: theme.colors.surface,
        }
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: "Home",
          tabBarIcon: ({color}) => <MaterialIcons color={color} name={'home'} size={28}/>
        }}
      />
      <Tabs.Screen
        name='expenses'
        options={{
          title: "Expenses",
          tabBarIcon: ({color}) => <MaterialIcons color={color} name={'money-off'} size={28}/>
        }}
      />
      <Tabs.Screen
        name='incomes'
        options={{
          title: "Incomes",
          tabBarIcon: ({color}) => <MaterialIcons color={color} name={'attach-money'} size={28}/>
        }}
      />
    </Tabs>
  );
}

export default TabLayout;
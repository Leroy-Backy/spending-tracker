import {FC} from 'react';
import {Category} from '@/types/types';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View, StyleSheet } from "react-native";
import { Text, useTheme } from 'react-native-paper';

const CategoryItem: FC<Category> = ({icon, category_name}) => {
  const theme = useTheme();

  return (
    <View style={{
      ...styles.container,
    }}>
      <MaterialIcons
        color={theme.colors.primary}
        //@ts-ignore
        name={icon} 
        size={28}
      />
      <Text style={{fontSize: theme.fonts.bodyLarge.fontSize}}>{category_name}</Text>
    </View>
  );
}

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    padding: 5
  }
})
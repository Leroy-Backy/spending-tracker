import { Category } from "@/types/types";
import { useSQLiteContext } from "expo-sqlite";
import { FC, useEffect, useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { useTheme } from "react-native-paper";
import { Dropdown } from "react-native-element-dropdown";
import CategoryItem from "./CategoryItem";

type CategoriesDropdownProps = {
  value: number, 
  onChange: (val: Category) => void,
}

const CategoriesDropdown: FC<CategoriesDropdownProps> = ({value, onChange}) => {
  const theme = useTheme();
  const db = useSQLiteContext();

  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    const res = db.getAllSync<Category>(`select * from category`);
    setCategories(res);
  }, []);

  //TODO fix selected item background

  return (
    <View>
      <Dropdown
        onFocus={Keyboard.dismiss}
        onChange={onChange}
        data={categories}
        labelField={'category_name'}
        valueField={'id'}
        value={value}
        style={{
          ...styles.dropdown,
          backgroundColor: theme.colors.outlineVariant,
          borderColor: theme.colors.onSurfaceVariant,
        }}
        containerStyle={{
          backgroundColor: theme.colors.outlineVariant,
        }}
        placeholderStyle={{
          color: theme.colors.onSurface
        }}
        selectedTextStyle={{
          color: theme.colors.onSurface
        }}
        renderItem={(item) => (
          <CategoryItem {...item}/>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 56,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
});

export default CategoriesDropdown;
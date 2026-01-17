import { TransactionItem } from "@/types/types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FC } from "react";
import { StyleSheet } from "react-native";
import { List, Text, useTheme } from "react-native-paper";

const TransactionItemComponent: FC<{ item: TransactionItem }> = ({ item }) => {
  const theme = useTheme();
  return (
    <List.Item
      title={`zł${item.amount}`}
      description={item.text}
      left={props => <MaterialIcons
        style={props.style}
        color={theme.colors.primary}
        //@ts-ignore
        name={item.category_icon}
        size={28}
      />}
      right={props => <Text>{item.creation_date}</Text>}
    />
  )
}

export default TransactionItemComponent;

const styles = StyleSheet.create({
  container: {

  }
})
import ItemsList from "@/components/ItemsList";
import ViewWrapper from "@/components/ViewWrapper";
import { ItemType } from "@/types/types";
import {FC} from "react";
import { useTheme, Text } from "react-native-paper";

const Expenses: FC = () => {
  const theme = useTheme();
  
  return (
    <ViewWrapper>
      <ItemsList type={ItemType.EXPENSE}/>
    </ViewWrapper>
  );
}

export default Expenses;
import ViewWrapper from "@/components/ViewWrapper";
import { Button, useTheme, Text } from "react-native-paper";
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';
import TransactionItemModal from "@/components/TransactionItemModal";
import { ItemType } from "@/types/types";
import { View, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect } from "expo-router";

type CategorySum = {
  name: string,
  id: number,
  amount: number,
}

type GeneralSum = {
  income: number;
  expense: number;
}

export default function Index() {
  const theme = useTheme();
  const db = useSQLiteContext();
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 7));
  const [categories, setCategories] = useState<CategorySum[]>();
  const [general, setGeneral] = useState<GeneralSum | null>();

  const getNextMonth = (date: string, amount: number) => {
    const temp = new Date(`${date}-01`);
    temp.setMonth(temp.getMonth() + amount);
    return temp.toISOString().slice(0, 7);
  }

  useFocusEffect(() => {
    const val = db.getAllSync<CategorySum>(`
      select 
        cat.id as "id", 
        cat.category_name as "name", 
        sum(it.amount) as "amount" 
      from category cat join items it on it.category_id = cat.id
      where strftime('%Y-%m', it.creation_date) = ? and it.item_type = 0
      group by cat.id, cat.category_name
    `, date);
    setCategories(val);
    const gen = db.getFirstSync<GeneralSum>(`
      SELECT
        SUM(CASE 
            WHEN item_type = 1 AND strftime('%Y-%m', creation_date) = ?1
            THEN amount 
            ELSE 0 
          END) AS income,

        SUM(CASE 
            WHEN item_type = 0 AND strftime('%Y-%m', creation_date) = ?1
            THEN amount 
            ELSE 0 
            END) AS expense
      FROM items;
    `, date);
    setGeneral(gen);
  });

  return (
    <ViewWrapper>
      <View style={styles.monthContainer}>
        <Button
          style={styles.monthButton}
          onPress={() =>
            setDate(prev => getNextMonth(date, -1))
          }
        >
          <MaterialIcons
            color={theme.colors.primary}
            name={'chevron-left'}
            size={28}
          />
        </Button>
        <Text style={{ ...styles.monthText, color: theme.colors.primary }}>{date}</Text>
        <Button
          style={styles.monthButton}
          onPress={() =>
            setDate(prev => getNextMonth(date, 1))
          }
        >
          <MaterialIcons
            color={theme.colors.primary}
            name={'chevron-right'}
            size={28}
          />
        </Button>
      </View>
      <View style={styles.mainTextContainer}>
        <View style={styles.mainText}>
          <Text style={styles.nameText}>Income</Text>
          <Text style={{ ...styles.numberText, color: theme.colors.onSurfaceVariant }}>zł{general?.income}</Text>
        </View>
        <View style={styles.mainText}>
          <Text style={styles.nameText}>Expense</Text>
          <Text style={{ ...styles.numberText, color: theme.colors.error }}>zł{general?.expense}</Text>
        </View>
        <View style={{ paddingTop: 40 }}>
          {categories?.map(category => (
            <View key={category.id} style={styles.mainText}>
              <Text style={{ fontSize: 16 }}>{category.name}</Text>
              <Text style={{ fontSize: 16, marginLeft: 'auto', color: theme.colors.error }}>zł{category.amount}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.addButtonsContainer}>
        <View style={styles.addButton}>
          <TransactionItemModal type={ItemType.EXPENSE} />
        </View>
        <View style={styles.addButton}>
          <TransactionItemModal type={ItemType.INCOME} />
        </View>
      </View>
    </ViewWrapper>
  );
}

const styles = StyleSheet.create({
  monthContainer: {
    height: 60,
    width: '100%',
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  monthText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 800
  },
  monthButton: {
    width: 100
  },
  addButtonsContainer: {
    height: 80,
    display: "flex",
    flexDirection: 'row',
    marginTop: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  addButton: {
    width: '50%'
  },
  mainText: {
    display: 'flex',
    flexDirection: 'row',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 800,
  },
  numberText: {
    marginLeft: 'auto',
    fontSize: 16,
    fontWeight: 800,
  },
  mainTextContainer: {
    paddingHorizontal: 20,
    width: '100%'
  },

});
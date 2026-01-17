import { ItemType, TransactionItem } from "@/types/types";
import { useSQLiteContext } from "expo-sqlite";
import { FC, useCallback, useState } from "react";
import { FlatList } from "react-native";
import TransactionItemComponent from "./TransactionItem";
import { useFocusEffect } from "expo-router";
import { Text } from "react-native-paper";

const PAGE_SIZE = 15;

const ItemsList: FC<{ type: ItemType }> = ({ type }) => {
  const db = useSQLiteContext();
  const [items, setItems] = useState<TransactionItem[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadPage = (page: number, hasMore: boolean, loading: boolean) => {
    if (loading || !hasMore) return;

    setLoading(true);

    const newItems = db.getAllSync<TransactionItem>(
      `
        select 
          it.id as "id", 
          it.creation_date as "creation_date",
          it.text as "text",
          it.amount as "amount",
          it.item_type as "itemType",
          cat.icon as "category_icon",
          cat.category_name as "category_name"
        from items it join category cat on it.category_id = cat.id
        where it.item_type = ?
        order by it.id DESC
        limit ? offset ?
      `,
      type,
      PAGE_SIZE,
      PAGE_SIZE * page
    );
    setItems(prev => [...prev, ...newItems]);
    setPage(prev => prev + 1);

    if (newItems.length < PAGE_SIZE) {
      setHasMore(false);
    }

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      setPage(0);
      setLoading(false);
      setHasMore(true);
      setItems([]);
      loadPage(0, true, false);
    }, [])
  );

  return (
    <FlatList 
      style={{ width: '100%' }}
      data={items}
      keyExtractor={item => item.id.toString()}
      onEndReached={() => {
        loadPage(page, hasMore, loading)
      }}
      onEndReachedThreshold={0.7}
      renderItem={({item}) => (
        <TransactionItemComponent key={item.id} item={item} />
      )}
      ListFooterComponent={
        loading ? <Text>Loading...</Text> : null
      }
    />
  );
}

export default ItemsList;
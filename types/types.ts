export type Category = {
  id: number;
  icon: string, 
  category_name: string
};

export enum ItemType {
  EXPENSE = 0,
  INCOME = 1,
}

export type TransactionItem = {
  id: number;
  creation_date: string;
  text: string;
  amount: number;
  itemType: ItemType;
  category_icon: string;
  category_name: string;
}

export type ItemForm = {
  text: string;
  amount: number;
  category_id: number;
  itemType: ItemType;
}
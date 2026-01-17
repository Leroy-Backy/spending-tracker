import { ItemForm, ItemType } from "@/types/types";
import { FC, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Dialog, Portal, Text, TextInput, useTheme } from "react-native-paper";
import { Controller, useForm, FieldErrors } from "react-hook-form";
import CategoriesDropdown from "./CategoriesDropdown";
import { useSQLiteContext } from "expo-sqlite";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { scheduleNotificationAsync } from "expo-notifications";

type Props = {
  type: ItemType;
}

const TransactionItemModal: FC<Props> = ({ type }) => {
  const theme = useTheme();
  const db = useSQLiteContext();
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState<FieldErrors<ItemForm>>();

  const { control, getValues, reset, handleSubmit } = useForm<ItemForm>({ defaultValues: { itemType: type, amount: 0, text: '' }, shouldUnregister: true, shouldFocusError: true });

  const saveItem = async () => {
    setErrors(undefined);
    const values = getValues();
    try {
      await db.runAsync('insert into items (category_id, creation_date, text, amount, item_type) values (?,?,?,?,?)',
        values.category_id,
        new Date().toISOString().slice(0, 10),
        values.text,
        values.amount,
        type
      );
      const sum = db.getFirstSync<{mounthSum: number}>(
        `select sum(amount) as mounthSum from items where strftime('%Y-%m', creation_date) = ? and item_type = 0`, 
        new Date().toISOString().slice(0, 7)
      );
      await scheduleNotificationAsync({
        content: {
          title: 'Be carefull! ⚠️',
          body: `You've already spent zł${sum?.mounthSum || 0} this mounth!`,
          sound: true,
        },
        trigger: null,
      });
    } catch (err) {
      alert("Failed to save item: " + err);
    }
    onDismiss();
  }

  const onDismiss = () => {
    setVisible(false);
    reset();
  }

  return (
    <>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={onDismiss}
        >
          <Dialog.Title>
            <Text>Add {type === ItemType.EXPENSE ? "expense" : "income"}</Text>
          </Dialog.Title>
          <Dialog.Content>
            <View style={styles.input}>
              <Controller
                control={control}
                name="amount"
                rules={{
                  required: { value: true, message: 'Amount is required!' },
                  min: { value: 0.01, message: "Min value is 0.01" }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Amount"
                    onBlur={onBlur}
                    value={String(value)}
                    onChangeText={onChange}
                    keyboardType="numeric"
                  />
                )}
              />
              {errors?.amount && (
                <Text style={{ color: theme.colors.error }}>{errors.amount.message}</Text>
              )}
            </View>
            <View style={styles.input}>
              <Controller
                control={control}
                name="text"
                rules={{
                  required: { value: true, message: 'Name is required!' }
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Name"
                    onBlur={onBlur}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors?.text && (
                <Text style={{ color: theme.colors.error }}>{errors.text.message}</Text>
              )}
            </View>
            <View style={styles.input}>
              <Controller
                control={control}
                name="category_id"
                rules={{
                  required: { value: true, message: 'Category is required!' }
                }}
                render={({ field: { onChange, value } }) => (
                  <CategoriesDropdown
                    value={value}
                    onChange={(category) => onChange(category?.id)}
                  />
                )}
              />
              {errors?.category_id && (
                <Text style={{ color: theme.colors.error }}>{errors.category_id.message}</Text>
              )}
            </View>
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={handleSubmit(saveItem, setErrors)}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Button
        onPress={() => setVisible(true)}
        icon={() =>
          <MaterialIcons
            color={theme.colors.primary}
            name={'add-circle'}
            size={20}
          />
        }
      >
        Add {type === ItemType.EXPENSE ? 'expense' : 'income'}
      </Button>
    </>
  );
}

export default TransactionItemModal;

const styles = StyleSheet.create({
  input: {
    marginTop: 10
  }
});
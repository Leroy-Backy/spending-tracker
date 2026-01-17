import { FC, PropsWithChildren } from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";

const ViewWrapper: FC<PropsWithChildren> = ({children}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background
      }}
    >
      {children}
    </View>
  );
}

export default ViewWrapper;
// app/lista/listStyles.ts
import { StyleSheet } from "react-native";

export const listStyles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "white" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  itemBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F7F7FB",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  itemName: { fontWeight: "bold", fontSize: 16 },
});

import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ShoppingList } from "../models/list";
import { addList, getLists } from "../services/listStorage";

export default function ShoppingListsScreen() {
  const [lists, setLists] = useState<ShoppingList[]>([]);
  const [newList, setNewList] = useState("");
  const router = useRouter();

  async function loadLists() {
    const data = await getLists();
    setLists(data);
  }

  async function createList() {
    if (newList.trim().length === 0) return;
    await addList(newList);
    setNewList("");
    await loadLists();
  }

  useEffect(() => {
    loadLists();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Shopping Lists</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="New list..."
          value={newList}
          onChangeText={setNewList}
          style={styles.input}
        />
        <TouchableOpacity onPress={createList} style={styles.btnAdd}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={lists}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({ pathname: "/list/[id]", params: { id: item.id } })
            }
          >
            <View style={styles.listItem}>
              <Text style={styles.listName}>{item.name}</Text>
              <Text style={styles.listDate}>
                {new Date(item.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#999" }}>
            No lists yet.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "white" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  inputRow: { flexDirection: "row", marginBottom: 16 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    marginRight: 8,
  },
  btnAdd: {
    backgroundColor: "#3874CB",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 8,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F1F6FB",
    padding: 14,
    marginBottom: 10,
    borderRadius: 8,
  },
  listName: { fontWeight: "bold", fontSize: 16 },
  listDate: { color: "#888", fontSize: 13 },
});

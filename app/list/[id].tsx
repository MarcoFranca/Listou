// app/list/[id].tsx

import React from "react";
import { FlatList, Text, View } from "react-native";
import { AddItemBar } from "./AddItemBar";
import { ItemRow } from "./ItemRow";
import { listStyles } from "./listStyles"; // caso prefira usar um arquivo separado de estilos
import { useListDetailLogic } from "./useListDetailLogic";

export default function ListDetailScreen() {
  const {
    newItemName, setNewItemName,
    newItemQty, setNewItemQty,
    newItemUnit, setNewItemUnit,
    list, UNIT_OPTIONS, unitMenuVisible, setUnitMenuVisible,
    codigoBarras, photoUrl, suggestions, loadingSuggestions,
    addItem, togglePurchased, deleteItem, handleSelectProduct,
  } = useListDetailLogic();

  if (!list) return <Text style={{ margin: 30 }}>List not found.</Text>;

  return (
    <View style={listStyles.container}>
      <Text style={listStyles.title}>{list.name}</Text>
      <AddItemBar
        newItemName={newItemName}
        setNewItemName={setNewItemName}
        newItemQty={newItemQty}
        setNewItemQty={setNewItemQty}
        newItemUnit={newItemUnit}
        setNewItemUnit={setNewItemUnit}
        unitMenuVisible={unitMenuVisible}
        setUnitMenuVisible={setUnitMenuVisible}
        UNIT_OPTIONS={UNIT_OPTIONS}
        suggestions={suggestions}
        loadingSuggestions={loadingSuggestions}
        handleSelectProduct={handleSelectProduct}
        codigoBarras={codigoBarras}
        photoUrl={photoUrl}
        onAdd={addItem}
      />

      <FlatList
        data={list.items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ItemRow
            item={item}
            onToggle={togglePurchased}
            onDelete={deleteItem}
          />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: "#999" }}>No items yet.</Text>
        }
      />
    </View>
  );
}

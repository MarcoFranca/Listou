// app/lista/ItemRow.tsx
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Item } from "../../models/list";

interface ItemRowProps {
  item: Item;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  style?: any;
}

export function ItemRow({ item, onToggle, onDelete, style }: ItemRowProps) {
  return (
    <View style={[
      {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F7F7FB",
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
      },
      item.purchased && { backgroundColor: "#d4f8db" },
      style,
    ]}>
      {item.photoUrl && (
        <Image source={{ uri: item.photoUrl }} style={{
          width: 28, height: 28, borderRadius: 4, marginRight: 8
        }} />
      )}
      <TouchableOpacity style={{ flex: 1 }} onPress={() => onToggle(item.id)}>
        <Text style={[
          { fontWeight: "bold", fontSize: 16 },
          item.purchased && { textDecorationLine: "line-through", color: "#888" },
        ]}>{item.name}</Text>
        <Text style={{ color: "#555", fontSize: 13 }}>
          {item.quantity} {item.unit}
        </Text>
        {item.barcode ? (
          <Text style={{ color: "#3874CB", fontSize: 11 }}>
            Barcode: {item.barcode}
          </Text>
        ) : null}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDelete(item.id)}>
        <Text style={{ color: "#c00", fontWeight: "bold", fontSize: 18 }}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

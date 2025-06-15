// app/list/AddItemBar.tsx
import React from "react";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Menu } from "react-native-paper";

interface AddItemBarProps {
  newItemName: string;
  setNewItemName: (s: string) => void;
  newItemQty: string;
  setNewItemQty: (s: string) => void;
  newItemUnit: string;
  setNewItemUnit: (s: string) => void;
  unitMenuVisible: boolean;
  setUnitMenuVisible: (b: boolean) => void;
  UNIT_OPTIONS: string[];
  suggestions: any[];
  loadingSuggestions: boolean;
  handleSelectProduct: (item: any) => void;
  codigoBarras?: string;
  photoUrl?: string;
  onAdd: () => void;
}

export function AddItemBar({
  newItemName, setNewItemName,
  newItemQty, setNewItemQty,
  newItemUnit, setNewItemUnit,
  unitMenuVisible, setUnitMenuVisible,
  UNIT_OPTIONS,
  suggestions, loadingSuggestions,
  handleSelectProduct,
  codigoBarras, photoUrl,
  onAdd
}: AddItemBarProps) {
  return (
    <View style={{ flexDirection: "row", marginBottom: 8 }}>
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder="Item name"
          value={newItemName}
          onChangeText={setNewItemName}
          style={{
            borderWidth: 1, borderColor: "#ccc", borderRadius: 8,
            paddingHorizontal: 10, height: 38, marginBottom: 2,
          }}
        />
        {codigoBarras || photoUrl ? (
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
            {photoUrl && (
              <Image source={{ uri: photoUrl }} style={{ width: 28, height: 28, borderRadius: 4, marginRight: 8 }} />
            )}
            {codigoBarras ? (
              <Text style={{ fontSize: 12, color: "#3874CB", fontWeight: "bold" }}>
                Barcode: <Text style={{ color: "#333" }}>{codigoBarras}</Text>
              </Text>
            ) : null}
          </View>
        ) : null}

        {loadingSuggestions && <ActivityIndicator size="small" />}
        <FlatList
          data={suggestions}
          keyExtractor={item => item.id || item._id || item.code}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectProduct(item)}
              style={{
                padding: 8, flexDirection: "row", alignItems: "center",
                borderBottomWidth: 1, borderColor: "#eee", backgroundColor: "#fafbfc"
              }}>
              {item.image_thumb_url && (
                <Image source={{ uri: item.image_thumb_url }} style={{
                  width: 28, height: 28, marginRight: 6, borderRadius: 4
                }} />
              )}
              <Text style={{ flex: 1, fontSize: 14 }}>{item.product_name}</Text>
              <Text style={{ color: "#999", fontSize: 11, marginLeft: 8 }}>{item.code}</Text>
            </TouchableOpacity>
          )}
          style={{ maxHeight: 170 }}
          ListEmptyComponent={null}
        />
      </View>
      <TextInput
        placeholder="Qty"
        value={newItemQty}
        onChangeText={setNewItemQty}
        keyboardType="numeric"
        style={{
          width: 60, marginLeft: 4, borderWidth: 1,
          borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 10, height: 38,
        }}
      />
      <Menu
        visible={unitMenuVisible}
        onDismiss={() => setUnitMenuVisible(false)}
        anchor={
          <TouchableOpacity
            style={{
              width: 80, height: 38, backgroundColor: "#f4f7fa",
              borderRadius: 8, borderWidth: 1, borderColor: "#ccc",
              justifyContent: "center", alignItems: "center", marginLeft: 4,
            }}
            onPress={() => setUnitMenuVisible(true)}
          >
            <Text style={{ color: "#222" }}>{newItemUnit}</Text>
          </TouchableOpacity>
        }
      >
        {UNIT_OPTIONS.map(unit => (
          <Menu.Item
            key={unit}
            onPress={() => {
              setNewItemUnit(unit);
              setUnitMenuVisible(false);
            }}
            title={unit}
          />
        ))}
      </Menu>
      {/* Botão Add */}
      <TouchableOpacity
        onPress={onAdd}
        style={{
          backgroundColor: "#3874CB",
          borderRadius: 8,
          paddingHorizontal: 14,
          justifyContent: "center",
          marginLeft: 8,
          alignSelf: "center"
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}

// app/lista/useListDetailLogic.ts
import { searchProducts } from "@/services/productApi";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import { Item, ShoppingList } from "../../models/list";
import { getLists, saveLists } from "../../services/listStorage";

// Essa função retorna todos os hooks, states e handlers
export function useListDetailLogic() {
  const [newItemName, setNewItemName] = useState("");
  const [newItemQty, setNewItemQty] = useState("");
  const [newItemUnit, setNewItemUnit] = useState("un");
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const [list, setList] = useState<ShoppingList | null>(null);
  const [unitMenuVisible, setUnitMenuVisible] = useState(false);
  const UNIT_OPTIONS = ["un", "kg", "g", "ml", "l"];
  const [codigoBarras, setCodigoBarras] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);

  function handleSelectProduct(item: any) {
    setNewItemName(item.product_name);
    setCodigoBarras(item.code || "");
    setPhotoUrl(item.image_thumb_url || undefined);
    setSuggestions([]);
  }

  useEffect(() => {
    if (newItemName.length < 3) {
      setSuggestions([]);
      setLoadingSuggestions(false);
      return;
    }
    setLoadingSuggestions(true);
    const timeout = setTimeout(async () => {
      try {
        const found = await searchProducts(newItemName);
        setSuggestions(found.slice(0, 8));
      } catch (err) {
        setSuggestions([]);
      } finally {
        setLoadingSuggestions(false);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [newItemName]);

  useEffect(() => {
    async function fetchList() {
      const lists = await getLists();
      const found = lists.find((l) => l.id === id);
      setList(found || null);
    }
    fetchList();
  }, [id]);

  useLayoutEffect(() => {
    if (list) {
      navigation.setOptions({ title: list.name });
    }
  }, [list, navigation]);

  async function addItem() {
    if (
      !list ||
      newItemName.trim().length === 0 ||
      isNaN(Number(newItemQty)) ||
      Number(newItemQty) <= 0
    )
      return;
    const lists = await getLists();
    const idx = lists.findIndex((l) => l.id === id);
    if (idx === -1) return;
    const newItemObj: Item = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2, 9),
      name: newItemName.trim(),
      quantity: newItemQty,
      unit: newItemUnit,
      purchased: false,
      barcode: codigoBarras || undefined,
      photoUrl: photoUrl || undefined,
    };
    lists[idx].items.push(newItemObj);
    await saveLists(lists);
    setList({ ...lists[idx] });
    setNewItemName("");
    setNewItemQty("");
    setNewItemUnit("un");
    setCodigoBarras("");
    setPhotoUrl(undefined);
  }

  async function togglePurchased(itemId: string) {
    if (!list) return;
    const lists = await getLists();
    const idx = lists.findIndex((l) => l.id === id);
    if (idx === -1) return;
    const itemIdx = lists[idx].items.findIndex((i) => i.id === itemId);
    if (itemIdx === -1) return;
    lists[idx].items[itemIdx].purchased = !lists[idx].items[itemIdx].purchased;
    await saveLists(lists);
    setList({ ...lists[idx] });
  }

  async function deleteItem(itemId: string) {
    if (!list) return;
    const lists = await getLists();
    const idx = lists.findIndex((l) => l.id === id);
    if (idx === -1) return;
    lists[idx].items = lists[idx].items.filter((i) => i.id !== itemId);
    await saveLists(lists);
    setList({ ...lists[idx] });
  }

  return {
    newItemName, setNewItemName,
    newItemQty, setNewItemQty,
    newItemUnit, setNewItemUnit,
    list, UNIT_OPTIONS, unitMenuVisible, setUnitMenuVisible,
    codigoBarras, setCodigoBarras,
    suggestions, setSuggestions,
    loadingSuggestions,
    photoUrl, setPhotoUrl,
    addItem, togglePurchased, deleteItem, handleSelectProduct,
  };
}

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ShoppingList } from '../models/list';

const STORAGE_KEY = '@shopping_lists';

export async function getLists(): Promise<ShoppingList[]> {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

export async function saveLists(listas: ShoppingList[]) {
  try {
    console.log('Salvando no storage:', listas);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(listas));
    const check = await AsyncStorage.getItem(STORAGE_KEY);
    console.log('Storage após salvar:', check);
  } catch (error) {
    console.log('Erro ao salvar listas:', error);
  }
}


function simpleId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

export async function addList(name: string): Promise<ShoppingList> {
  try {
    const listas = await getLists();
    const newList: ShoppingList = {
      id: simpleId(),
      name,
      createdAt: new Date().toISOString(),
      items: [],
    };
    listas.push(newList);
    await saveLists(listas);
    console.log('Nova lista adicionada:', newList);
    return newList;
  } catch (error) {
    console.log('Erro em addLista:', error);
    throw error;
  }
}


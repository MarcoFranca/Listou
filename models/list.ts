// models/list.ts
export interface Item {
  id: string;
  name: string;
  quantity: number | string;
  barcode?: string;
  photoUrl?: string;
  unit: 'un' | 'kg' | 'g' | 'ml' | 'l' | string; 
  purchased: boolean;
}

export interface ShoppingList {
  id: string;
  name: string;
  createdAt: string;
  items: Item[];
}

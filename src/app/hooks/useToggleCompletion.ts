import { ItemsApi } from '@/apis/items';
import { getItems } from '@/types/type';
import { useState } from 'react';

export default function useToggleCompletion(initialItems: getItems[]) {
  const [items, setItems] = useState<getItems[]>(initialItems);

  const toggleCompletion = async (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, isCompleted: !item.isCompleted } : item))
    );

    try {
      const updatedItem = items.find((item) => item.id === id);
      if (!updatedItem) return;

      await ItemsApi.updateItems(id, { isCompleted: !updatedItem.isCompleted });
    } catch (err) {
      console.error('업데이트 실패', err);
    }
  };

  return [items, setItems, toggleCompletion] as const;
}

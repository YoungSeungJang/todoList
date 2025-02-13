import { Axios } from './core';

const PATH = '/youngseung/items';

export const ItemsApi = {
  async getItems() {
    try {
      const res = await Axios.get(PATH);
      return res.data;
    } catch (err) {
      console.error('error', err);
    }
  },
  async updateItems(id: number, data: { isCompleted?: boolean; name?: string; memo?: string }) {
    try {
      const res = await Axios.patch(`${PATH}/${id}`, data);
      return res.data;
    } catch (err) {
      console.error('error', err);
    }
  },
  async postItem(name: string) {
    try {
      const res = await Axios.post(PATH, { name });
      return res.data;
    } catch (err) {
      console.error('postError', err);
    }
  },
  async getItem(itemId: string) {
    try {
      const res = await Axios.get(`${PATH}/${itemId}`);
      return res.data;
    } catch (err) {
      console.error('getItemError', err);
    }
  },
  async updateItem(
    itemId: string,
    data: { name?: string; memo?: string | null; imageUrl?: string | null; isCompleted?: boolean }
  ) {
    try {
      const res = await Axios.patch(`${PATH}/${itemId}`, data);
      return res.data;
    } catch (err) {
      console.error('updateItemError', err);
    }
  },
  async deleteItem(itemId: string) {
    try {
      const res = await Axios.delete(`${PATH}/${itemId}`);
      return res.data;
    } catch (err) {
      console.error('deleteItemError', err);
    }
  },
};

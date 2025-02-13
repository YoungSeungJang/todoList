export interface getItems {
  id: number;
  name: string;
  isCompleted: boolean;
}

export interface getItem extends getItems {
  imageUrl: string;
  memo: string;
  tenantId: string;
}

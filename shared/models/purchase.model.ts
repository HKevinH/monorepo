import type { IProduct } from "./product.model";

export interface IPurchase {
  id: string;
  title: string;
  iduser: string;
  totalAmount: number;
  date: Date;
  details: {
    description: string;
    products: IProduct[];
    dateTime: Date;
    status: "completed" | "pending" | "cancelled";
  };
}

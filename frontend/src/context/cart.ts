import { createContext } from "react";

export interface CartProduct {
  productId: number;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
}

export interface CartContextValue {
  cartProducts: CartProduct[];
  addToCart: (product: Omit<CartProduct, "quantity">, quantity: number) => void;
  updateQuantity: (
    productId: number,
    size: string,
    color: string,
    change: number,
  ) => void;
  removeProduct: (productId: number, size: string, color: string) => void;
  itemCount: number;
}

export const CartContext = createContext<CartContextValue | undefined>(
  undefined,
);

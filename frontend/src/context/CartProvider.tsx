import { useMemo, useState, type ReactNode } from "react";
import { CartContext, type CartProduct } from "./cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const addToCart = (
    product: Omit<CartProduct, "quantity">,
    quantity: number,
  ) => {
    setCartProducts((products) => {
      const existingProduct = products.find(
        (item) =>
          item.productId === product.productId &&
          item.size === product.size &&
          item.color === product.color,
      );

      if (existingProduct) {
        return products.map((item) =>
          item === existingProduct
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...products, { ...product, quantity }];
    });
  };

  const updateQuantity = (
    productId: number,
    size: string,
    color: string,
    change: number,
  ) => {
    setCartProducts((products) =>
      products.map((product) =>
        product.productId === productId &&
        product.size === size &&
        product.color === color
          ? { ...product, quantity: Math.max(1, product.quantity + change) }
          : product,
      ),
    );
  };

  const removeProduct = (productId: number, size: string, color: string) => {
    setCartProducts((products) =>
      products.filter(
        (product) =>
          !(
            product.productId === productId &&
            product.size === size &&
            product.color === color
          ),
      ),
    );
  };

  const value = useMemo(
    () => ({
      cartProducts,
      addToCart,
      updateQuantity,
      removeProduct,
      itemCount: cartProducts.reduce(
        (total, product) => total + product.quantity,
        0,
      ),
    }),
    [cartProducts],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

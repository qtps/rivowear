import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useState } from "react";

interface CartProduct {
  productId: number;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  image: string;
}

const initialCartProducts: CartProduct[] = [
  {
    productId: 1,
    name: "T-shirt",
    size: "M",
    color: "Red",
    quantity: 2,
    price: 500.99,
    image: "https://picsum.photos/200?random=1",
  },
  {
    productId: 2,
    name: "Jeans",
    size: "L",
    color: "Blue",
    quantity: 5,
    price: 1500,
    image: "https://picsum.photos/200?random=2",
  },
  
];

const CartContents = () => {
  const [cartProducts, setCartProducts] = useState(initialCartProducts);

  const updateQuantity = (productId: number, change: number) => {
    setCartProducts((products) =>
      products.map((product) =>
        product.productId === productId
          ? { ...product, quantity: Math.max(1, product.quantity + change) }
          : product,
      ),
    );
  };

  const removeProduct = (productId: number) => {
    setCartProducts((products) =>
      products.filter((product) => product.productId !== productId),
    );
  };

  if (cartProducts.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-gray-500">
        Your cart is empty.
      </p>
    );
  }

  return (
    <div>
      {cartProducts.map((product) => (
        <div
          key={product.productId}
          className="flex gap-3 border-b border-gray-200 py-3"
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-16 w-16 shrink-0 rounded object-cover"
          />

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-500">
                  size: {product.size} | color: {product.color}
                </p>
              </div>
              <span className="shrink-0 text-sm font-medium text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => updateQuantity(product.productId, -1)}
                  className="flex h-7 w-7 items-center justify-center rounded border border-gray-200 text-gray-700 hover:bg-gray-100"
                  aria-label={`Decrease ${product.name} quantity`}
                >
                  <FiMinus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-sm">{product.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(product.productId, 1)}
                  className="flex h-7 w-7 items-center justify-center rounded border border-gray-200 text-gray-700 hover:bg-gray-100"
                  aria-label={`Increase ${product.name} quantity`}
                >
                  <FiPlus className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => removeProduct(product.productId)}
                className="p-1 text-red-900/70 hover:text-red-900"
                aria-label={`Remove ${product.name} from cart`}
              >
                <FiTrash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;

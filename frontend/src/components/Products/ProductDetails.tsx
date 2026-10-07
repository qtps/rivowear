import { useRef, useState } from "react";
import { useCart } from "../../context/useCart";

const product = {
  productId: 3,
  name: "Slim-Fit Easy-Iron Shirt",
  price: 34.99,
  description:
    "A slim-fit, easy-iron shirt in woven cotton fabric with a fitted silhouette. Features a turn-down collar, classic button placket, and a yoke at the back. Long sleeves and adjustable button cuffs with a rounded hem.",
  brand: "Urban Chic",
  material: "Cotton",
  colors: [
    {
      name: "Gray",
      className: "bg-gray-500",
      images: [
        "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=85",
      ],
    },
    {
      name: "Black",
      className: "bg-gray-900",
      images: [
        "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?auto=format&fit=crop&w=400&q=85",
      ],
    },
    {
      name: "White",
      className: "bg-neutral-500",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=400&q=85",
      ],
    },
    {
      name: "Navy",
      className: "bg-blue-950",
      images: [
        "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?auto=format&fit=crop&w=900&q=85",
        "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=400&q=85",
      ],
    },
  ],
  sizes: ["S", "M", "L", "XL", "XXL"],
};

const ProductDetails = () => {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(
    product.colors[0].images[0],
  );
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<number | undefined>(undefined);
  const selectedColorData =
    product.colors.find((color) => color.name === selectedColor) ??
    product.colors[0];

  const handleAddToCart = () => {
    addToCart(
      {
        productId: product.productId,
        name: product.name,
        price: product.price,
        size: selectedSize,
        color: selectedColor,
        image: selectedImage,
      },
      quantity,
    );
    setToastVisible(true);

    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current);
    }

    toastTimer.current = window.setTimeout(() => {
      setToastVisible(false);
    }, 1800);
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-8 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] lg:gap-10">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="order-2 flex shrink-0 flex-row gap-3 overflow-x-auto lg:order-1 lg:w-16 lg:flex-col">
            {selectedColorData.images.map((image) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 ${
                  selectedImage === image
                    ? "border-gray-900"
                    : "border-gray-200"
                }`}
                aria-label={`View ${product.name}`}
              >
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
          <div className="order-1 aspect-4/5 min-w-0 flex-1 overflow-hidden rounded-lg lg:order-2">
            <img
              src={selectedImage}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-2xl font-bold text-gray-950 sm:text-3xl">
            {product.name}
          </h3>
          <p className="mt-2 text-lg text-gray-700">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            {product.description}
          </p>

          <fieldset className="mt-5">
            <legend className="mb-2 text-sm font-medium text-gray-800">
              Color: {selectedColor}
            </legend>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => {
                    setSelectedColor(color.name);
                    setSelectedImage(color.images[0]);
                  }}
                  className={`h-8 w-8 rounded-full border-2 ${color.className} ${
                    selectedColor === color.name
                      ? "border-gray-400 ring-2 ring-gray-900 ring-offset-2"
                      : "border-white"
                  }`}
                  aria-label={`Select ${color.name}`}
                  aria-pressed={selectedColor === color.name}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="mb-2 text-sm font-medium text-gray-800">
              Size: {selectedSize}
            </legend>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`rounded border px-4 py-2 text-sm ${
                    selectedSize === size
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-200 hover:border-gray-900"
                  }`}
                  aria-pressed={selectedSize === size}
                >
                  {size}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-5">
            <span className="mb-2 block text-sm font-medium text-gray-800">
              Quantity
            </span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
                className="h-8 w-8 rounded bg-gray-100 text-lg"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                className="h-8 w-8 rounded bg-gray-100 text-lg"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-6 rounded bg-gray-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            ADD TO CART
          </button>

          <div className="mt-10 border-t pt-5">
            <h4 className="font-semibold">Characteristics:</h4>
            <dl className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-gray-600">
              <dt>Brand</dt>
              <dd>{product.brand}</dd>
              <dt>Material</dt>
              <dd>{product.material}</dd>
            </dl>
          </div>
        </div>
      </div>
      {toastVisible && (
        <div
          className="fixed top-6 right-6 z-50 rounded-lg bg-gray-950 px-4 py-3 text-sm font-medium text-white shadow-lg"
          role="status"
          aria-live="polite"
        >
          {product.name} added to cart
        </div>
      )}
    </section>
  );
};

export default ProductDetails;

import {
  type CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
};

const newArrivals: Product[] = [
  {
    id: 1,
    name: "Off-Shoulder Top",
    price: "$45",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Knitted Cropped Top",
    price: "$40",
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "High-Rise Joggers",
    price: "$40",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Relaxed Linen Shirt",
    price: "$55",
    image:
      "https://images.unsplash.com/photo-1605763240000-7e93b172d754?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "Everyday Trousers",
    price: "$60",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85",
  },
];

const NewArrivals = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const updateMobileState = () => setIsMobile(mediaQuery.matches);

    updateMobileState();
    mediaQuery.addEventListener("change", updateMobileState);

    return () => mediaQuery.removeEventListener("change", updateMobileState);
  }, []);

  const maxIndex = newArrivals.length - (isMobile ? 1 : 3);
  const slideDistance = isMobile
    ? carouselWidth - 16
    : carouselWidth / 3 + 8;
  const visibleIndex = Math.min(activeIndex, maxIndex);

  const showPrevious = () => {
    setActiveIndex((current) => Math.max(current - 1, 0));
  };

  const showNext = () => {
    setActiveIndex((current) => Math.min(current + 1, maxIndex));
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) {
      return;
    }

    const distance = event.changedTouches[0].clientX - touchStartX;

    if (Math.abs(distance) > 40) {
      if (distance < 0) {
        showNext();
      } else {
        showPrevious();
      }
    }

    setTouchStartX(null);
  };

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) {
      return;
    }

    const updateCarouselWidth = () => setCarouselWidth(carousel.clientWidth);
    const observer = new ResizeObserver(updateCarouselWidth);

    updateCarouselWidth();
    observer.observe(carousel);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
          Explore New Arrivals
        </h2>
        <p className="mx-auto mt-4 max-w-4xl text-sm leading-6 text-gray-600 sm:text-base">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>
      </div>

      <div className="relative mt-10 sm:mt-12">
        <div
          ref={carouselRef}
          className="touch-pan-y overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="new-arrivals-track flex gap-4 transition-transform duration-500 ease-out sm:gap-6"
            style={
              {
                transform: `translateX(-${visibleIndex * slideDistance}px)`,
              } as CSSProperties
            }
          >
            {newArrivals.map((product) => (
              <article
                key={product.id}
                className="group relative h-64 w-[calc(100%-2rem)] shrink-0 overflow-hidden rounded-lg sm:h-90 sm:w-[calc(33.333%-16px)] lg:h-115 lg:w-[calc(33.333%-16px)]"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/35 px-5 py-4 text-white backdrop-blur-md sm:px-6 sm:py-5">
                  <h3 className="text-base font-medium sm:text-lg">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm sm:text-base">{product.price}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-label="Previous arrivals"
          onClick={showPrevious}
          disabled={visibleIndex === 0}
          className="absolute top-1/2 left-2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-gray-900 shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 sm:flex sm:-left-5"
        >
          <FiChevronLeft className="size-6" />
        </button>
        <button
          type="button"
          aria-label="Next arrivals"
          onClick={showNext}
          disabled={visibleIndex === maxIndex}
          className="absolute top-1/2 right-2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-gray-900 shadow-sm transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 sm:flex sm:-right-5"
        >
          <FiChevronRight className="size-6" />
        </button>
      </div>
    </section>
  );
};

export default NewArrivals;

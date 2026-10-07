import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi";

import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useEffect, useState } from "react";
import { useCart } from "../../context/useCart";
const Navbar = () => {
  const { itemCount } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleMenuItemClick = () => {
    setNavbarOpen(false);
  };

  useEffect(() => {
    if (!navbarOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setNavbarOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [navbarOpen]);

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* left logo */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            Rivowear
          </Link>
        </div>

        <div>
          {/* center navigation links */}
          <div className="hidden space-x-6 md:flex">
            <Link
              to="#"
              className="font-medum text-sm text-gray-700 uppercase hover:text-black"
            >
              Men
            </Link>
            <Link
              to="#"
              className="font-medum text-sm text-gray-700 uppercase hover:text-black"
            >
              Women
            </Link>
            <Link
              to="#"
              className="font-medum text-sm text-gray-700 uppercase hover:text-black"
            >
              Top Wear
            </Link>
            <Link
              to="#"
              className="font-medum text-sm text-gray-700 uppercase hover:text-black"
            >
              Bottom Wear
            </Link>
          </div>
        </div>

        {/* Right Icons  */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>

          <button
            onClick={() => setDrawerOpen(true)}
            className="relative hover:text-black"
            aria-label="Open cart"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="bg-rabbit-red absolute -top-1 rounded-full px-2 py-0.5 text-xs text-white">
              {itemCount}
            </span>
          </button>
          {/* search bar  */}

          <SearchBar />

          <button
            onClick={toggleNavbar}
            className="relative flex h-6 w-6 items-center justify-center md:hidden"
            aria-label={navbarOpen ? "Close menu" : "Open menu"}
            aria-expanded={navbarOpen}
          >
            <span
              className={`absolute h-0.5 w-6 bg-gray-700 transition-transform duration-300 ${
                navbarOpen ? "rotate-45" : "-translate-y-2"
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 bg-gray-700 transition-all duration-300 ${
                navbarOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 bg-gray-700 transition-transform duration-300 ${
                navbarOpen ? "-rotate-45" : "translate-y-2"
              }`}
            />
          </button>
        </div>
      </nav>
      <CartDrawer
        drawerOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <>
        <button
          type="button"
          className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 md:hidden ${
            navbarOpen
              ? "visible opacity-100"
              : "pointer-events-none invisible opacity-0"
          }`}
          onClick={() => setNavbarOpen(false)}
          aria-label="Close menu"
        />
        <aside
          className={`fixed top-0 left-0 z-50 h-full w-3/4 bg-white p-4 shadow-lg transition-transform duration-300 ease-out md:hidden ${
            navbarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-hidden={!navbarOpen}
        >
          <h2 className="mt-2 text-lg font-semibold">Menu</h2>
          <nav className="mt-4 space-y-1">
            {[
              { label: "Men", to: "#" },
              { label: "Women", to: "#" },
              { label: "Top Wear", to: "#" },
              { label: "Bottom Wear", to: "#" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={handleMenuItemClick}
                tabIndex={navbarOpen ? 0 : -1}
                className="group flex touch-manipulation items-center rounded-lg px-3 py-2.5 text-sm text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:pl-4 hover:text-black focus-visible:bg-gray-100 focus-visible:text-black focus-visible:outline-none active:scale-[0.98] active:bg-gray-100 active:text-black"
              >
                <span className="group-hover:bg-rabbit-red group-active:bg-rabbit-red group-focus-visible:bg-rabbit-red mr-2 h-1.5 w-1.5 rounded-full bg-transparent transition-colors duration-200" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>
      </>
    </>
  );
};

export default Navbar;

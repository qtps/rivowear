import { HiOutlineUser, HiOutlineShoppingBag } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";

import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
const Navbar = () => {

   const [drawerOpen, setDrawerOpen] = useState(true);
    const toggleCartDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }
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

          <button className="relative hover:text-black">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="bg-rabbit-red absolute -top-1 rounded-full px-2 py-0.5 text-xs text-white">
              4
            </span>
          </button>
          {/* search bar  */}

          <SearchBar/>

          <button className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700 " />
          </button>
        </div>
      </nav>
      <CartDrawer/>
    </>
  );
};

export default Navbar;

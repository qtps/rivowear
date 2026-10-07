import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import { CartProvider } from "./context/CartProvider";

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;

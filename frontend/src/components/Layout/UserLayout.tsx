import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Home from "../../pages/Home";

const UserLayout = () => {
  return (
    <>
      {/* Header */}
      <Header />
  
        <Home />

      <Footer />
    </>
  );
};

export default UserLayout;

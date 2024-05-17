import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/products";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Products from "./scenes/products";
import SellerProducts from "./scenes/sellers";
import Seller from "./scenes/seller";
import Orders from "./scenes/orders";
import Order from "./scenes/order";
import Newsletters from "./scenes/newsletters";
import Coupons from "./scenes/coupons";
import Users from "./scenes/users";
import User from "./scenes/user";
import Product from "./scenes/product";
import Banners from "./scenes/banners";
import Banner from "./scenes/banner";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/products" element={<Products />} />
              <Route path="/sellers" element={<SellerProducts />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/newsletters" element={<Newsletters />} />
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/banners" element={<Banners />} />

              {/* Single object route */}
              <Route path="/product/:id" element={<Product />} />
              <Route path="/seller/:id" element={<Seller />} />
              <Route path="/order/:id" element={<Order />} />
              <Route path="/user/:id" element={<User />} />
              <Route path="/banner/:id" element={<Banner />} />


              {/* already made routes */}
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./scenes/dashboard";
import Products from "./scenes/products";
import SellerProducts from "./scenes/sellers";
import Orders from "./scenes/orders";
import Newsletters from "./scenes/newsletters";
import Coupons from "./scenes/coupons";
import Users from "./scenes/users";
import Product from "./scenes/product";
import Seller from "./scenes/seller";
import Order from "./scenes/order";
import User from "./scenes/user";
import Banner from "./scenes/banner";
import Banners from "./scenes/banners";
import Login from "./scenes/login";
import Register from "./scenes/register";
import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";
import Form from "./scenes/form";
import Bar from "./scenes/bar";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Calendar from "./scenes/calendar/calendar";
import Geography from "./scenes/geography";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
        <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/sellers" element={<SellerProducts />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/newsletters" element={<Newsletters />} />
            <Route path="/coupons" element={<Coupons />} />
            <Route path="/banners" element={<Banners />} />
            
            {/* Specific routes for entities */}
            <Route path="/product/:id" element={<Product />} />
            <Route path="/seller/:id" element={<Seller />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/banner/:id" element={<Banner />} />
        
            {/* Dynamic route for creating new entities */}
            <Route path="/new/:entity" element={<Form />} />
        
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/bar" element={<Bar />} />
            <Route path="/pie" element={<Pie />} />
            <Route path="/line" element={<Line />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/geography" element={<Geography />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

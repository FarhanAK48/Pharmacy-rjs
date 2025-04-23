import Header from "./components/header";
import "./App.css";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import Product from "./components/product";
import Cart from "./components/cart";
import RoleProvider from "./components/contextApi/roleProvider";
function App() {
  return (
    <RoleProvider>
  <Router>
      <div className="App h-screen flex flex-col">
        {/* Header stays on top */}
        <Header />

        {/* Main content area (with routing) */}
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </div>
    </Router>
    </RoleProvider>
  );
}

export default App;

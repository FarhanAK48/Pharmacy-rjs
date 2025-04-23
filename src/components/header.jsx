import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { RoleContext } from "./contextApi/roleProvider";
const Header = () => {
    const { role, setRole } = useContext(RoleContext);
    const location = useLocation();
    const toggleRole = () => {
      const newRole = role === "admin" ? "user" : "admin";
      setRole(newRole);
    };
  return (
    <>
      <header className="bg-transparent mx-12 py-2 sticky top-0 bg-white shadow-md z-50">
        <nav
          className=" w-full flex items-center justify-between "
          aria-label="Global"
        >
          <div className="flex items-center md:gap-x-12 gap-x-2 ">
            <Link
              to="/"
              className={`font-bold text-3xl border bottom-2 p-2 rounded-md  ${location.pathname === "/" ? "text-[#66e4dd]" : "text-gray-700" }` }
            >
              Pharmacy
            </Link>
            <Link to="/product" className={` font-semibold text-md ${location.pathname === "/product" ? "text-[#66e4dd]" : "text-gray-700" }` }>
              Product
            </Link>
            {/* <div className="hidden lg:flex lg:gap-x-12"> */}
            <Link to="/cart" className={` font-semibold text-md ${location.pathname === "/cart" ? "text-[#66e4dd]" : "text-gray-700" }` }>
              Cart
            </Link>
            {
              location.pathname === "/product" ?
            <button
              onClick={toggleRole}
              className={`px-4 py-2 rounded-md ${
                role === "admin" ? "bg-[#38B2AC] text-white" : "bg-[#66e4dd] text-gray-600"
              } `}
            >
              {role === "admin" ? "Switch to User" : "Switch to Admin"}
            </button>
            : ''}
            {/* <Link
              to="/uidesign"
              className="text-blue-500 font-semibold text-md"
            >
              Ui Design
            </Link> */}
            {/* </div> */}
          </div>
          <div className="flex  justify-end">
            <Link to="/login" className="text-sm font-semibold text-gray-400">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;

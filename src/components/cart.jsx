import React, { useEffect, useState } from "react";

const Cart = () => {
  const [cartItems, setCartItem] = useState([]);
const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cartItem")) || [];

    const mergedMedicines = Object.values(
      cart.reduce((acc, cur) => {
        if (acc[cur.name]) {
          acc[cur.name].quantity += cur.quantity;
        } else {
          acc[cur.name] = { ...cur };
        }
        return acc;
      }, {})
    );

    const totalAmount =  mergedMedicines.reduce((acc, cur) => {
      return acc  + (Number(cur.Price) * Number(cur.quantity));
    }, 0) 
    setTotalAmount(totalAmount)
    console.log('TA',totalAmount, mergedMedicines);
    setCartItem(mergedMedicines);
  }, []);

  const removeCart = (item) => {
    let categories = JSON.parse(localStorage.getItem("cartItem")) || [];
    categories = categories.filter(ele => ele.name !== item.name);
    setTotalAmount(totalAmount - (item.Price * item.quantity))
    setCartItem(categories)
localStorage.setItem('cartItem', JSON.stringify(categories))

  }

  return (
    <div className="mx-12 mt-4">
      <h1 className="text-2xl text-gray-600 font-bold">Cart Items</h1>
      <div className="grid md:grid-cols-3 grid-cols-2 md:gap-4 gap-2">
        {cartItems.length === 0 ? (
          <p>No List item</p>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={index}
              className=" bg-white border border-gray-200 rounded-lg shadow-sm "
            >
              <h5 className="mb-2 px-2 flex justify-start text-lg font-bold tracking-tight text-gray-600">
                {item.name}
              </h5>
              <p className="text-sm px-2 flex justify-start text-gray-400">
                {item.description}
              </p>
              <p className="text-sm px-2 flex justify-start text-gray-400">
                {item.type}
              </p>
              <p className="text-sm px-2 flex justify-start text-gray-400">
                {item.Price}
              </p>
              <p className="text-sm px-2 flex justify-start text-gray-400">
                {item.expiryDate}
              </p>
              <p className="text-sm px-2 flex justify-start text-gray-400">
                {item.quantity}
              </p>
              <div>
                <button onClick={() => removeCart(item)} className="bg-[#E53E3E] px-6 py-2 m-2 text-white font-semibold rounded-md">
                  Remove from cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-4 p-4 border-t text-right font-semibold text-lg">
  Total: {totalAmount}
</div>
    </div>
  );
};
export default Cart;

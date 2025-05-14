import React, { useEffect, useState , useContext} from "react";
import { useNavigate } from "react-router-dom";
import AddProduct from "./addProduct";
import { RoleContext } from "./contextApi/roleProvider";
const Product = () => {
    const { role } = useContext(RoleContext);
  const navigate = useNavigate();
  const [editMedicine, setEditMedicine] = useState(null);
    const [medicine, setMedicine] = useState(() => {
        const storedMedicine = JSON.parse(localStorage.getItem("medicine"));
        return storedMedicine || [
          {id:1, name: "Panadol", type: "Tablet", Price: "20", description: "This is pain killer for headache", expiryDate: "06/04/2027", totalitem: 80, quantity: 1 },
          {id:2, name: "Basoquin", type: "Tablet", Price: "230", description: "This is pain killer for headache", expiryDate: "06/04/2027", totalitem: 40, quantity: 1 },
          {id:3, name: "Rijex", type: "Tablet", Price: "20", description: "This is pain killer for headache", expiryDate: "06/04/2027", totalitem: 80, quantity: 1 },
          {id:4, name: "Flygal", type: "Tablet", Price: "230", description: "This is for motion", expiryDate: "06/04/2027", totalitem: 10, quantity: 1 },
          {id:5, name: "Decloran", type: "Injection", Price: "20", description: "This is for Fever", expiryDate: "06/04/2027", totalitem: 80, quantity: 1 },
          {id:6, name: "Flygal Inj", type: "Injection", Price: "230", description: "This is for motion", expiryDate: "06/04/2027", totalitem: 50, quantity: 1 },
          {id:7, name: "Ulsanic", type: "Syrup", Price: "20", description: "This is for Stomach", expiryDate: "06/04/2027", totalitem: 24, quantity: 1 },
          {id:8, name: "Trimetabol", type: "Syrup", Price: "210", description: "This is good for stomach and sleep", expiryDate: "06/04/2027", totalitem: 30, quantity: 1 },
        ];
      });

  const [filterMedicine, setFilterMedicine] = useState(medicine);
  const [filter, setFilter] = useState("");

  const addtoCart = (item) => {
    let cartItems = JSON.parse(localStorage.getItem("cartItem")) || [];
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }
    cartItems.push(item);
    localStorage.setItem("cartItem", JSON.stringify(cartItems));
    alert("Item Added to cart");
    const updatedMedicine = filterMedicine.map((med) =>
      med.name === item.name
        ? { ...med, totalitem: med.totalitem - med.quantity, quantity: 1 }
        : med
    );


    setMedicine(updatedMedicine);
    // setFilterMedicine(updatedMedicine);
  
    localStorage.setItem("medicine", JSON.stringify(updatedMedicine));
    navigate('/cart')
  };

 

  useEffect(() => {
    localStorage.setItem("medicine", JSON.stringify(medicine));
 
  
    if (filter === "") {
      setFilterMedicine(medicine);
    } else {
      setFilterMedicine(
        medicine.filter((item) =>
          item.name
            .toLowerCase()
            .trim()
            .split(" ")
            .join("")
            .includes(filter.toLowerCase().trim().split(" ").join(""))
        )
      );
    }
 
  }, [filter, medicine]);

  useEffect(() => {
    if (!medicine || medicine.length === 0) return;
    const today = new Date();
     const expMedicine = medicine.map(med => {
      const expiryDate = new Date(med.expiryDate);
  
      return {
        ...med,
        isExpired: expiryDate <= today
      }
     })
     const isSame = JSON.stringify(medicine) === JSON.stringify(expMedicine);
  if (!isSame) {
    setMedicine(expMedicine);
  }
      console.log('exp',expMedicine)
  }, [medicine])
  const incrementQuantity = (item) => {
    if (item.quantity < item.totalitem) {
      const updateQuantity = filterMedicine.map((elem) =>
        elem.name === item.name
          ? {
              ...elem,
              quantity: elem.quantity + 1,
            }
          : elem
      );
      setFilterMedicine(updateQuantity);
    } else {
      alert("O Total item");
    }
  };

 const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
        const updateQuantity = filterMedicine.map((elem) =>
          elem.name === item.name
            ? {
                ...elem,
                quantity: elem.quantity - 1,
              }
            : elem
        );
        setFilterMedicine(updateQuantity);
      } else {
        alert("You can't do less then 1");
      }
 }

   const onEdit = (item) => {
    console.log('ITEM**', item)
    setEditMedicine(item)
   }
   const onDelete = (item) => {
    // const localMedicine = JSON.parse(localStorage.getItem("medicine"));
    setMedicine(
      medicine.filter((it) => it !== item)
    )
    alert('Item deleted successfully')
   }

  const addNewProduct = (id, name,description ,type, Price, expiryDate, totalitem, quantity ) => {


    const addProduct = {     
        name:name,
        description:description, 
        Price:Price,
        type: type,
        expiryDate:expiryDate,
         totalitem:totalitem,
         quantity:quantity
    }
    console.log('Product',addProduct,id)
    if(editMedicine){
     setMedicine(
      medicine.map(item=> item.id === id ? {...item, name,description ,type, Price, expiryDate, totalitem, quantity} : item)
     ) 
    } else {
      console.log('PRO DATA',addProduct );  
   const productExist =  medicine.find((med) => med.name.toLowerCase() === name.toLowerCase() )   
   if(productExist){
      alert("Product Already exist")
   } else {
       setMedicine([{id,...addProduct},...medicine])  
   }
  }

  }

  return (
    <div className="mx-12 mt-4">
        {role === "admin" ? (
            <AddProduct clearEditMedicine={() => setEditMedicine(null)}  addProduct={addNewProduct} editMedicine={editMedicine} />

        ) : null}
      <h1 className="text-2xl text-gray-600 mt-10 font-bold">List of medicine</h1>
      <div className="flex my-4">
        <p>Filter:</p>
        <input
          className="border bottom-1 w-60 border-gray-200 px-2 py-1 ms-2 rounded-md"
          placeholder="Filter..."
          type="text"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </div>
      <div className="grid md:grid-cols-3 grid-cols-2 md:gap-4 gap-2">
        {filterMedicine.map((item, index) => (
          <div
            key={index}
            className=" bg-white border border-gray-200 rounded-lg shadow-sm "
          >
            <div className="flex justify-between">

            <h5 className="mb-2 px-2 flex justify-start  text-xl font-semibold tracking-tight text-gray-600 ">
              {item.name}
            </h5>
           {role === "admin" && item.isExpired ? (<p className="me-2 text-red-600">Expired</p>) : ''}
            </div>
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
              {item.totalitem}
            </p>
            <div className="flex m-2 items-center">
              <button onClick={() => decreaseQuantity(item)} className="bg-[#E2E8F0] h-12 w-12 rounded-full text-black text-xl font-bold">
                -
              </button>
              <p className="mx-4">{item.quantity}</p>
              <button
                onClick={() => incrementQuantity(item)}
                className="bg-[#E2E8F0] h-12 w-12 rounded-full text-black text-xl font-bold"
              >
                +
              </button>
            </div>
            { role === "user" ? (
            <button
              onClick={() => {
                addtoCart(item);
              }}
              className="bg-[#66e4dd] px-6 py-2 m-2 text-gray-600 font-semibold rounded-md"
            >
              Add to cart
            </button>
            ) :
            <div className="flex ">
            <button
              onClick={() => {
                onEdit(item);
              }}
              className="bg-[#66e4dd] px-6 py-2 m-2 text-gray-600 font-semibold rounded-md"
            >
              Edit 
            </button>
            <button
              onClick={() => {
                onDelete(item);
              }}
              className="bg-red-500 px-6 py-2 m-2 text-white font-semibold rounded-md"
            >
              Delete
            </button>
            </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};
export default Product;

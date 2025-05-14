import React, { useEffect, useState } from "react";

const AddProduct = ({
  addProduct,
  showAddProduct,
  editMedicine,
  clearEditMedicine,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    type: "",
    quantity: 1,
    expDate: "",
    totalItem: 0,
    price: 0,
  });
  const today = new Date().toISOString().split("T")[0];
  const toInputDateFormat = (dateStr) => {
    // If already in ISO (2027-04-06), return it
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;

    // If in DD/MM/YYYY, convert to YYYY-MM-DD
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const [day, month, year] = dateStr.split("/");
      return `${year}-${month}-${day}`;
    }

    return ""; // fallback if invalid format
  };
  useEffect(() => {
    console.log("EEEEE", editMedicine);
    if (editMedicine) {
      setFormData({
        name: editMedicine.name || "",
        desc: editMedicine.description || "",
        type: editMedicine.type || "",
        quantity: editMedicine.quantity || 1,
        expDate: toInputDateFormat(editMedicine.expiryDate),
        totalItem: editMedicine.totalitem || 0,
        price: editMedicine.Price || 0,
      });
      setIsEditing(true);
    }
    // const medicine = JSON.parse(localStorage.getItem("medicine"))
  }, [editMedicine]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitData = (e) => {
    e.preventDefault(); // Prevent page reload
    const medicine = JSON.parse(localStorage.getItem("medicine"));

    console.log("f-data", formData);
    if (
      formData.name &&
      formData.desc &&
      formData.type &&
      formData.price &&
      formData.expDate &&
      formData.totalItem &&
      formData.quantity
    ) {
      if (editMedicine) {
        addProduct(
          editMedicine.id,
          formData.name,
          formData.desc,
          formData.type,
          formData.price,
          formData.expDate,
          formData.totalItem,
          formData.quantity
        );
        editMedicine = "";
        onCancel()
      } else {
        const id = medicine.length + 1;
        console.log("ID", id);
        const exists = medicine.find(
          (item) => item.name.toLowerCase() === formData.name.toLowerCase()
        );
        if (exists) {
          console.log("This name already exists in list");
        } else {
          addProduct(
            id,
            formData.name,
            formData.desc,
            formData.type,
            formData.price,
            formData.expDate,
            formData.totalItem,
            formData.quantity
          );
          onCancel()
        }
      }
      setIsEditing(false);
    } else {
      alert("Enter All Fields Data");
    }  
    clearEditMedicine();
  };

  const onCancel = () => {
    setFormData({
      name: "",
      desc: "",
      type: "",
      quantity: 1,
      expDate: "",
      totalItem: 0,
      price: 0,
    });
    clearEditMedicine();
  };

  return (
    <>
      {/* { showAddProduct && ( */}

      {/* // <div className=' text-2xl font-semibold'>AddProduct</div> */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">
          Add New Product
        </h2>
        <form onSubmit={submitData}>
          <div className="">
            <label className="text-sm/6 flex font-medium text-gray-900">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full me-3 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              placeholder="Name"
            />
          </div>
          <div className=" mt-4">
            <label className="text-sm/6 flex font-medium text-gray-900">
              Description
            </label>

            <input
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 me-5 sm:text-sm/6"
              placeholder="Description..."
              type="text"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
            />
          </div>
          <div className=" mt-4">
            <label className="text-sm/6 flex font-medium text-gray-900">
              Price
            </label>

            <input
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 me-5 sm:text-sm/6"
              placeholder="Price..."
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className=" mt-4">
            <label className="text-sm/6 flex font-medium text-gray-900">
              TotalItem
            </label>

            <input
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 me-5 sm:text-sm/6"
              placeholder="TotalItem..."
              type="number"
              name="totalItem"
              value={formData.totalItem}
              onChange={handleChange}
            />
          </div>
          <div className=" mt-4">
            <label className="text-sm/6 flex font-medium text-gray-900">
              Type
            </label>

            <input
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 me-5 sm:text-sm/6"
              placeholder="Type..."
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
            />
          </div>

          <div className=" mt-4">
            <label className="text-sm/6 flex font-medium text-gray-900">
              Expire Date
            </label>

            <input
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 me-5 sm:text-sm/6"
              placeholder="Expire Date..."
              type="date"
              min={today}
              name="expDate"
              value={formData.expDate}
              onChange={handleChange}
            />
          </div>
          <div className="flex">
            <button
              type="button"
              onClick={(e) => {
                onCancel();
              }}
              className="bg-gray-300 mt-2 px-6 py-2 flex justify-start rounded-md text-black font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#66e4dd] mt-2 ms-2 px-6 py-2 flex justify-start rounded-md text-gray-600 font-semibold"
            >
              {isEditing ? "Edit" : "Add Data"}
            </button>
          </div>
        </form>
      </div>

      {/* )} */}
    </>
  );
};
export default AddProduct;

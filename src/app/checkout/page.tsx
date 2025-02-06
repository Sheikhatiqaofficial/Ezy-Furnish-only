"use client";
import React, { useEffect, useState } from "react";
import { Products } from "../../../types";
import { getCartItems } from "../button/button";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Topnav from "../components/Topnav";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

import { client } from "../../../scripts/sanityClient";

const CheckOut = () => {
  const [cartItems, setCartItems] = useState<Products[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    Phone: "",
    address: "",
    zipCode: "",
    city: "",
  });

  const [formErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    Phone: false,
    address: false,
    zipCode: false,
    city: false,
  });

  useEffect(() => {
    setCartItems(getCartItems());
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  // const validateForm = () => {
  //   const errors = {
  //     firstName: !formValues.firstName,
  //     lastName: !formValues.lastName,
  //     email: !formValues.email.includes("@"),
  //     Phone: !formValues.Phone.match(/^[0-9]{6}$/),
  //     address: !formValues.address,
  //     zipCode: !formValues.zipCode.match(/^[0-9]{6}$/),
  //     city: !formValues.city,
  //   };
  //   setFormErrors(errors);
  //   return Object.values(errors).every((error) => !error);
  // };

  //   const handlePlaceOrder = () => {
  //     if (validateForm()) {
  //       localStorage.removeItem("appliedDiscount");
  //       // Proceed to payment or order confirmation
  //     }
  //   };

  const router = useRouter();

  const handleProceed = async () => {
    Swal.fire({
      title: "Confirm Place Order?",
      text: "Please review your cart before Order",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#FF6B6B",
      cancelButtonColor: "#2A254B",
      confirmButtonText: "Confirm Order",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success", "Your order has been placed successfully!", "success");
        router.push("/products")
        setCartItems([]); // Clear the cart after checkout
      }
    });

    const orderData = {
      _type: 'order',
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      address: formValues.address,
      city: formValues.city,
      zipCode: formValues.zipCode,
      phone: formValues.Phone,
      email: formValues.email,
      cartItems: cartItems.map(item => ({
        _type: 'reference',
        _ref: item._id
      })),
      total: subTotal,
      discount: discount,
      orderDate: new Date
        ().toISOString
    }

try{
  await client.create(orderData)
  localStorage.removeItem("appliedDiscount")
}catch{
  console.log("error creating order, error");
  
}

  };
  return (
    <>
      <Topnav />
      <div className="min-h-screen bg-[#F9F9F9] py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-semibold text-center text-[#2A254B] mb-10">
            Checkout
          </h1>

          {/* Cart Items Summary */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
            <h2 className="text-2xl font-semibold text-[#2A254B] mb-6">
              Your Cart
            </h2>
            <div className="space-y-6">
              {cartItems.map((product) => (
                <div
                  key={product._id}
                  className="flex justify-between items-center py-6 px-4 bg-[#FAFAFA] rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-center gap-6">
                    {product.image && (
                      <Image
                        src={urlFor(product.image).width(109).height(134).url() || '/images/default.jpg'}
                        alt={product.name}
                        width={70}
                        height={70}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    )}
                    <div>
                      <h4 className="text-xl font-medium text-[#2A254B]">
                        {product.name}
                      </h4>
                      <p className="text-sm text-[#4E4D93]">
                        Quantity: {product.quantity}
                      </p>
                      <p className="text-sm text-[#2A254B]">
                        £{(product.price * product.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-6 border-t mt-6">
              <span className="text-lg font-medium text-[#2A254B]">Subtotal</span>
              <span className="text-lg font-semibold text-[#2A254B]">
                £{subTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-4">
              <span className="text-lg font-medium text-[#2A254B]">Discount</span>
              <span className="text-lg font-semibold text-[#2A254B]">
                -£{discount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t mt-6">
              <span className="text-xl font-bold text-[#2A254B]">Total</span>
              <span className="text-xl font-bold text-[#2A254B]">
                £{(subTotal - discount).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Shipping Information Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-[#2A254B] mb-6">
              Shipping Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label
                  htmlFor="firstName"
                  className="text-[#2A254B] text-sm font-medium mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={formValues.firstName}
                  onChange={handleInputChange}
                  className={`border p-4 rounded-lg ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.firstName && (
                  <span className="text-sm text-red-500">First name is required</span>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="lastName"
                  className="text-[#2A254B] text-sm font-medium mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={formValues.lastName}
                  onChange={handleInputChange}
                  className={`border p-4 rounded-lg ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.lastName && (
                  <span className="text-sm text-red-500">Last name is required</span>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-[#2A254B] text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  className={`border p-4 rounded-lg ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.email && (
                  <span className="text-sm text-red-500">Valid email is required</span>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="Phone"
                  className="text-[#2A254B] text-sm font-medium mb-2"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="Phone"
                  value={formValues.Phone}
                  onChange={handleInputChange}
                  className={`border p-4 rounded-lg ${formErrors.Phone ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.Phone && (
                  <span className="text-sm text-red-500">Phone number is invalid</span>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="address"
                  className="text-[#2A254B] text-sm font-medium mb-2"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={formValues.address}
                  onChange={handleInputChange}
                  className={`border p-4 rounded-lg ${formErrors.address ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.address && (
                  <span className="text-sm text-red-500">Address is required</span>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="zipCode"
                  className="text-[#2A254B] text-sm font-medium mb-2"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  value={formValues.zipCode}
                  onChange={handleInputChange}
                  className={`border p-4 rounded-lg ${formErrors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.zipCode && (
                  <span className="text-sm text-red-500">Zip code is invalid</span>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="city"
                  className="text-[#2A254B] text-sm font-medium mb-2"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={formValues.city}
                  onChange={handleInputChange}
                  className={`border p-4 rounded-lg ${formErrors.city ? 'border-red-500' : 'border-gray-300'}`}
                />
                {formErrors.city && (
                  <span className="text-sm text-red-500">City is required</span>
                )}
              </div>
            </div>

            <button
              onClick={handleProceed}
              className="w-full mt-6 bg-[#2A254B] hover:bg-[#4E4D93] text-white py-4 rounded-lg text-lg"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
// "use client";
// import React, { useEffect, useState } from "react";
// import { Product } from "../../../types";
// import { getCartItems } from "../button/button";
// import Image from "next/image";
// import { urlFor } from "@/sanity/lib/image";
// import Topnav from "../components/Topnav";
// import Swal from "sweetalert2";
// import { useRouter } from "next/navigation";
// import { client } from "../../../scripts/sanityClient";
// import stripePromise from "@/lib/stripe";

// const CheckOut = () => {
//   const [cartItems, setCartItems] = useState<Product[]>([]);
//   const [discount, setDiscount] = useState<number>(0);
//   const [formValues, setFormValues] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     Phone: "",
//     address: "",
//     zipCode: "",
//     city: "",
//   });

//   const [formErrors] = useState({
//     firstName: false,
//     lastName: false,
//     email: false,
//     Phone: false,
//     address: false,
//     zipCode: false,
//     city: false,
//   });

//   useEffect(() => {
//     setCartItems(getCartItems());
//     const appliedDiscount = localStorage.getItem("appliedDiscount");
//     if (appliedDiscount) {
//       setDiscount(Number(appliedDiscount));
//     }
//   }, []);

//   const subTotal = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormValues({
//       ...formValues,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const router = useRouter();

//   const handleProceed = async () => {
//     const stripe = await stripePromise;
//     const response = await fetch('/api/create-checkout-session', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ items: cartItems }),
//     });
//     const session = await response.json();
//     const result = await stripe?.redirectToCheckout({ sessionId: session.id });
//     if (result?.error) {
//       alert(result.error.message);
//     }
//   };

//   return (
//     <>
//       <Topnav />
//       <div className="min-h-screen bg-[#F9F9F9] py-12">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-4xl font-semibold text-center text-[#2A254B] mb-10">
//             Checkout
//           </h1>

//           <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
//             <h2 className="text-2xl font-semibold text-[#2A254B] mb-6">
//               Your Cart
//             </h2>
//             <div className="space-y-6">
//               {cartItems.map((product) => (
//                 <div
//                   key={product._id}
//                   className="flex justify-between items-center py-6 px-4 bg-[#FAFAFA] rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200"
//                 >
//                   <div className="flex items-center gap-6">
//                     {product.image && (
//                       <Image
//                         src={urlFor(product.image).width(109).height(134).url() || '/images/default.jpg'}
//                         alt={product.name}
//                         width={70}
//                         height={70}
//                         className="w-20 h-20 object-cover rounded-md"
//                       />
//                     )}
//                     <div>
//                       <h4 className="text-xl font-medium text-[#2A254B]">
//                         {product.name}
//                       </h4>
//                       <p className="text-sm text-[#4E4D93]">
//                         Quantity: {product.quantity}
//                       </p>
//                       <p className="text-sm text-[#2A254B]">
//                         £{(product.price * product.quantity).toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="flex justify-between items-center pt-6 border-t mt-6">
//               <span className="text-lg font-medium text-[#2A254B]">Subtotal</span>
//               <span className="text-lg font-semibold text-[#2A254B]">
//                 £{subTotal.toFixed(2)}
//               </span>
//             </div>
//             <div className="flex justify-between items-center pt-4">
//               <span className="text-lg font-medium text-[#2A254B]">Discount</span>
//               <span className="text-lg font-semibold text-[#2A254B]">
//                 -£{discount.toFixed(2)}
//               </span>
//             </div>
//             <div className="flex justify-between items-center pt-4 border-t mt-6">
//               <span className="text-xl font-bold text-[#2A254B]">Total</span>
//               <span className="text-xl font-bold text-[#2A254B]">
//                 £{(subTotal - discount).toFixed(2)}
//               </span>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-8">
//             <h2 className="text-2xl font-semibold text-[#2A254B] mb-6">
//               Shipping Information
//             </h2>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div className="flex flex-col">
//                 <label
//                   htmlFor="firstName"
//                   className="text-[#2A254B] text-sm font-medium mb-2"
//                 >
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   id="firstName"
//                   value={formValues.firstName}
//                   onChange={handleInputChange}
//                   className={`border p-4 rounded-lg ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {formErrors.firstName && (
//                   <span className="text-sm text-red-500">First name is required</span>
//                 )}
//               </div>

//               <div className="flex flex-col">
//                 <label
//                   htmlFor="lastName"
//                   className="text-[#2A254B] text-sm font-medium mb-2"
//                 >
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   id="lastName"
//                   value={formValues.lastName}
//                   onChange={handleInputChange}
//                   className={`border p-4 rounded-lg ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {formErrors.lastName && (
//                   <span className="text-sm text-red-500">Last name is required</span>
//                 )}
//               </div>

//               <div className="flex flex-col">
//                 <label
//                   htmlFor="email"
//                   className="text-[#2A254B] text-sm font-medium mb-2"
//                 >
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={formValues.email}
//                   onChange={handleInputChange}
//                   className={`border p-4 rounded-lg ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {formErrors.email && (
//                   <span className="text-sm text-red-500">Valid email is required</span>
//                 )}
//               </div>

//               <div className="flex flex-col">
//                 <label
//                   htmlFor="Phone"
//                   className="text-[#2A254B] text-sm font-medium mb-2"
//                 >
//                   Phone
//                 </label>
//                 <input
//                   type="text"
//                   id="Phone"
//                   value={formValues.Phone}
//                   onChange={handleInputChange}
//                   className={`border p-4 rounded-lg ${formErrors.Phone ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {formErrors.Phone && (
//                   <span className="text-sm text-red-500">Phone number is invalid</span>
//                 )}
//               </div>

//               <div className="flex flex-col">
//                 <label
//                   htmlFor="address"
//                   className="text-[#2A254B] text-sm font-medium mb-2"
//                 >
//                   Address
//                 </label>
//                 <input
//                   type="text"
//                   id="address"
//                   value={formValues.address}
//                   onChange={handleInputChange}
//                   className={`border p-4 rounded-lg ${formErrors.address ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {formErrors.address && (
//                   <span className="text-sm text-red-500">Address is required</span>
//                 )}
//               </div>

//               <div className="flex flex-col">
//                 <label
//                   htmlFor="zipCode"
//                   className="text-[#2A254B] text-sm font-medium mb-2"
//                 >
//                   Zip Code
//                 </label>
//                 <input
//                   type="text"
//                   id="zipCode"
//                   value={formValues.zipCode}
//                   onChange={handleInputChange}
//                   className={`border p-4 rounded-lg ${formErrors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {formErrors.zipCode && (
//                   <span className="text-sm text-red-500">Zip code is invalid</span>
//                 )}
//               </div>

//               <div className="flex flex-col">
//                 <label
//                   htmlFor="city"
//                   className="text-[#2A254B] text-sm font-medium mb-2"
//                 >
//                   City
//                 </label>
//                 <input
//                   type="text"
//                   id="city"
//                   value={formValues.city}
//                   onChange={handleInputChange}
//                   className={`border p-4 rounded-lg ${formErrors.city ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {formErrors.city && (
//                   <span className="text-sm text-red-500">City is required</span>
//                 )}
//               </div>
//             </div>

//             <button
//               onClick={handleProceed}
//               className="w-full mt-6 bg-[#2A254B] hover:bg-[#4E4D93] text-white py-4 rounded-lg text-lg"
//             >
//               Place Order
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CheckOut;
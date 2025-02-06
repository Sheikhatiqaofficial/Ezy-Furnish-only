
"use client";
import React, { useEffect, useState } from "react";
import { Products } from "../../../types";
import { getCartItems, removeFromCart, updateCartQuantity } from "../button/button";
import Swal from "sweetalert2";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Topnav from "../components/Topnav";
import { useRouter } from "next/navigation";

const Cartpage = () => {
  const [cartItems, setCartItems] = useState<Products[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Do you want to proceed?",
      text: "Removing this item is permanent!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6B6B",
      cancelButtonColor: "#2A254B",
      confirmButtonText: "Remove",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        setCartItems(getCartItems());
        Swal.fire("Removed Successfully!");
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product) handleQuantityChange(id, product.quantity + 1);
  };

  const handleDecrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product && product.quantity > 1) handleQuantityChange(id, product.quantity - 1);
  };

  const calculatedTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const router = useRouter();

  const handleProceed = () => {
    Swal.fire({
      title: "Proceed To Checkout?",
      text: "Please review your cart before checkout",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#FF6B6B",
      cancelButtonColor: "#2A254B",
      confirmButtonText: "Proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success", "Your order has been successfully processed!", "success");
        router.push("/checkout");
        setCartItems([]); // Clear the cart after checkout
      }
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#2A254B]">Your cart is empty!</h2>
          <button
            onClick={() => router.push("/products")}
            className="mt-4 py-2 px-6 bg-[#2A254B] text-white rounded-lg hover:bg-[#4E4D93] transition duration-300"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Topnav />
      <div className="w-full bg-[#F9F9F9] mt-[20px] py-12">
        {/* Header Section */}
        <div className="px-4 sm:px-0 text-[#2A254B] mb-12 text-center">
          <h1 className="text-[36px] font-normal leading-[50.4px]">Your shopping cart</h1>
        </div>

        {/* Product List */}
        <div className="space-y-20 flex flex-col items-center">
          {cartItems.map((product) => (
            <div
              key={product._id}
              className="flex flex-col sm:flex-row gap-[24px] sm:gap-[32px] justify-center items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-[960px]"
            >
              {/* Product Image */}
              <div className="w-[109px] h-[134px] flex-shrink-0">
                <Image
                  src={product.image ? urlFor(product.image).width(109).height(134).url() : '/images/default.jpg'}
                  alt={product.name}
                  width={109}
                  height={134}
                  className="object-cover"
                />
              </div>

              {/* Product Description and Price */}
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left w-full">
                <h4 className="text-[20px] font-normal text-[#2A254B]">{product.name}</h4>
                <p className="text-[14px] font-normal text-[#2A254B] mt-2">{product.description}</p>
                <p className="text-[16px] font-normal text-[#2A254B] mt-2">£{product.price}</p>
              </div>

              {/* Quantity Stepper */}
              <div className="w-[122px] h-[46px] flex justify-between items-center bg-[#F9F9F9] p-[12px_16px] mt-4 sm:mt-0">
                <span
                  className="text-[16px] font-normal text-[#2A254B] cursor-pointer"
                  onClick={() => handleDecrement(product._id)}
                >
                  -
                </span>
                <span className="text-[16px] font-normal text-[#2A254B]">{product.quantity}</span>
                <span
                  className="text-[16px] font-normal text-[#2A254B] cursor-pointer"
                  onClick={() => handleIncrement(product._id)}
                >
                  +
                </span>
              </div>

              {/* Product Total Price */}
              <div className="text-[16px] font-normal text-[#2A254B] mt-4 sm:mt-0">
                £{(product.price * product.quantity).toFixed(2)}
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(product._id)}
                className="text-[16px] text-[#FF4C4C] font-semibold hover:underline mt-4 sm:mt-0"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Checkout Section */}
        <div className="flex justify-center mt-12 px-4 sm:px-0">
          <div className="w-full sm:w-[392px] flex flex-col gap-[12px]">
            <div className="flex justify-between items-center w-full h-[34px]">
              <h4 className="text-[20px] font-normal text-[#4E4D93]">Subtotal</h4>
              <p className="text-[24px] font-normal text-[#2A254B]">£{calculatedTotal().toFixed(2)}</p>
            </div>
            <p className="text-[14px] font-normal text-[#4E4D93]">Taxes and shipping are calculated at checkout</p>
            <button
              onClick={handleProceed}
              className="w-full md:w-[143px] h-[56px] bg-[#2A254B] text-white text-[16px] font-medium leading-[24px] opacity-1 mt-[20px] md:mt-0 hover:bg-[#F9F9F9] hover:text-[#2A254B] transform hover:scale-105 transition-all duration-300"
            >
              Go to checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cartpage;

// "use client";
// import React, { useEffect, useState } from "react";
// import { Product } from "../../../types";
// import { getCartItems, removeFromCart, updateCartQuantity } from "../button/button";
// import Swal from "sweetalert2";
// import Image from "next/image";
// import { urlFor } from "@/sanity/lib/image";
// import Topnav from "../components/Topnav";
// import { useRouter } from "next/navigation";
// import stripePromise from "@/lib/stripe";

// const Cartpage = () => {
//   const [cartItems, setCartItems] = useState<Product[]>([]);

//   useEffect(() => {
//     setCartItems(getCartItems());
//   }, []);

//   const handleRemove = (id: string) => {
//     Swal.fire({
//       title: "Do you want to proceed?",
//       text: "Removing this item is permanent!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#FF6B6B",
//       cancelButtonColor: "#2A254B",
//       confirmButtonText: "Remove",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         removeFromCart(id);
//         setCartItems(getCartItems());
//         Swal.fire("Removed Successfully!");
//       }
//     });
//   };

//   const handleQuantityChange = (id: string, quantity: number) => {
//     updateCartQuantity(id, quantity);
//     setCartItems(getCartItems());
//   };

//   const handleIncrement = (id: string) => {
//     const product = cartItems.find((item) => item._id === id);
//     if (product) handleQuantityChange(id, product.quantity + 1);
//   };

//   const handleDecrement = (id: string) => {
//     const product = cartItems.find((item) => item._id === id);
//     if (product && product.quantity > 1) handleQuantityChange(id, product.quantity - 1);
//   };

//   const calculatedTotal = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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

//   if (cartItems.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <h2 className="text-xl font-bold text-[#2A254B]">Your cart is empty!</h2>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Topnav />
//       <div className="w-full bg-[#F9F9F9] mt-[20px] py-12">
//         <div className="px-4 sm:px-0 text-[#2A254B] mb-12 text-center">
//           <h1 className="text-[36px] font-normal leading-[50.4px]">
//             Your shopping cart
//           </h1>
//         </div>

//         <div className="space-y-20 flex flex-col items-center">
//           {cartItems.map((product) => (
//             <div
//               key={product._id}
//               className="flex flex-col sm:flex-row gap-[24px] sm:gap-[32px] justify-center items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-[960px]"
//             >
//               <div className="w-[109px] h-[134px] flex-shrink-0">
//                 <Image
//                   src={urlFor(product.image).width(109).height(134).url() || '/images/default.jpg'}
//                   alt={product.name}
//                   width={109}
//                   height={134}
//                   className="object-cover"
//                 />
//               </div>

//               <div className="flex flex-col items-center sm:items-start text-center sm:text-left w-full">
//                 <h4 className="text-[20px] font-normal text-[#2A254B]">{product.name}</h4>
//                 <p className="text-[14px] font-normal text-[#2A254B] mt-2">{product.description}</p>
//                 <p className="text-[16px] font-normal text-[#2A254B] mt-2">£{product.price}</p>
//               </div>

//               <div className="w-[122px] h-[46px] flex justify-between items-center bg-[#F9F9F9] p-[12px_16px] mt-4 sm:mt-0">
//                 <span
//                   className="text-[16px] font-normal text-[#2A254B] cursor-pointer"
//                   onClick={() => handleDecrement(product._id)}
//                 >
//                   -
//                 </span>
//                 <span className="text-[16px] font-normal text-[#2A254B]">{product.quantity}</span>
//                 <span
//                   className="text-[16px] font-normal text-[#2A254B] cursor-pointer"
//                   onClick={() => handleIncrement(product._id)}
//                 >
//                   +
//                 </span>
//               </div>

//               <div className="text-[16px] font-normal text-[#2A254B] mt-4 sm:mt-0">
//                 £{(product.price * product.quantity).toFixed(2)}
//               </div>

//               <button
//                 onClick={() => handleRemove(product._id)}
//                 className="text-[16px] text-[#FF4C4C] font-semibold hover:underline mt-4 sm:mt-0"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-center mt-12 px-4 sm:px-0">
//           <div className="w-full sm:w-[392px] flex flex-col gap-[12px]">
//             <div className="flex justify-between items-center w-full h-[34px]">
//               <h4 className="text-[20px] font-normal text-[#4E4D93]">Subtotal</h4>
//               <p className="text-[24px] font-normal text-[#2A254B]">£{calculatedTotal().toFixed(2)}</p>
//             </div>
//             <p className="text-[14px] font-normal text-[#4E4D93]">
//               Taxes and shipping are calculated at checkout
//             </p>
//             <button
//               onClick={handleProceed}
//               className="w-full sm:w-[172px] h-[56px] bg-[#2A254B] text-[#FFFFFF] text-[16px] font-normal"
//             >
//               Go to checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Cartpage;
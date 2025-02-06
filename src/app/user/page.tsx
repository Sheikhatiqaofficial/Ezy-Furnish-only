// // src/app/user/page.tsx
// "use client";

// import React, { useState, useEffect } from "react";
// import Topnav from "../components/Topnav";

// // Mocked data (replace with API calls or context data)
// const mockUserData = {
//   name: "John Doe",
//   email: "johndoe@example.com",
//   addresses: [
//     { id: 1, street: "123 Main St", city: "New York", postalCode: "10001" },
//     { id: 2, street: "456 Maple Ave", city: "Los Angeles", postalCode: "90001" },
//   ],
//   orders: [
//     { id: 1, date: "2024-01-01", total: 99.99 },
//     { id: 2, date: "2024-02-01", total: 149.99 },
//     { id: 3, date: "2024-03-01", total: 59.99 },
//   ],
// };

// const User = () => {
//   const [user, setUser] = useState(mockUserData); // Replace with actual API data
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedName, setEditedName] = useState(user.name);
//   const [editedEmail, setEditedEmail] = useState(user.email);

//   // Simulating an API call for user data
//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//       // fetchUserData().then(data => setUser(data)); // Replace with real API data
//     }, 1000);
//   }, []);

//   // Handle form submission to save changes
//   const handleSaveChanges = () => {
//     setUser({ ...user, name: editedName, email: editedEmail });
//     setIsEditing(false); // Exit edit mode after saving changes
//   };

//   if (isLoading) {
//     return <div className="text-center text-xl font-semibold">Loading...</div>;
//   }

//   return (
//     <>
//     <Topnav/>
//     <div className="w-full h-auto px-6 md:px-[55px] mt-[65px] mb-[50px] sm:mb-[80px] bg-white">
//       {/* Profile Header */}
//       <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-10 bg-white shadow-md rounded-lg p-6 mb-6">
//         <div className="w-full md:w-[50%] flex flex-col items-start">
//           <h1 className="text-[#2A254B] text-[32px] md:text-[40px] font-bold leading-[48px] mb-4">
//             User Profile
//           </h1>
//           <div className="text-[#2A254B] text-[20px] md:text-[24px] font-medium">
//             {/* Display name and email as text or input fields based on editing state */}
//             {isEditing ? (
//               <>
//                 <div className="mb-4">
//                   <label htmlFor="name" className="text-lg font-medium text-[#2A254B]">
//                     Name:
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     value={editedName}
//                     onChange={(e) => setEditedName(e.target.value)}
//                     className="mt-2 w-full md:w-[400px] p-2 border border-gray-300 rounded-lg"
//                   />
//                 </div>
//                 <div className="mb-4">
//                   <label htmlFor="email" className="text-lg font-medium text-[#2A254B]">
//                     Email:
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     value={editedEmail}
//                     onChange={(e) => setEditedEmail(e.target.value)}
//                     className="mt-2 w-full md:w-[400px] p-2 border border-gray-300 rounded-lg"
//                   />
//                 </div>
//               </>
//             ) : (
//               <>
//                 <p><strong>Name:</strong> {user.name}</p>
//                 <p><strong>Email:</strong> {user.email}</p>
//               </>
//             )}
//           </div>
//         </div>
//         <div className="w-full md:w-[50%]">
//           {isEditing ? (
//             <button
//               onClick={handleSaveChanges}
//               className="w-full md:w-[200px] h-[50px] bg-[#2A254B] text-white text-[16px] font-medium leading-[24px] hover:bg-[#F9F9F9] hover:text-[#2A254B] transform hover:scale-105 transition-all duration-300 mt-4 md:mt-0"
//             >
//               Save Changes
//             </button>
//           ) : (
//             <button
//               onClick={() => setIsEditing(true)}
//               className="w-full md:w-[200px] h-[50px] bg-[#2A254B] text-white text-[16px] font-medium leading-[24px] hover:bg-[#F9F9F9] hover:text-[#2A254B] transform hover:scale-105 transition-all duration-300 mt-4 md:mt-0"
//             >
//               Edit Profile
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Saved Addresses Section */}
//       <div className="mt-10">
//         <h2 className="text-[28px] md:text-[32px] text-[#2A254B] font-bold mb-6">Saved Addresses</h2>
//         <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//           {user.addresses.length > 0 ? (
//             <ul className="space-y-4">
//               {user.addresses.map((address) => (
//                 <li key={address.id} className="text-lg text-gray-600">
//                   {address.street}, {address.city}, {address.postalCode}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-lg text-gray-600">No saved addresses found.</p>
//           )}
//         </div>
//       </div>

//       {/* Order History Section */}
//       <div className="mt-10">
//         <h2 className="text-[28px] md:text-[32px] text-[#2A254B] font-bold mb-6">Order History</h2>
//         <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//           {user.orders.length > 0 ? (
//             <ul className="space-y-4">
//               {user.orders.map((order) => (
//                 <li key={order.id} className="text-lg text-gray-600">
//                   <a
//                     href={`/order/${order.id}`}
//                     className="text-[#2A254B] hover:text-blue-800 font-medium leading-[24px] transform hover:scale-105 transition-all duration-300"
//                   >
//                     Order #{order.id} - {order.date} - £{order.total}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-lg text-gray-600">No order history found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default User;
"use client";

import React, { useState, useEffect } from "react";
import Topnav from "../components/Topnav";
import Image from "next/image";
// Mocked data (replace with API calls or context data)
const mockUserData = {
  name: "John Doe",
  email: "johndoe@example.com",
  profilePicture: "/default-avatar.png", // Add a default profile picture
  addresses: [
    { id: 1, street: "123 Main St", city: "New York", postalCode: "10001" },
    { id: 2, street: "456 Maple Ave", city: "Los Angeles", postalCode: "90001" },
  ],
  orders: [
    { id: 1, date: "2024-01-01", total: 99.99, items: ["Item 1", "Item 2"] },
    { id: 2, date: "2024-02-01", total: 149.99, items: ["Item 3", "Item 4"] },
    { id: 3, date: "2024-03-01", total: 59.99, items: ["Item 5", "Item 6"] },
  ],
};

const User = () => {
  const [user, setUser] = useState(mockUserData);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [newAddress, setNewAddress] = useState({ street: "", city: "", postalCode: "" });
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState<number | null>(null); // Fixed the type here

  // Simulating an API call for user data
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleSaveChanges = () => {
    setUser({ ...user, name: editedName, email: editedEmail });
    setIsEditing(false);
  };

  const handleAddAddress = () => {
    if (!newAddress.street || !newAddress.city || !newAddress.postalCode) {
      alert("Please fill out all fields.");
      return;
    }
    setUser({
      ...user,
      addresses: [...user.addresses, { ...newAddress, id: user.addresses.length + 1 }],
    });
    setShowAddAddressModal(false);
    setNewAddress({ street: "", city: "", postalCode: "" }); // Reset new address fields
  };

  const handleDeleteAddress = (addressId: number) => {  // Explicitly typed the addressId as number
    setUser({
      ...user,
      addresses: user.addresses.filter((address) => address.id !== addressId),
    });
  };

  const handleCloseOrderDetailsModal = () => setShowOrderDetailsModal(null);

  if (isLoading) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  return (
    <>
      <Topnav />
      <div className="w-full h-auto px-6 md:px-[55px] mt-[65px] mb-[50px] sm:mb-[80px] bg-white">
        {/* Profile Header */}
        <div className="bg-white shadow-xl rounded-lg p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-[50%] flex flex-col items-start">
              <div className="relative">
                <Image
                  src={"/images.png"}
                  alt="Profile"
                  width={50}
                  height={50}
                  className="w-32 h-32 rounded-full border-4 border-[#2A254B] mb-4 object-cover"
                ></Image>
                <button
                  className="absolute bottom-0 right-0 bg-[#2A254B] text-white p-2 rounded-full"
                  onClick={() => alert("Profile picture upload feature coming soon!")}
                >
                  <i className="fa fa-camera"></i> {/* Icon for upload */}
                </button>
              </div>
              <h1 className="text-3xl font-bold text-[#2A254B] mb-4">User Profile</h1>
              <div className="text-xl font-medium text-[#2A254B]">
                {isEditing ? (
                  <>
                    <div className="mb-6">
                      <label htmlFor="name" className="block text-lg text-gray-700">Name:</label>
                      <input
                        type="text"
                        id="name"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="mt-2 w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#2A254B] focus:outline-none"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="email" className="block text-lg text-gray-700">Email:</label>
                      <input
                        type="email"
                        id="email"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                        className="mt-2 w-full p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#2A254B] focus:outline-none"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mb-2"><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                  </>
                )}
              </div>
            </div>

            <div className="w-full md:w-[50%] flex flex-col items-start justify-center">
              {isEditing ? (
                <button
                  onClick={handleSaveChanges}
                  className="w-full md:w-[200px] py-3 text-white bg-[#2A254B] hover:bg-[#3E3077] transition-all duration-300 transform hover:scale-105 rounded-md shadow-md mt-4"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full md:w-[200px] py-3 text-white bg-[#2A254B] hover:bg-[#3E3077] transition-all duration-300 transform hover:scale-105 rounded-md shadow-md mt-4"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Saved Addresses Section */}
        <div className="bg-white shadow-xl rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#2A254B] mb-6">Saved Addresses</h2>
          <ul className="space-y-6">
            {user.addresses.map((address) => (
              <li key={address.id} className="flex justify-between items-center text-lg text-gray-600">
                <span>
                  {address.street}, {address.city}, {address.postalCode}
                </span>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowAddAddressModal(true)}
            className="w-full py-3 mt-6 text-white bg-[#2A254B] hover:bg-[#3E3077] transition-all duration-300 transform hover:scale-105 rounded-md shadow-md"
          >
            Add New Address
          </button>
        </div>

        {/* Order History Section */}
        <div className="bg-white shadow-xl rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-[#2A254B] mb-6">Order History</h2>
          <ul className="space-y-6">
            {user.orders.map((order) => (
              <li key={order.id} className="text-lg text-gray-600">
                <button
                  onClick={() => setShowOrderDetailsModal(order.id)}
                  className="text-[#2A254B] hover:text-blue-800 font-medium transform hover:scale-105 transition-all duration-300"
                >
                  Order #{order.id} - {order.date} - £{order.total}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Modals */}
        {showAddAddressModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96">
              <h3 className="text-xl font-bold mb-6">Add New Address</h3>
              <input
                type="text"
                value={newAddress.street}
                onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                placeholder="Street"
                className="w-full p-3 border-2 border-gray-300 rounded-md mb-4"
              />
              <input
                type="text"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                placeholder="City"
                className="w-full p-3 border-2 border-gray-300 rounded-md mb-4"
              />
              <input
                type="text"
                value={newAddress.postalCode}
                onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                placeholder="Postal Code"
                className="w-full p-3 border-2 border-gray-300 rounded-md mb-4"
              />
              <div className="flex justify-between">
                <button
                  onClick={handleAddAddress}
                  className="py-2 px-6 bg-[#2A254B] text-white rounded-md"
                >
                  Add Address
                </button>
                <button
                  onClick={() => setShowAddAddressModal(false)}
                  className="py-2 px-6 bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showOrderDetailsModal !== null && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-96">
              <h3 className="text-xl font-bold mb-6">Order Details</h3>
              {user.orders
                .filter((order) => order.id === showOrderDetailsModal)
                .map((order) => (
                  <div key={order.id}>
                    <p><strong>Date:</strong> {order.date}</p>
                    <p><strong>Total:</strong> £{order.total}</p>
                    <p><strong>Items:</strong></p>
                    <ul className="list-disc pl-5">
                      {order.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              <div className="mt-6 text-right">
                <button
                  onClick={handleCloseOrderDetailsModal}
                  className="py-2 px-6 bg-[#2A254B] text-white rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default User;

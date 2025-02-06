
"use client"
import React, { useState } from "react";

const Signup = () => {
  // Step 1: State to hold the email value
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // To show any error messages
  const [success, setSuccess] = useState(false); // To show success message

  // Step 2: Handle the email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(""); // Clear error message when user starts typing
  };

  // Step 3: Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      setError("Please enter an email address.");
      return;
    } else if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Step 4: Simulate API call or action (e.g., sending the email to a backend)
    setTimeout(() => {
      // Simulate successful signup
      setSuccess(true);
      setEmail(""); // Reset the email field after successful submission
    }, 1000);
  };

  return (
    <div className="w-full h-auto p-6 md:p-16 opacity-1 bg-[#F9F9F9] mb-[50px] mt-[50px]">
      {/* Inner Container */}
      <div className="max-w-screen-xl mx-auto h-auto mt-4 p-6 md:p-16 opacity-1 bg-white">
        {/* Heading and Paragraph Section */}
        <div className="w-full h-auto mt-4 ml-0 gap-4 opacity-1">
          {/* Heading */}
          <h1 className="w-full text-2xl sm:text-3xl md:text-4xl text-center text-[#2A254B] font-medium">
            Join the club and get the benefits
          </h1>
          {/* Paragraph */}
          <p className="w-full text-base sm:text-lg md:text-xl text-center text-[#2A254B] mt-4">
            Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop-up stores, and more.
          </p>
        </div>

        <div className="relative flex flex-col items-center justify-center px-4 py-6 md:px-16 md:py-14 h-auto bg-white opacity-1">
          {/* Email Input Section (Row with Input and Button) */}
          <div className="flex items-center justify-center mt-6 w-full max-w-xl h-auto opacity-1">
            {/* Email Input Field */}
            <div className="flex items-center justify-start w-full sm:w-3/4 md:w-3/4 bg-[#F9F9F9] px-4 sm:px-6 py-4 opacity-1">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={handleEmailChange} // Handle input changes
                className="w-full text-[#2A254B] text-lg font-normal bg-[#F9F9F9] focus:outline-none"
              />
            </div>

            {/* Sign Up Button */}
            <button
              onClick={handleSubmit} // Handle form submission
              className="w-[118px] h-[56px] bg-[#2A254B] text-white font-medium text-lg flex items-center justify-center"
            >
              Sign up
            </button>
          </div>

          {/* Step 5: Display error or success message */}
          {error && (
            <p className="text-red-500 text-center mt-4">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-center mt-4">Thank you for signing up!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;

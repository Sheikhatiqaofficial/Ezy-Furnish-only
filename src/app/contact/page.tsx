
'use client';
import React, { useState } from "react";
import Topnav from "../components/Topnav";

const Contact = () => {
  const [formStatus, setFormStatus] = useState<string>("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const formDataObj = Object.fromEntries(formData.entries());

    try {
      // Send the form data to Formspree
      const res = await fetch('https://formspree.io/f/mnnjpjpb', {  // Replace with your Formspree URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataObj),
      });

      if (res.ok) {
        setFormStatus("Thank you for your message!");
        form.reset();
      } else {
        setFormStatus("Something went wrong, please try again.");
      }
    } catch {
      setFormStatus("Something went wrong, please try again.");
    }
  };

  return (
    <>
      <Topnav />
      <div className="w-full bg-gradient-to-r from-teal-400 via-pink-500 to-orange-400 text-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto text-center sm:text-left">
          <h3 className="text-4xl font-semibold leading-tight text-white">
            Get In Touch With Us
          </h3>
          <p className="mt-4 text-lg sm:max-w-2xl mx-auto text-white opacity-80">
            We are here to assist you. Whether it is a question or feedback, feel free to reach out!
          </p>
        </div>

        <form
          name="contact"
          method="POST"
          action="https://formspree.io/f/mwkaznqp"  // Formspree URL
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto mt-8 px-4 py-8 bg-white rounded-xl shadow-2xl space-y-6"
        >
          {/* Hidden Input for Formspree */}
          <input type="hidden" name="_next" value="https://yourdomain.com/thank-you" />
          <input type="hidden" name="_subject" value="New contact form submission" />
          
          <div>
            <label className="text-xl font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border-2 border-gray-300 rounded-md p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition duration-300 text-black"
            />
          </div>

          <div>
            <label className="text-xl font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border-2 border-gray-300 rounded-md p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition duration-300"
            />
          </div>

          <div>
            <label className="text-xl font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full text-black border-2 border-gray-300 rounded-md p-3 mt-2 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white font-medium rounded-md bg-gradient-to-r from-teal-500 to-pink-500 hover:from-teal-600 hover:to-pink-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Submit
          </button>

          {formStatus && (
            <p
              className={`text-center mt-4 font-semibold ${
                formStatus.includes("Thank you") ? "text-green-600" : "text-red-500"
              }`}
            >
              {formStatus}
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default Contact;

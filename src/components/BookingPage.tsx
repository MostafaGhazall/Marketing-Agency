import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    country: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Send data to Formspree
    const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        navigate("/"); // Redirect to home after submission
      }, 2000);
    }
  };

  return (
    <section
      className="
      relative min-h-screen flex items-center
      bg-no-repeat bg-cover bg-right
      bg-[url('/home-mobile.png')] md:bg-[url('/home.png')]
      md:bg-[center_75%] lg:bg-[center_right]
    text-white px-6 md:px-20 py-16"
      >
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Side - Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
          <h2 className="text-3xl font-bold text-accent mb-4">Book a Call</h2>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-accent font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input-field"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-accent font-semibold">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="number"
                  className="input-field"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-accent font-semibold">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  className="input-field"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-accent font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input-field"
                  required
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:text-accent transition duration-300"
              >
                Submit
              </button>
            </form>
          ) : (
            <p className="text-secondary text-lg font-semibold text-center">
              Thank you! We'll get in touch soon.
            </p>
          )}
        </div>

        {/* Right Side - Empty Space for Image Background */}
        <div className="hidden md:block w-[50%]"></div>
      </div>
    </section>
  );
};

export default BookingPage;

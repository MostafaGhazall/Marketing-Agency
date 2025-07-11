import React, { useState } from "react";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const ContactUs: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const response = await fetch("https://formspree.io/f/xdkazyyk", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section id="contact-us" className="bg-primary py-16 px-6 md:px-20">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-accent">
          Let's Connect & Build Something Great!
        </h2>
        <p className="text-lg text-accent/80 mt-3">
          Whether you have a project in mind, need a consultation, or just want
          to say hello, we're here to help. Reach out to us today and let’s
          create something impactful together.
        </p>
      </div>

      {/* Contact Section (Two-Column Layout) */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-32">
        {/* Contact Details Section (Left Side) */}
        <div className="flex flex-col items-start">
          {/* Logo */}
          <img src="/logo22.png" alt="FLAIR Logo" className="h-24 mb-6" />

          {/* Contact Info */}
          <h3 className="text-2xl font-semibold text-accent mb-4">
            Contact Us
          </h3>
          <p className="text-lg text-accent/80">
            <strong>Address:</strong> Bld. 21, St.14, Maadi, Cairo, Egypt
          </p>
          <p className="text-lg text-accent/80">
            <strong>TEL:</strong>{" "}
            <a href="tel:+201234567891" className="hover:text-accent">
              +2 01234567891
            </a>
          </p>
          <p className="text-lg text-accent/80">
            <strong>Mail:</strong>{" "}
            <a href="mailto:info@flair.co" className="hover:text-accent">
              info@flair.co
            </a>
          </p>

          {/* Social Media Icons */}
          <div className="mt-6 flex gap-4">
            <a
              href="#"
              className="p-2 bg-secondary text-white rounded-full hover:bg-accent transition"
            >
              <Facebook size={24} />
            </a>
            <a
              href="#"
              className="p-2 bg-secondary text-white rounded-full hover:bg-accent transition"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="#"
              className="p-2 bg-secondary text-white rounded-full hover:bg-accent transition"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              className="p-2 bg-secondary text-white rounded-full hover:bg-accent transition"
            >
              <Youtube size={24} />
            </a>
          </div>
        </div>

        {/* Contact Form (Right Side) */}
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
          <h3 className="text-2xl font-semibold text-accent">Send a Message</h3>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {/* Honeypot Field (Invisible to Users, Catches Bots) */}
              <input type="text" name="_gotcha" style={{ display: "none" }} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-accent font-semibold mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-accent font-semibold mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="input-field"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-accent font-semibold mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-accent font-semibold mb-1">
                    Subject
                  </label>
                  <input type="text" name="subject" className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-accent font-semibold mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  className="input-field resize-none"
                  rows={4}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-secondary text-white py-3 rounded-lg font-semibold transition duration-300 hover:text-accent"
              >
                Let's Talk
              </button>
            </form>
          ) : (
            <p className="text-secondary text-lg font-semibold text-center py-5">
              Thank you! We'll get in touch soon.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

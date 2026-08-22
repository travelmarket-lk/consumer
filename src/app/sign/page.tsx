"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion, Variants } from "framer-motion";
import "../../styles/Register.css";

interface FormDataState {
  name: string;
  idNumber: string;
  contact: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  terms: boolean;
}

interface FormErrorsState {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  terms?: string;
}

// Framer Motion Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const leftContentVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.7, delay: 0.2, ease: "easeOut" } 
  }
};

const formVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, delay: 0.3, ease: "easeOut" } 
  }
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    idNumber: "",
    contact: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState<FormErrorsState>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrorsState = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must contain at least 8 characters";
    }

    if (!formData.terms) {
      newErrors.terms = "Please accept the Terms & Policy";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form Data:", formData);
      alert("Registration form completed successfully!");
    }
  };

  return (
    <main className="register-page">
      <motion.section 
        className="register-card"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* LEFT SIDE WITH FADE ANIMATION */}
        <div className="register-left">
          <motion.div 
            className="left-content"
            variants={leftContentVariants}
          >
            <motion.div 
              className="brand-icon"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 21h16" />
                <path d="M6 21V5l6-2 6 2v16" />
                <path d="M9 8h1" />
                <path d="M14 8h1" />
                <path d="M9 12h1" />
                <path d="M14 12h1" />
                <path d="M10 21v-5h4v5" />
              </svg>
            </motion.div>

            <div className="welcome-text">
              <span className="small-title">WELCOME TO YOUR NEXT STAY</span>
              <h2>
                Stay Comfortably,
                <br />
                <span>Book Effortlessly.</span>
              </h2>
              <p>Create your account and discover a better way to plan your perfect stay.</p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE FORM WITH SLIDE ANIMATION */}
        <motion.div 
          className="register-right"
          variants={formVariants}
        >
          <div className="form-header">
            <span>GET STARTED</span>
            <h1>Create Your Account</h1>
            <p>Enter your details below to create your account.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* FULL NAME */}
            <div className="form-group">
              <label htmlFor="name">
                Full Name <b>*</b>
              </label>

              <div className={`input-wrapper ${errors.name ? "input-error" : ""}`}>
                <span className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </span>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            {/* ID + CONTACT */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="idNumber">ID Number</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <circle cx="8" cy="11" r="2" />
                      <path d="M6 16c.7-1.5 3.3-1.5 4 0" />
                      <path d="M13 10h5" />
                      <path d="M13 14h5" />
                    </svg>
                  </span>
                  <input
                    id="idNumber"
                    name="idNumber"
                    type="text"
                    value={formData.idNumber}
                    onChange={handleChange}
                    placeholder="Enter your ID"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact">Contact Number</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <path d="M5 4h4l2 5-3 2c1.5 3 3.5 5 6.5 6.5l2-3 4.5 2V20c0 1-1 2-2 2C10 21 3 14 3 6c0-1 1-2 2-2Z" />
                    </svg>
                  </span>
                  <input
                    id="contact"
                    name="contact"
                    type="tel"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Enter your number"
                  />
                </div>
              </div>
            </div>

            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="email">
                Email Address <b>*</b>
              </label>

              <div className={`input-wrapper ${errors.email ? "input-error" : ""}`}>
                <span className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </span>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                />
              </div>

              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            {/* ADDRESS */}
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                />
              </div>
            </div>

            {/* PHONE */}
            <div className="form-group">
              <label htmlFor="phone">
                Phone Number <b>*</b>
              </label>

              <div className={`input-wrapper ${errors.phone ? "input-error" : ""}`}>
                <span className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="7" y="2" width="10" height="20" rx="2" />
                    <path d="M10 5h4" />
                    <circle cx="12" cy="18" r=".8" />
                  </svg>
                </span>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>

              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            {/* PASSWORD */}
            <div className="form-group">
              <label htmlFor="password">
                Password <b>*</b>
              </label>

              <div className={`input-wrapper password-wrapper ${errors.password ? "input-error" : ""}`}>
                <span className="input-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <rect x="4" y="10" width="16" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                </span>

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label="Show or hide password"
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                      <path d="M9.8 4.2A10 10 0 0 1 12 4c6 0 9 8 9 8a14 14 0 0 1-2.1 3.2" />
                      <path d="M6.2 6.2C4 7.7 3 12 3 12s3 8 9 8a10 10 0 0 0 4-.8" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {/* BOTTOM */}
            <div className="register-bottom">
              <div>
                <label className="terms">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                  />
                  <span className="custom-checkbox">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  </span>
                  <span>
                    I agree to the <a href="#">Terms & Policy</a>
                  </span>
                </label>

                {errors.terms && <span className="error-message terms-error">{errors.terms}</span>}
              </div>

              <motion.button 
                type="submit" 
                className="create-button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Create Account
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </motion.button>
            </div>

            <p className="login-text">
              Already have an account?
              <a href="#"> Sign in</a>
            </p>
          </form>
        </motion.div>
      </motion.section>
    </main>
  );
}
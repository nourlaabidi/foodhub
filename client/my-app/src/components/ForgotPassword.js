import React, { useState } from "react";
import "../styles/ForgotPassword.css";
import { toast, ToastContainer } from "react-toastify";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/auth/forgotpassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        toast.success("Password Updated successfully");

        setTimeout(() => {
          window.location.href = "/login";
        }, 4000);
      } else {
        setMessage("An error occurred while updating the password.");
        toast.error("Error in Password update");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while updating the password.");
    }
  };

  return (
   <body>
    <div className="update-password-container">
      <h2>Modifier mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>nouveau mot de passe:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">modifier mot de passe</button>
      </form>
      {message && <p className="error-message">{message}</p>}
      <ToastContainer />
    </div>
    </body> 
  );
};

export default UpdatePassword;

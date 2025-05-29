import React, { useState } from "react";
import AdminForm from "../components/AdminForm";

const Admin = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("");

  const checkPassword = () => {
    if (password === "admin123") {
      setIsVerified(true);
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
    {!isVerified ? (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded shadow max-w-sm w-full">
          <h2 className="text-xl text-black font-bold mb-4 text-center">🔒 Admin Login</h2>
          <input
            type="password"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-black p-2 border rounded mb-4"
          />
          <button
            onClick={checkPassword}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Login
          </button>
        </div>
      </div>
    ) : (
      <div className="flex justify-center items-center min-h-screen">
        <AdminForm />
      </div>
    )}
  </div>
  );
};

export default Admin;

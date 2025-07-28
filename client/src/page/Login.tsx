import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(email, password);
      auth.login(data.token);
      navigate("/tasks");
      toast.error("登入成功");
    } catch (err: any) {
      toast.error("登入失敗");
      setError(err.response?.data?.message || "登入失敗");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-30 p-6 border rounded shadow">
      <h2 className="text-2xl mb-4">登入</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          Email
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full"
            required
          />
        </label>
        <label className="block">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border mb-4"
            autoComplete="new-password"
            required
          />
        </label>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-800 cursor-pointer"
        >
          登入
        </button>
      </form>
    </div>
  );
};

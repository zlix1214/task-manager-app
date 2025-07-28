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
      toast.success("登入成功");
    } catch (err: any) {
      toast.error("登入失敗");
      setError(err.response?.data?.message || "登入失敗");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="max-w-lg mx-auto mt-30 p-6 shadow">
      {/* <RainbowBackground /> */}
      <h2 className="text-2xl mb-4">登入</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-4">
          Email
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-white/80 backdrop-blur-sm border border-gray-200/50  text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-200 shadow-sm hover:shadow-md"
            required
          />
        </label>
        <label className="block">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 bg-white/80 backdrop-blur-sm border border-gray-200/50  text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-200 shadow-sm hover:shadow-md"
            autoComplete="new-password"
            required
          />
        </label>

        <p
          className="mb-2 text-sm text-gray-600 cursor-pointer"
          onClick={handleRegister}
        >
          沒有帳號? 立即註冊
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full appearance-none bg-white/80 backdrop-blur-sm border border-gray-200/50 px-4 py-3 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
        >
          登入
        </button>
      </form>
    </div>
  );
};

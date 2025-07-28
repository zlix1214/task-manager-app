import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import { toast } from "react-toastify";

export const Register: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await register(userName, email, password);
      navigate("/login");
      toast.success("註冊成功");
    } catch (err: any) {
      toast.error("註冊失敗");
      setError(err.response?.data?.message || "註冊失敗");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6  shadow">
      <h2 className="text-2xl mb-4">註冊</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          UserName
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-2 bg-white/80 backdrop-blur-sm border border-gray-200/50  text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-200 shadow-sm hover:shadow-md"
            required
          />
        </label>
        <label className="block mb-2">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 bg-white/80 backdrop-blur-sm border border-gray-200/50  text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-200 shadow-sm hover:shadow-md"
            required
          />
        </label>
        <label className="block mb-4">
          密碼
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-white/80 backdrop-blur-sm border border-gray-200/50  text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-200 shadow-sm hover:shadow-md "
            required
          />
        </label>
        <p
          className="mb-2 text-sm text-gray-600 cursor-pointer"
          onClick={handleLogin}
        >
          已經有帳號了? 立即登入
        </p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full appearance-none bg-white/80 backdrop-blur-sm border border-gray-200/50 px-4 py-3 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400/50 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
        >
          註冊
        </button>
      </form>
    </div>
  );
};

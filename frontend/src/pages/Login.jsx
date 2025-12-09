import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../lib/api";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      toast.success("Login successful");
      window.location.href = "/admin/dashboard";
    },
    onError: () => {
      toast.error("Login failed");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">Admin Login</h2>
          <p className="text-center text-gray-600 mb-8">Sign in to access dashboard</p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-200"
              disabled={loginMutation.isLoading}
            >
              {loginMutation.isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={() => window.location.href = "/"}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

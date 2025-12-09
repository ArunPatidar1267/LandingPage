import { useQuery } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";

import { axiosInstance } from "./lib/axios";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const { data: isLoggedIn, isLoading } = useQuery({
    queryKey: ["isLoggedIn"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
    },
    retry: false,
  });  

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/admin/login"
          element={isLoggedIn ? <Navigate to="/admin/dashboard" replace /> : <Login />}
        />
        <Route path="/admin/dashboard" element={isLoggedIn ? <AdminDashboard /> : <Navigate to="/admin/login" replace />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

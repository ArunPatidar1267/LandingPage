import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../../lib/api";
import toast from "react-hot-toast";

const AdminNavbar = ({ activeTab, setActiveTab }) => {
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem("token");
      toast.success("Logged out");
      window.location.href = "/admin/login";
    }
  });

  return (
    <nav className="bg-white shadow-md mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <span 
            onClick={() => window.location.href="/"} 
            className="text-xl font-bold text-blue-600 cursor-pointer"
          >
            Admin Dashboard
          </span>
          
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setActiveTab("projects")} 
              className={`font-medium transition duration-200 ${activeTab === "projects" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700 hover:text-blue-600"}`}
            >
              Projects
            </button>
            <button 
              onClick={() => setActiveTab("clients")} 
              className={`font-medium transition duration-200 ${activeTab === "clients" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700 hover:text-blue-600"}`}
            >
              Clients
            </button>
            <button 
              onClick={() => setActiveTab("users")} 
              className={`font-medium transition duration-200 ${activeTab === "users" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700 hover:text-blue-600"}`}
            >
              User Contact
            </button>
            <button 
              onClick={() => setActiveTab("subscribers")} 
              className={`font-medium transition duration-200 ${activeTab === "subscribers" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700 hover:text-blue-600"}`}
            >
              Subscribers
            </button>
            <button 
              onClick={() => logoutMutation.mutate()} 
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;

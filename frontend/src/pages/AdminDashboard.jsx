import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProjects, fetchClients, fetchUsers, fetchSubscribers, addProject, addClient } from "../lib/api";
import AdminNavbar from "../components/Admin/AdminNav";
import toast from "react-hot-toast";
import { BASE_URL } from "../lib/axios";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const queryClient = useQueryClient();

  const { data: projects } = useQuery({ queryKey: ["projects"], queryFn: fetchProjects });
  const { data: clients } = useQuery({ queryKey: ["clients"], queryFn: fetchClients });
  const { data: users } = useQuery({ queryKey: ["users"], queryFn: fetchUsers });
  const { data: subscribers } = useQuery({ queryKey: ["subscribers"], queryFn: fetchSubscribers });

  const addProjectMutation = useMutation({
    mutationFn: addProject,
    onSuccess: () => {
      toast.success("Project added");
      queryClient.invalidateQueries(["projects"]);
    }
  });

  const addClientMutation = useMutation({
    mutationFn: addClient,
    onSuccess: () => {
      toast.success("Client added");
      queryClient.invalidateQueries(["clients"]);
    }
  });

  const handleAddProject = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    addProjectMutation.mutate(formData);
    e.target.reset();
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    addClientMutation.mutate(formData);
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "projects" && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Project</h2>
              <form onSubmit={handleAddProject} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Project Name</label>
                  <input name="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Description</label>
                  <textarea name="description" rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Image</label>
                  <input type="file" name="image" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 font-medium">
                  Add Project
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">All Projects</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects?.map((p) => (
                  <div key={p.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                    {p.image && <div className="w-48 h-48 mx-auto mb-4 rounded-half mt-4 overflow-hidden shadow-md">
                      <img
                        src={`${BASE_URL}/${p.image}`}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    }
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{p.name}</h3>
                      <p className="text-gray-600 text-sm line-clamp-3">{p.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "clients" && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Client</h2>
              <form onSubmit={handleAddClient} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Client Name</label>
                  <input name="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Designation</label>
                  <input name="designation" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Image</label>
                  <input type="file" name="image" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 font-medium">
                  Add Client
                </button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">All Clients</h2>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {clients?.map((c) => (
                  <div key={c.id} className="text-center p-4 border border-gray-200 rounded-lg hover:shadow-lg transition">
                    {c.image && <img src={`${BASE_URL}/${c.image}`} alt={c.name} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-blue-100" />}
                    <h3 className="font-bold text-gray-900">{c.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{c.designation}</p>
                    <p className="text-sm text-gray-600 line-clamp-5">{c.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">User Contact Forms</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Mobile</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">City</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((u) => (
                    <tr key={u.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3">{u.name}</td>
                      <td className="px-4 py-3">{u.email}</td>
                      <td className="px-4 py-3">{u.mobile}</td>
                      <td className="px-4 py-3">{u.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "subscribers" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Newsletter Subscribers</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Subscribed</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers?.map((s) => (
                    <tr key={s.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3">{s.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-sm ${s.isSubscribed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {s.isSubscribed ? "Yes" : "No"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

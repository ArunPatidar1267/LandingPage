import { axiosInstance } from "./axios";

export const fetchClients = async () => {
  const res = await axiosInstance.get("/admin/clients");
  return res.data;
};

export const addClient = async (formData) => {
  const res = await axiosInstance.post("/admin/client", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
};

export const fetchProjects = async () => {
  const res = await axiosInstance.get("/admin/projects");
  return res.data;
};

export const addProject = async (formData) => {
  const res = await axiosInstance.post("/admin/project", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
  return res.data;
};

export const fetchSubscribers = async () => {
  const res = await axiosInstance.get("/admin/subscribers");
  return res.data;
};

export const fetchUsers = async () => {
  const res = await axiosInstance.get("/admin/form/user");
  return res.data;
};

export const submitContactForm = async (data) => {
  const res = await axiosInstance.post("/user/form/user", data);
  return res.data;
};

export const subscribeNewsletter = async (email) => {
  const res = await axiosInstance.post("/user/subscriber", { email });
  return res.data;
};

export const loginUser = async (credentials) => {
  const res = await axiosInstance.post("/auth/login", credentials);
  return res.data;
};

export const logoutUser = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

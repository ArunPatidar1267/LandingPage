import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { submitContactForm } from "../../lib/api";
import toast from "react-hot-toast";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", city: "" });

  const contactMutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      toast.success("Form submitted successfully");
      setForm({ name: "", email: "", mobile: "", city: "" });
    },
    onError: () => {
      toast.error("Failed to submit form");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    contactMutation.mutate(form);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Get in touch with us for your next project</p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Mobile Number</label>
            <input
              type="tel"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">City</label>
            <input
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition duration-200"
            disabled={contactMutation.isLoading}
          >
            {contactMutation.isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
